<?php
require_once '../config/core.php';
require_once '../config/security.php';
require_once '../objects/User.php';
require_once '../objects/Backlink.php';

try {
    $security = Security::getInstance();
    $security->validateRequest();
    
    // Get JWT token from header
    $headers = apache_request_headers();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';
    
    // Validate token
    $decoded = $security->validateToken($token);
    
    // Check if user is admin
    if ($decoded->data->role !== 'admin') {
        throw new Exception('Unauthorized access', 403);
    }
    
    // Initialize database and objects
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    $backlink = new Backlink($db);
    
    // Get system stats with caching
    $cacheFile = '../cache/system_stats.json';
    $cacheTime = 300; // 5 minutes
    
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
        $stats = json_decode(file_get_contents($cacheFile), true);
    } else {
        // Calculate stats
        $stats = [
            'users' => [
                'total' => $user->getTotalCount(),
                'active' => $user->getActiveCount(),
                'new24h' => $user->getNewCount(24)
            ],
            'backlinks' => [
                'total' => $backlink->getTotalCount(),
                'active' => $backlink->getActiveCount(),
                'indexRate' => $backlink->getIndexRate(),
                'successRate' => $backlink->getSuccessRate()
            ],
            'system' => [
                'cpuUsage' => sys_getloadavg()[0],
                'memoryUsage' => memory_get_usage(true),
                'diskUsage' => disk_free_space('/'),
                'lastBackup' => filemtime('../backup/latest.sql') ?: null
            ],
            'timestamp' => time()
        ];
        
        // Save to cache
        file_put_contents($cacheFile, json_encode($stats));
    }
    
    // Set response
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $stats
    ]);
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
