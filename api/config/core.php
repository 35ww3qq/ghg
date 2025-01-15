<?php
// Hata raporlama
error_reporting(E_ALL);

// CORS ayarları
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Veritabanı bilgileri
define("DB_HOST", "localhost");
define("DB_NAME", "backlink_db");
define("DB_USER", "root");
define("DB_PASS", "");

// JWT ayarları
define("JWT_SECRET", "your-secret-key");
define("JWT_EXPIRE", time() + (60 * 60)); // 1 saat

// API Rate Limiting
define("RATE_LIMIT", 60); // dakikada maksimum istek
define("RATE_WINDOW", 60); // saniye cinsinden pencere

// Cache ayarları
define("CACHE_ENABLED", true);
define("CACHE_EXPIRE", 300); // 5 dakika

// Güvenlik ayarları
define("SSL_REQUIRED", true);
define("IP_WHITELIST", []);
