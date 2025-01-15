<?php
require_once '../config/core.php';
require_once '../config/security.php';
require_once '../objects/Backlink.php';

try {
    $security = Security::getInstance();
    $security->validateRequest();
    
    // Get JWT token from header
    $headers = apache_request_headers();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';
    
    // Validate token
    $decoded = $security->validateToken($token);
    
    // Initialize database and backlink object
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Get user ID from token
    $userId = $decoded->data->id;
    
    // Get query parameters
    $params = [];
    if (isset($_GET['status'])) {
        $params['status'] = $security->sanitizeInput($_GET['status']);
    }
    if (isset($_GET['sort'])) {
        $params['sort'] = $security->sanitizeInput($_GET['sort']);
    }
    
    // Get backlinks
    $result = $backlink->getAll($userId, $params);
    
    // Set response headers
    header('Content-Type: application/json');
    
    if ($result) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $result
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'No backlinks found'
        ]);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
