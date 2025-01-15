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
    
    // ID parametresini kontrol et
    if (!isset($_GET['id'])) {
        throw new Exception('Backlink ID gerekli', 400);
    }
    
    $backlinkId = $security->sanitizeInput($_GET['id']);
    
    // Database ve backlink nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // Cache kontrolü
    $cacheKey = "backlink_status_{$backlinkId}";
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
    
    // Backlink durumunu kontrol et
    $result = $backlink->checkStatus($backlinkId, $userId);
    
    if ($result) {
        // Sonucu cache'e kaydet (5 dakika)
        apcu_store($cacheKey, $result, 300);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $result
        ]);
    } else {
        throw new Exception('Backlink durumu kontrol edilemedi', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}