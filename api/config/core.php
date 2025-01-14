<?php
// Show error reporting
error_reporting(E_ALL);

// Set default timezone
date_default_timezone_set('Europe/Istanbul');

// Variables used for JWT
$key = "your_secret_key_here";
$issued_at = time();
$expiration_time = $issued_at + (60 * 60); // Valid for 1 hour
$issuer = "http://localhost/";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle OPTIONS method
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}
