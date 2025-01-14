<?php
require '../config/core.php';
require '../config/Database.php';
require '../objects/User.php';
require '../libs/php-jwt/src/BeforeValidException.php';
require '../libs/php-jwt/src/ExpiredException.php';
require '../libs/php-jwt/src/SignatureInvalidException.php';
require '../libs/php-jwt/src/JWT.php';
use \Firebase\JWT\JWT;

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $user->email = $data->email;
    $email_exists = $user->emailExists();

    if ($email_exists && password_verify($data->password, $user->password)) {
        $token = array(
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "iss" => $issuer,
            "data" => array(
                "id" => $user->id,
                "email" => $user->email,
                "role" => $user->role,
                "name" => $user->name
            )
        );

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "data" => array(
                "token" => JWT::encode($token, $key),
                "user" => array(
                    "id" => $user->id,
                    "email" => $user->email,
                    "role" => $user->role,
                    "name" => $user->name,
                    "credits" => $user->credits,
                    "status" => $user->status
                )
            ),
            "error" => null
        ));
    } else {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "data" => null,
            "error" => "Geçersiz email veya şifre."
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "data" => null,
        "error" => "Email ve şifre gerekli."
    ));
}
