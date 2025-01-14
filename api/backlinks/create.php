<?php
require '../config/core.php';
require '../config/Database.php';
require '../objects/Backlink.php';
require '../auth/validate_token.php';

$database = new Database();
$db = $database->getConnection();
$backlink = new Backlink($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->url) &&
    !empty($data->targetUrl) &&
    !empty($data->keyword)
) {
    $backlink->user_id = $decoded->data->id;
    $backlink->url = $data->url;
    $backlink->target_url = $data->targetUrl;
    $backlink->keyword = $data->keyword;
    $backlink->title = $data->title ?? null;
    $backlink->status = 'pending';
    $backlink->created = date('Y-m-d H:i:s');

    if ($backlink->create()) {
        http_response_code(201);
        echo json_encode(array(
            "success" => true,
            "data" => array(
                "id" => $backlink->id,
                "url" => $backlink->url,
                "targetUrl" => $backlink->target_url,
                "keyword" => $backlink->keyword,
                "title" => $backlink->title,
                "status" => $backlink->status,
                "created" => $backlink->created
            ),
            "error" => null
        ));
    } else {
        http_response_code(503);
        echo json_encode(array(
            "success" => false,
            "data" => null,
            "error" => "Backlink oluşturulamadı."
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "data" => null,
        "error" => "Eksik veri gönderildi."
    ));
}
