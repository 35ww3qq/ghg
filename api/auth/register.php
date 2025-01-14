<?php
require '../config/core.php';
require '../config/Database.php';
require '../objects/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->name)
) {
    $user->email = $data->email;
    $user->password = password_hash($data->password, PASSWORD_BCRYPT);
    $user->name = $data->name;
    $user->role = "client";
    $user->status = "active";
    $user->credits = 0;
    $user->created = date('Y-m-d H:i:s');

    if ($user->emailExists()) {
        http_response_code(400);
        echo json_encode(array(
            "success" => false,
            "data" => null,
            "error" => "Bu email adresi zaten kayıtlı."
        ));
        exit;
    }

    if ($user->create()) {
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
        http_response_code(500);
        echo json_encode(array(
            "success" => false,
            "data" => null,
            "error" => "Kullanıcı oluşturulamadı."
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "data" => null,
        "error" => "Tüm alanları doldurun."
    ));
}
