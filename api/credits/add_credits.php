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
    
    // POST verilerini al
    $data = json_decode(file_get_contents('php://input'));
    
    // Gerekli alanları kontrol et
    if (!isset($data->amount) || !isset($data->paymentMethod)) {
        throw new Exception('Miktar ve ödeme yöntemi gerekli', 400);
    }
    
    // Miktarı doğrula
    if (!is_numeric($data->amount) || $data->amount <= 0) {
        throw new Exception('Geçersiz kredi miktarı', 400);
    }
    
    // Ödeme yöntemini doğrula
    $allowedPaymentMethods = ['credit_card', 'bank_transfer', 'crypto'];
    if (!in_array($data->paymentMethod, $allowedPaymentMethods)) {
        throw new Exception('Geçersiz ödeme yöntemi', 400);
    }
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Transaction başlat
    $db->beginTransaction();
    
    try {
        // Kullanıcı ID'sini token'dan al
        $userId = $decoded->data->id;
        
        // Kredi ekle
        $transactionId = $user->addCredits($userId, $data->amount, $data->paymentMethod);
        
        if ($transactionId) {
            // Transaction'ı onayla
            $db->commit();
            
            // Güncel bakiyeyi al
            $newBalance = $user->getCredits($userId);
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => [
                    'transactionId' => $transactionId,
                    'amount' => $data->amount,
                    'newBalance' => $newBalance,
                    'timestamp' => date('Y-m-d H:i:s')
                ]
            ]);
        } else {
            throw new Exception('Kredi ekleme işlemi başarısız', 400);
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
