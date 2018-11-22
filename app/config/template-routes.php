<?php

namespace IntecPhp;

return [
    [
        'pattern' => '/',
        'callback' => function () {
            $layout = new View\Layout();
            $layout
                ->addStylesheet('/css/home')
                ->addScript('/js/home')
                ->render('home/index');
        }
    ],
    // ##################### EXEMPLOS DE ROTAS ####################################
    [
        'pattern' => '/exemplo',
        'callback' => function () {
            $layout = new View\Layout();
            $layout
                ->addStylesheet('/css/exemplo')
                ->addScript('/js/exemplo')
                ->render('exemplo/index');
        }
    ],
    [
        'pattern' => '/pagina-restrita',
        'middlewares' => [
            Middleware\AuthenticationMiddleware::class . ':isAuthenticated'
        ],
        'callback' => function () {
            $layout = new View\Layout();
            $layout
                ->addStylesheet('/css/exemplo')
                ->addScript('/js/exemplo')
                ->render('exemplo/index');
        }
    ],
    [
        'pattern' => '/pagina-com-erro',
        'callback' => function () {
            throw new \Error('Simulação de um erro', 1);
        }
    ],
];
