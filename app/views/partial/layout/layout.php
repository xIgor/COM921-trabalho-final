<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <?php require_once 'app/views/partial/layout-header-config.php'; ?>
        <?php foreach ($this->stylesheets as $href): ?>
            <link href="<?php echo $href; ?>" rel="stylesheet" type="text/css">
        <?php endforeach; ?>

        <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono|Raleway:500" rel="stylesheet">
    </head>
    <body>
        <header>
            <nav class="navbar navbar-expand-sm navbar navbar-dark bg-dark position-fixed fixed-top">
                <a class="navbar-brand" href="/">PhpStart</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <!-- <li class="nav-item active">
                            <a class="nav-link" href="#">Início</a>
                        </li> -->
                    </ul>
                </div>
            </nav>
        </header>
        <main>
            <?php require_once 'app/views/template/' . $page . '.php'; ?>
        </main>

        <footer class="bg-dark border-top border-white pt-3 pb-5">
            <div class="container">
                <p class="float-right"><a href="#" class="text-white small">Voltar ao início</a></p>
                <p class="text-white small">© 2018 - Incluir Tecnologia LTDA ME.</p>
            </div>
        </footer>

        <script type='text/javascript' src="/js/app.min.js"></script>
        <?php foreach ($this->scripts as $path): ?>
        <script type='text/javascript' src="<?php echo $path; ?>"></script>
        <?php endforeach; ?>
    </body>
</html>
