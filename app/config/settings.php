<?php

// as chaves iguais serão sobrescritas pelo array em settings.local.php

return [
    'display_errors' => true,
    'ajax_interceptor' => [
        'is_dev_mode' => true,
        'json_mapper' => require 'app/config/json-mapper.php'
    ],
    'jwt' => [
        'app_secret' => getenv('APP_SECRET'),
        'token_expires' => 1800 // 30 min
    ],
    'session' => [
        'cookie_name' => getenv('APP_COOKIE_NAME'),
        'cookie_expires' => 1800 // 30 min
    ],
];
