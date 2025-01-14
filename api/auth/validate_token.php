<?php
require_once '../libs/php-jwt/src/BeforeValidException.php';
require_once '../libs/php-jwt/src/ExpiredException.php';
require_once '../libs/php-jwt/src/SignatureInvalidException.php';
require_once '../libs/php-jwt/src/JWT.php';
use \Firebase\JWT\JWT;

// Get header
$headers = apache_request_headers();

// Check if token exists
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(array(
        "success" => false,
        "data" => null,
        "error" => "Token bulunamadı."
    ));
    exit();
}

$jwt = str_replace('Bearer ', '', $headers['Authorization']);

// Decode token
try {
    $decoded = JWT::decode($jwt, $key, array('HS256'));
} catch(Exception $e) {
    http_response_code(401);
    echo json_encode(array(
        "success" => false,
        "data" => null,
        "error" => $e->getMessage()
    ));
    exit();
}
