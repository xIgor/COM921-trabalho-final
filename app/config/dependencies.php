<?php

// Service
use IntecPhp\Service\Cookie;
use IntecPhp\Service\Account;
use IntecPhp\Service\JwtWrapper;

// Middleware
use IntecPhp\Middleware\HttpMiddleware;
use IntecPhp\Middleware\AjaxInterceptorMiddleware;
use IntecPhp\Middleware\AuthenticationMiddleware;

// View
use IntecPhp\View\Layout;


// ----------------------------------------- Service

$dependencies[Account::class] = function ($c) {
    $jwt = $c[JwtWrapper::class];
    $sessionCookie = $c[Cookie::class];
    return new Account($jwt, $sessionCookie);
};

$dependencies[Cookie::class] = function ($c) {
    $cookieSettings = $c['settings']['session'];
    return new Cookie($cookieSettings['cookie_name'], $cookieSettings['cookie_expires']);
};
$dependencies[JwtWrapper::class] = function ($c) {
    $jwtSettings = $c['settings']['jwt'];
    return new JwtWrapper($jwtSettings['app_secret'], $jwtSettings['token_expires']);
};

// ----------------------------------------- Middleware

$dependencies[HttpMiddleware::class] = function ($c) {
    $layout = new Layout();
    return new HttpMiddleware($layout, $c['settings']['display_errors']);
};

$dependencies[AuthenticationMiddleware::class] = function ($c) {
    $layout = new Layout();
    $account = $c[Account::class];
    return new AuthenticationMiddleware($layout, $account);
};

$dependencies[AjaxInterceptorMiddleware::class] = function ($c) {
    $isDevMode = $c['settings']['ajax_interceptor']['is_dev_mode'];
    $jsonMapper = $c['settings']['ajax_interceptor']['json_mapper'];
    return new AjaxInterceptorMiddleware($jsonMapper, $isDevMode);
};
