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
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $type = isset($_GET['type']) ? $security->sanitizeInput($_GET['type']) : null;
    $userId = isset($_GET['userId']) ? $security->sanitizeInput($_GET['userId']) : null;
    $startDate = isset($_GET['startDate']) ? $security->sanitizeInput($_GET['startDate']) : null;
    $endDate = isset($_GET['endDate']) ? $security->sanitizeInput($_GET['endDate']) : null;
    $severity = isset($_GET['severity']) ? $security->sanitizeInput($_GET['severity']) : null;
    
    // Limit kontrolü
    if ($limit > 200) {
        $limit = 200;
    }
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Cache kontrolü
    $cacheKey = "admin_logs_{$page}_{$limit}_{$type}_{$userId}_{$startDate}_{$endDate}_{$severity}";
    $cachedResult = apcu_fetch($cacheKey);
    
    if ($cachedResult !== false) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $cachedResult,
            'fromCache' => true
        ]);
        exit;
    }
    
    // Logları getir
    $result = $user->getAdminLogs([
        'page' => $page,
        'limit' => $limit,
        'type' => $type,
        'userId' => $userId,
        'startDate' => $startDate,
        'endDate' => $endDate,
        'severity' => $severity
    ]);
    
    if ($result) {
        // Sonucu cache'e kaydet (1 dakika)
        apcu_store($cacheKey, $result, 60);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'logs' => $result['logs'],
                'pagination' => [
                    'currentPage' => $page,
                    'totalPages' => $result['totalPages'],
                    'totalItems' => $result['totalItems'],
                    'itemsPerPage' => $limit
                ],
                'stats' => [
                    'totalLogs' => $result['stats']['total'],
                    'errorLogs' => $result['stats']['errors'],
                    'warningLogs' => $result['stats']['warnings'],
                    'infoLogs' => $result['stats']['info']
                ]
            ]
        ]);
    } else {
        throw new Exception('Loglar getirilemedi', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
