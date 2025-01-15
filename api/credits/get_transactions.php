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
    
    // Query parametrelerini al
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
    $startDate = isset($_GET['startDate']) ? $security->sanitizeInput($_GET['startDate']) : null;
    $endDate = isset($_GET['endDate']) ? $security->sanitizeInput($_GET['endDate']) : null;
    $type = isset($_GET['type']) ? $security->sanitizeInput($_GET['type']) : null;
    
    // Limit kontrolü
    if ($limit > 100) {
        $limit = 100; // Maksimum limit
    }
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // İşlem geçmişini getir
    $result = $user->getTransactions($userId, [
        'page' => $page,
        'limit' => $limit,
        'startDate' => $startDate,
        'endDate' => $endDate,
        'type' => $type
    ]);
    
    if ($result) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'transactions' => $result['transactions'],
                'pagination' => [
                    'currentPage' => $page,
                    'totalPages' => $result['totalPages'],
                    'totalItems' => $result['totalItems'],
                    'itemsPerPage' => $limit
                ]
            ]
        ]);
    } else {
        throw new Exception('İşlem geçmişi alınamadı', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
