<?php
require_once '../config/core.php';
require_once '../config/security.php';
require_once '../objects/User.php';
require_once '../objects/Backlink.php';

try {
    $security = Security::getInstance();
    $security->validateRequest();
    
    // JWT token'ı header'dan al
    $headers = apache_request_headers();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';
    
    // Token'ı doğrula
    $decoded = $security->validateToken($token);
    
    // POST verilerini al
    $data = json_decode(file_get_contents('php://input'));
    
    // Gerekli alanları kontrol et
    if (!isset($data->packageId) || !isset($data->targetUrl) || !isset($data->keyword)) {
        throw new Exception('Paket ID, hedef URL ve anahtar kelime gerekli', 400);
    }
    
    // URL validasyonu
    if (!filter_var($data->targetUrl, FILTER_VALIDATE_URL)) {
        throw new Exception('Geçersiz hedef URL formatı', 400);
    }
    
    // Database bağlantılarını başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    $backlink = new Backlink($db);
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // Transaction başlat
    $db->beginTransaction();
    
    try {
        // Paketi kontrol et
        $package = $backlink->getPackageById($data->packageId);
        if (!$package) {
            throw new Exception('Paket bulunamadı', 404);
        }
        
        // Kullanıcı kredisini kontrol et
        $userCredits = $user->getCredits($userId);
        if ($userCredits < $package['credits']) {
            throw new Exception('Yetersiz kredi', 400);
        }
        
        // Paketin müsaitlik durumunu kontrol et
        if (!$backlink->isPackageAvailable($data->packageId)) {
            throw new Exception('Paket şu anda müsait değil', 400);
        }
        
        // Satın alma işlemini gerçekleştir
        $purchaseResult = $backlink->purchasePackage([
            'userId' => $userId,
            'packageId' => $data->packageId,
            'targetUrl' => $data->targetUrl,
            'keyword' => $data->keyword,
            'credits' => $package['credits']
        ]);
        
        if ($purchaseResult) {
            // Kullanıcı kredisini düş
            $user->deductCredits($userId, $package['credits']);
            
            // Kredi işlem kaydı oluştur
            $user->logCreditTransaction($userId, [
                'type' => 'purchase',
                'amount' => -$package['credits'],
                'description' => "Backlink paketi satın alma: {$package['name']}",
                'orderId' => $purchaseResult['orderId']
            ]);
            
            // Transaction'ı onayla
            $db->commit();
            
            // Başarılı yanıt döndür
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => [
                    'order' => $purchaseResult,
                    'newBalance' => $userCredits - $package['credits'],
                    'package' => $package
                ]
            ]);
            
            // Asenkron işlemleri başlat
            $backlink->triggerAsyncTasks([
                'type' => 'backlink_purchased',
                'orderId' => $purchaseResult['orderId'],
                'userId' => $userId
            ]);
            
        } else {
            throw new Exception('Satın alma işlemi başarısız', 400);
        }
        
    } catch (Exception $e) {
        // Hata durumunda transaction'ı geri al
        $db->rollBack();
        throw $e;
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
