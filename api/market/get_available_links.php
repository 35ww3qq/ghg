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
    
    // Get filters from query parameters
    $filters = [];
    $allowedFilters = ['minDa', 'minPa', 'maxSpamScore', 'category', 'language'];
    
    foreach ($allowedFilters as $filter) {
        if (isset($_GET[$filter])) {
            $filters[$filter] = $security->sanitizeInput($_GET[$filter]);
        }
    }
    
    // Validate numeric filters
    $numericFilters = ['minDa', 'minPa', 'maxSpamScore'];
    foreach ($numericFilters as $filter) {
        if (isset($filters[$filter]) && !is_numeric($filters[$filter])) {
            throw new Exception("Invalid {$filter} value", 400);
        }
    }
    
    // Get available links
    $result = $backlink->getAvailableLinks($filters);
    
    // Set response
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
            'error' => 'No available links found'
        ]);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
