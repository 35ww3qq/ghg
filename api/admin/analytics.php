<?php
require_once '../config/core.php';
require_once '../config/security.php';
require_once '../objects/Backlink.php';

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
    $startDate = isset($_GET['startDate']) ? $security->sanitizeInput($_GET['startDate']) : date('Y-m-d', strtotime('-30 days'));
    $endDate = isset($_GET['endDate']) ? $security->sanitizeInput($_GET['endDate']) : date('Y-m-d');
    
    // Database ve backlink nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Cache kontrolü
    $cacheKey = "admin_analytics_{$startDate}_{$endDate}";
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
    
    // Analitik verileri topla
    $result = [
        'overview' => $backlink->getSystemOverview(),
        'trends' => $backlink->getMetricsTrends($startDate, $endDate),
        'performance' => [
            'indexing' => $backlink->getIndexingPerformance($startDate, $endDate),
            'verification' => $backlink->getVerificationStats($startDate, $endDate)
        ],
        'userMetrics' => [
            'activeUsers' => $backlink->getActiveUserMetrics($startDate, $endDate),
            'newUsers' => $backlink->getNewUserMetrics($startDate, $endDate)
        ],
        'revenue' => [
            'total' => $backlink->getRevenueMetrics($startDate, $endDate),
            'byPackage' => $backlink->getRevenueByPackage($startDate, $endDate)
        ],
        'system' => [
            'health' => $backlink->getSystemHealth(),
            'performance' => $backlink->getSystemPerformance()
        ]
    ];
    
    if ($result) {
        // Sonucu cache'e kaydet (5 dakika)
        apcu_store($cacheKey, $result, 300);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $result
        ]);
    } else {
        throw new Exception('Analitik veriler alınamadı', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
