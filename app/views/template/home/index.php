<div class="welcome-section d-flex align-items-center mb-3">
    <div class="mx-auto text-center text-white">
        <h1 class="font-weight-normal">Bem-vindo ao PhpStartWebApp</h1>
        <p class="lead font-weight-normal">Projeto base para aplicações de frontend</p>
    </div>
</div>

<div class="container">

    <div class="mb-3">
        <h2 class="text-center">Onde começar</h2>
        <hr>
        <p>Crie uma nova rota adicionando uma nova entrada ao arquivo <code>app/config/template-routes.php</code></p>
        <pre><code>
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
        </code></pre>
        <p>Acesse a rota <a href="/exemplo">/exemplo</a> para ver exemplos de componentes construídos com os recursos disponíveis no projeto.</p>
    </div>

</div>