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
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // Kredi bakiyesini getir
    $balance = $user->getCredits($userId);
    
    if ($balance !== false) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'balance' => $balance,
                'currency' => 'CREDIT',
                'lastUpdated' => date('Y-m-d H:i:s')
            ]
        ]);
    } else {
        throw new Exception('Kredi bakiyesi alınamadı', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
