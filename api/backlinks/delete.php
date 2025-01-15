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
    
    // POST verilerini al
    $data = json_decode(file_get_contents('php://input'));
    
    // ID kontrolü
    if (!isset($data->id)) {
        throw new Exception('Backlink ID gerekli', 400);
    }
    
    // Database ve backlink nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Kullanıcı ID'sini token'dan al
    $userId = $decoded->data->id;
    
    // Transaction başlat
    $db->beginTransaction();
    
    try {
        // Backlink'i sil (soft delete)
        if ($backlink->delete($data->id, $userId)) {
            // Transaction'ı onayla
            $db->commit();
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Backlink başarıyla silindi'
            ]);
        } else {
            throw new Exception('Backlink silinemedi', 400);
        }
    } catch (Exception $e) {
        // Hata durumunda transaction'ı geri al
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
