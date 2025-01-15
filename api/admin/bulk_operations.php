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
    
    // POST verilerini al
    $data = json_decode(file_get_contents('php://input'));
    
    // İşlem tipini kontrol et
    if (!isset($data->operation) || !isset($data->items)) {
        throw new Exception('İşlem tipi ve öğeler gerekli', 400);
    }
    
    // Database ve backlink nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $backlink = new Backlink($db);
    
    // Transaction başlat
    $db->beginTransaction();
    
    try {
        $results = [];
        $successCount = 0;
        $failCount = 0;
        
        // Her bir öğe için işlemi gerçekleştir
        foreach ($data->items as $item) {
            $operationResult = null;
            
            switch ($data->operation) {
                case 'update_status':
                    if (!isset($data->status)) {
                        throw new Exception('Status parametresi gerekli', 400);
                    }
                    $operationResult = $backlink->updateStatus($item, $data->status);
                    break;
                    
                case 'verify_indexing':
                    $operationResult = $backlink->verifyIndexing($item, null, [
                        'priority' => 'high',
                        'adminOverride' => true
                    ]);
                    break;
                    
                case 'delete':
                    $operationResult = $backlink->delete($item, null, true); // adminOverride=true
                    break;
                    
                case 'update_metrics':
                    $operationResult = $backlink->refreshMetrics($item);
                    break;
                    
                default:
                    throw new Exception('Geçersiz işlem tipi', 400);
            }
            
            if ($operationResult) {
                $successCount++;
            } else {
                $failCount++;
            }
            
            $results[] = [
                'id' => $item,
                'success' => $operationResult ? true : false
            ];
        }
        
        // Transaction'ı onayla
        $db->commit();
        
        // Admin log kaydı
        $user = new User($db);
        $user->logAdminAction($decoded->data->id, 'bulk_operation', [
            'operation' => $data->operation,
            'itemCount' => count($data->items),
            'successCount' => $successCount,
            'failCount' => $failCount
        ]);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'results' => $results,
                'summary' => [
                    'total' => count($data->items),
                    'success' => $successCount,
                    'failed' => $failCount
                ]
            ]
        ]);
        
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
