<?php
class Security {
    private static $instance = null;
    private $whitelistedIPs = [];
    private $rateLimits = [];
    private $lastCleanup = 0;
    
    private function __construct() {
        // Initialize rate limiting
        $this->lastCleanup = time();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Security();
        }
        return self::$instance;
    }
    
    public function validateRequest() {
        // CORS headers
        header('Access-Control-Allow-Origin: ' . $_ENV['ALLOWED_ORIGIN']);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Max-Age: 86400');
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
        
        // Content type validation
        if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['CONTENT_TYPE'] !== 'application/json') {
            throw new Exception('Invalid content type', 400);
        }
        
        // Rate limiting
        $this->checkRateLimit();
        
        // XSS Protection
        header('X-XSS-Protection: 1; mode=block');
        
        // Content Security Policy
        header("Content-Security-Policy: default-src 'self'");
        
        // Prevent clickjacking
        header('X-Frame-Options: DENY');
        
        // HSTS
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
        
        // Prevent MIME type sniffing
        header('X-Content-Type-Options: nosniff');
    }
    
    public function sanitizeInput($data) {
        if (is_array($data)) {
            return array_map([$this, 'sanitizeInput'], $data);
        }
        return htmlspecialchars(strip_tags($data), ENT_QUOTES, 'UTF-8');
    }
    
    public function validateToken($token) {
        try {
            if (empty($token)) {
                throw new Exception('No token provided', 401);
            }
            
            // Verify JWT token
            $decoded = JWT::decode($token, $_ENV['JWT_SECRET'], array('HS256'));
            
            // Check if token is expired
            if ($decoded->exp < time()) {
                throw new Exception('Token expired', 401);
            }
            
            return $decoded;
        } catch (Exception $e) {
            throw new Exception('Invalid token', 401);
        }
    }
    
    private function checkRateLimit() {
        $ip = $_SERVER['REMOTE_ADDR'];
        $now = time();
        
        // Cleanup old entries every minute
        if ($now - $this->lastCleanup > 60) {
            $this->cleanupRateLimits();
        }
        
        // Initialize rate limit for IP
        if (!isset($this->rateLimits[$ip])) {
            $this->rateLimits[$ip] = [
                'count' => 0,
                'firstRequest' => $now
            ];
        }
        
        // Check rate limit (100 requests per minute)
        if ($this->rateLimits[$ip]['count'] >= 100) {
            if ($now - $this->rateLimits[$ip]['firstRequest'] < 60) {
                throw new Exception('Rate limit exceeded', 429);
            } else {
                // Reset counter if minute has passed
                $this->rateLimits[$ip] = [
                    'count' => 1,
                    'firstRequest' => $now
                ];
            }
        } else {
            $this->rateLimits[$ip]['count']++;
        }
    }
    
    private function cleanupRateLimits() {
        $now = time();
        foreach ($this->rateLimits as $ip => $data) {
            if ($now - $data['firstRequest'] > 60) {
                unset($this->rateLimits[$ip]);
            }
        }
        $this->lastCleanup = $now;
    }
}
