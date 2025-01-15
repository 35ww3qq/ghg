<?php
require_once '../config/core.php';
require_once '../config/security.php';
require_once '../objects/User.php';

try {
    $security = Security::getInstance();
    $security->validateRequest();
    
    // POST verilerini al
    $data = json_decode(file_get_contents('php://input'));
    
    // Email kontrolü
    if (!isset($data->email)) {
        throw new Exception('Email adresi gerekli', 400);
    }
    
    // Email'i doğrula
    if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Geçersiz email formatı', 400);
    }
    
    // Database ve user nesnesini başlat
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    
    // Reset token oluştur ve email gönder
    $resetToken = $user->createPasswordResetToken($data->email);
    
    if ($resetToken) {
        // Email gönderme işlemi
        $resetLink = $_ENV['APP_URL'] . '/reset-password?token=' . $resetToken;
        $to = $data->email;
        $subject = 'Şifre Sıfırlama İsteği';
        $message = "Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:\n\n{$resetLink}\n\nBu link 1 saat süreyle geçerlidir.";
        
        // Email gönder
        mail($to, $subject, $message);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Şifre sıfırlama linki email adresinize gönderildi'
        ]);
    } else {
        throw new Exception('Şifre sıfırlama işlemi başarısız', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
