<?php
require_once '../config/core.php';
require_once '../config/security.php';
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
    
    // ID kontrolü
    if (!isset($data->id)) {
        throw new Exception('Backlink ID gerekli', 400);
    }
    
    // Database ve backlink nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // Premium indexer kontrolü
    $isPremium = isset($data->usePremium) && $data->usePremium;
    
    if ($isPremium) {
        // Kullanıcının premium kredisini kontrol et
        $user = new User($db);
        $premiumCredits = $user->getPremiumCredits($userId);
        
        if ($premiumCredits <= 0) {
            throw new Exception('Premium indexer kredisi yetersiz', 400);
        }
    }
    
    // Transaction başlat
    $db->beginTransaction();
    
    try {
        // İndexleme işlemini başlat
        $result = $backlink->verifyIndexing($data->id, $userId, [
            'usePremium' => $isPremium,
            'priority' => $isPremium ? 'high' : 'normal'
        ]);
        
        if ($result) {
            if ($isPremium) {
                // Premium krediyi düş
                $user->deductPremiumCredits($userId, 1);
            }
            
            // Transaction'ı onayla
            $db->commit();
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => [
                    'status' => $result['status'],
                    'message' => $result['message'],
                    'estimatedTime' => $isPremium ? '5-15 dakika' : '1-24 saat'
                ]
            ]);
            
            // Asenkron indexleme işlemini başlat
            $backlink->triggerAsyncIndexing($data->id, [
                'priority' => $isPremium ? 'high' : 'normal'
            ]);
            
        } else {
            throw new Exception('İndexleme doğrulama başlatılamadı', 400);
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
