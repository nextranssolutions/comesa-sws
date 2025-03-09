<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // Change '*' to specific domains in production
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization'], // Add 'Authorization' explicitly
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Set to true if using cookies for auth
];
