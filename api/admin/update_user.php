<?php
require_once '../config/core.php';
require_once '../config/security.php';
require_once '../objects/User.php';

try {
    $security = Security::getInstance();
    $security->validateRequest();
    
    // JWT token'ı header'dan al
    $headers = apache_request_headers();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';
    
    // Token'ı doğrula
    $decoded = $security->validateToken($token);
    
    // Admin yetkisi kontrolü
    if ($decoded->data->role !== 'admin') {
        throw new Exception('Yetkisiz erişim', 403);
    }
    
    // POST verilerini al
    $data = json_decode(file_get_contents('php://input'));
    
    // Kullanıcı ID kontrolü
    if (!isset($data->userId)) {
        throw new Exception('Kullanıcı ID gerekli', 400);
    }
    
    // Güncellenebilir alanları kontrol et
    $allowedFields = ['name', 'email', 'status', 'role', 'credits'];
    $updateData = [];
    
    foreach ($allowedFields as $field) {
        if (isset($data->$field)) {
            // Özel validasyonlar
            switch ($field) {
                case 'email':
                    if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
                        throw new Exception('Geçersiz email formatı', 400);
                    }
                    break;
                case 'role':
                    if (!in_array($data->role, ['admin', 'client'])) {
                        throw new Exception('Geçersiz rol', 400);
                    }
                    break;
                case 'status':
                    if (!in_array($data->status, ['active', 'suspended', 'pending'])) {
                        throw new Exception('Geçersiz durum', 400);
                    }
                    break;
                case 'credits':
                    if (!is_numeric($data->credits) || $data->credits < 0) {
                        throw new Exception('Geçersiz kredi miktarı', 400);
                    }
                    break;
            }
            $updateData[$field] = $security->sanitizeInput($data->$field);
        }
    }
    
    if (empty($updateData)) {
        throw new Exception('Güncellenecek veri bulunamadı', 400);
    }
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Transaction başlat
    $db->beginTransaction();
    
    try {
        // Kullanıcıyı güncelle
        if ($user->updateByAdmin($data->userId, $updateData)) {
            // Transaction'ı onayla
            $db->commit();
            
            // Güncel kullanıcı bilgilerini getir
            $updatedUser = $user->getById($data->userId);
            
            // Admin log kaydı
            $user->logAdminAction($decoded->data->id, 'user_update', [
                'userId' => $data->userId,
                'changes' => $updateData
            ]);
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $updatedUser
            ]);
        } else {
            throw new Exception('Kullanıcı güncellenemedi', 400);
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
