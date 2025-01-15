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
    
    // Query parametrelerini al
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
    $search = isset($_GET['search']) ? $security->sanitizeInput($_GET['search']) : null;
    $status = isset($_GET['status']) ? $security->sanitizeInput($_GET['status']) : null;
    $sortBy = isset($_GET['sortBy']) ? $security->sanitizeInput($_GET['sortBy']) : 'created_at';
    $sortDir = isset($_GET['sortDir']) ? $security->sanitizeInput($_GET['sortDir']) : 'DESC';
    
    // Limit kontrolü
    if ($limit > 100) {
        $limit = 100;
    }
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Kullanıcıları getir
    $result = $user->getAllUsers([
        'page' => $page,
        'limit' => $limit,
        'search' => $search,
        'status' => $status,
        'sortBy' => $sortBy,
        'sortDir' => $sortDir
    ]);
    
    if ($result) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'users' => $result['users'],
                'pagination' => [
                    'currentPage' => $page,
                    'totalPages' => $result['totalPages'],
                    'totalItems' => $result['totalItems'],
                    'itemsPerPage' => $limit
                ],
                'stats' => [
                    'totalUsers' => $result['stats']['total'],
                    'activeUsers' => $result['stats']['active'],
                    'suspendedUsers' => $result['stats']['suspended']
                ]
            ]
        ]);
    } else {
        throw new Exception('Kullanıcılar getirilemedi', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
