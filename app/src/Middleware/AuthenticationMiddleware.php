<?php

namespace IntecPhp\Middleware;

use IntecPhp\View\Layout;
use IntecPhp\Service\Account;

class AuthenticationMiddleware
{
    private $layout;
    private $account;

    public function __construct(Layout $layout, Account $account)
    {
        $this->layout = $layout;
        $this->account = $account;
    }

    public function isAuthenticated($request)
    {
        if (!$this->account->isLoggedIn()) {
            $this->layout
                ->setLayout('layout-error')
                ->render('http-error/403');
            exit;
        }
    }
}
