<?php

namespace IntecPhp\Middleware;

use IntecPhp\View\Layout;

class HttpMiddleware
{
    private $layout;
    private $displayErrors;

    public function __construct(Layout $layout, bool $displayErrors)
    {
        $this->layout = $layout;
        $this->displayErrors = $displayErrors;
    }

    public function pageNotFound($request)
    {
        $this->layout
            ->setLayout('layout-error')
            ->render('http-error/404');
    }

    public function fatalError($request, $err)
    {
        $this->layout
                ->setLayout('layout-error')
                ->render('http-error/500', ['e' => $err, 'displayErrors' => $this->displayErrors]);
    }
}
