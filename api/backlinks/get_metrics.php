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
    
    // URL parametresini kontrol et
    if (!isset($_GET['url'])) {
        throw new Exception('URL parametresi gerekli', 400);
    }
    
    $url = $security->sanitizeInput($_GET['url']);
    
    // URL validasyonu
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        throw new Exception('Geçersiz URL formatı', 400);
    }
    
    // Database ve backlink nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Cache kontrolü
    $cacheKey = "metrics_" . md5($url);
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
    
    // Metrikleri getir
    $result = $backlink->getMetrics($url);
    
    if ($result) {
        // Sonucu cache'e kaydet (1 saat)
        apcu_store($cacheKey, $result, 3600);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $result
        ]);
    } else {
        throw new Exception('Metrikler alınamadı', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
