<?php
require_once '../config/core.php';
require_once '../config/security.php';
require_once '../objects/User.php';

try {
    $security = Security::getInstance();
    $security->validateRequest();
    
    // Refresh token'ı header'dan al
    $headers = apache_request_headers();
    $refreshToken = isset($headers['X-Refresh-Token']) ? $headers['X-Refresh-Token'] : '';
    
    if (empty($refreshToken)) {
        throw new Exception('Refresh token bulunamadı', 401);
    }
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Refresh token'ı doğrula ve yeni token oluştur
    $result = $user->refreshToken($refreshToken);
    
    if ($result) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'token' => $result['token'],
                'refreshToken' => $result['refreshToken'],
                'expiresIn' => 3600 // 1 saat
            ]
        ]);
    } else {
        throw new Exception('Token yenilenemedi', 401);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
