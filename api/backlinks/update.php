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
    
    // Güncellenebilir alanları kontrol et
    $allowedFields = ['targetUrl', 'keyword', 'status'];
    $updateData = [];
    
    foreach ($allowedFields as $field) {
        if (isset($data->$field)) {
            // URL validasyonu
            if ($field === 'targetUrl' && !filter_var($data->$field, FILTER_VALIDATE_URL)) {
                throw new Exception('Geçersiz hedef URL formatı', 400);
            }
            $updateData[$field] = $security->sanitizeInput($data->$field);
        }
    }
    
    if (empty($updateData)) {
        throw new Exception('Güncellenecek veri bulunamadı', 400);
    }
    
    // Database ve backlink nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // Backlink'i güncelle
    if ($backlink->update($data->id, $userId, $updateData)) {
        // Güncel backlink bilgilerini getir
        $updatedBacklink = $backlink->getById($data->id, $userId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $updatedBacklink
        ]);
    } else {
        throw new Exception('Backlink güncellenemedi', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
