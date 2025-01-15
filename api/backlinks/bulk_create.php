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
    
    // Get posted data
    $data = json_decode(file_get_contents('php://input'));
    
    // Validate input
    if (!isset($data->targetUrl) || !isset($data->links) || !is_array($data->links)) {
        throw new Exception('Missing required fields', 400);
    }
    
    // Sanitize input
    $targetUrl = $security->sanitizeInput($data->targetUrl);
    $links = $security->sanitizeInput($data->links);
    
    // Validate URLs
    if (!filter_var($targetUrl, FILTER_VALIDATE_URL)) {
        throw new Exception('Invalid target URL', 400);
    }
    
    foreach ($links as $link) {
        if (!filter_var($link, FILTER_VALIDATE_URL)) {
            throw new Exception('Invalid link URL: ' . $link, 400);
        }
    }
    
    // Initialize database and backlink object
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Get user ID from token
    $userId = $decoded->data->id;
    
    // Start transaction
    $db->beginTransaction();
    
    try {
        $results = [];
        foreach ($links as $link) {
            $result = $backlink->create([
                'userId' => $userId,
                'targetUrl' => $targetUrl,
                'url' => $link
            ]);
            $results[] = $result;
        }
        
        $db->commit();
        
        // Set response
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'data' => [
                'results' => $results
            ]
        ]);
        
    } catch (Exception $e) {
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
