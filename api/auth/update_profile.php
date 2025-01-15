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
    
    // POST verilerini al
    $data = json_decode(file_get_contents('php://input'));
    
    // Güncelleme verilerini doğrula
    $allowedFields = ['name', 'email', 'phone', 'password'];
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
                case 'password':
                    if (strlen($data->password) < 8) {
                        throw new Exception('Şifre en az 8 karakter olmalıdır', 400);
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
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // Profili güncelle
    if ($user->updateProfile($userId, $updateData)) {
        // Güncel kullanıcı bilgilerini getir
        $userData = $user->getById($userId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $userData
        ]);
    } else {
        throw new Exception('Profil güncellenemedi', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
