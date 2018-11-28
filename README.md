
# Introdução

### Requisitos:

- Docker (CE): https://docs.docker.com/install/linux/docker-ce/ubuntu/
- Docker Compose: https://docs.docker.com/compose/install/
- git
- Um bom editor de código
- Criar o arquivo `environment.js` na **raiz do projeto**

```js
const environment = {
    apiUrl: ''
};

export {
    environment
};
```
- execute o comando: `docker-compose up` na **raiz do projeto**

Observações:
- Quando o **docker-compose** terminar de inicializar os containers, a aplicação estará disponível em: http://localhost:3000.
- Utilizamos o grunt para auxiliar nas *tasks* de desenvolvimento. As tasks existentes são:
    - Browserify:
    - Uglify:
    - Sass transform, minification:
    - Copy:
    - Watch:
    - BrowserSync:


### Informações Gerais:

Caso necessite instalar dependências, via **composer** ou **npm**, utilize os comandos abaixo:

- NPM
```sh
# acessa o container node
docker exec -it unifeijs sh
# rodar comandos dentro do container
# npm i vue --save
```

- Composer
```sh
# atualizar dependências do php
docker exec -it unifeiphp sh
# composer require pimple/pimple
# composer update
```

**Importante**: Para evitar problemas de caching em navegadores, durante o desenvolvimento, recomenda-se desativar o cache na janela de debug (rede) do navegador.

# Informações sobre o desenvolvimento

## Estrutura
O repositório possui a estrutura abaixo. Algumas pastas e arquivos que não são importantes para esse texto foram omitidos por clareza

```md
├── app/
│   ├── config/
│   │   ├── json/ : Arquivos json utilizados localmente no desenvolvimento
│   │   ├── json-mapper.php : Associa arquivos json às respectivas chamadas de API
│   │   └── template-routes.php : Configuração das rotas
│   ├── src/
│   └── views/ : Contém os layouts, templates e partials
├── assets/ : Arquivos que serão processadose copiados para a pasta public automaticamente pelo sistema
│   ├── fonts/
│   ├── img/
│   ├── js/
│   └── sass/
├── public/ : Arquivos acessíveis pela aplicação.
├── .babelrc
├── .dockerignore
├── .editorconfig
├── .gitignore
├── composer.json
├── composer.lock
├── docker-compose.yml
├── environment.js
├── gruntfile.js
├── package-lock.json
├── package.json
└── README.md
```

## Rotas
Para criar uma nova rota:
1. Criar o template (miolo da página) na pasta `app/views/template`.
2. Criar o javascript na pasta `assets/js` (utilizar extensão `.js`).
3. Criar a folha de estilo na pasta `assets/sass` (utilizar extensão `.scss`).
4. Adicionar uma nova entrada no arquivo `app/config/template-routes.php` conforme o exemplo (observe que o css e o javascript são adicionados sem a extensão):

```php
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
```


## Html
Cada vez que um usuário acessa uma rota, o sistema utiliza diversos arquivos para montar a estrutura da página. Esses arquivos encontram-se organizados em pastas específicas (`app/views`) conforme sua função na estrutura da página.

### Layout
Os arquivos de layout encontram-se na pasta `app/views/partial/layout`.

O layout é o nível mais básico da estrutura da página: um arquivo de layout contém as tags <doctype>, <html>, <head> e <body>. É nele que são definidas as meta informações da página e são carregados os scripts e folhas de estilo, além de códigos de analytics, etc. Esse arquivo também define o layout básico da página: menu para navegação, rodapé e posição do conteúdo da página. Ou seja, **todo o código html mais básico que se repete ao longo de várias páginas é colocado em um arquivo de layout**.

Quando o sistema possuir conjuntos de páginas com estrutura parecida deve ser usado um arquivo de layout para cada um desses conjuntos. Por exemplo, esse projeto inicial contém três layouts: `layout.php`, para ser usado nas páginas comuns, `layout-error.php`, para ser usado nas páginas de erro e `layout-docs.php`, usado nas páginas de documentação. Caso seja necessário criar um "portal do administrador", que possui estrutura diferente das páginas comuns (menu de navegação diferente, carrega diferentes scripts ou folhas de estilo, etc.) poderia ser criado um arquivo `layout-admin.php`. Para utilizar um layout, no momento de criação da rota, deve ser passado o nome do layout no construtor da classe Layout.

Ex.:
```php
    [
        'pattern' => '/minha-nova-rota',
        'callback' => function () {
            $layout = new View\Layout('layout-docs');
            $layout
                ->addStylesheet('/css/exemplo')
                ->addScript('/js/exemplo')
                ->render('exemplo/index');
        }
    ],
```

### Templates
Os arquivos de template encontram-se na pasta `app/views/template`.

O template é a estrutura **de uma página específica**. Configurando corretamente as rotas, o sistema automaticamente insere o template dentro do layout. Cada página do sistema deve ter seu próprio template, mas templates de páginas relacionadas podem ser organizados em pastas. Por exemplo, os templates de todas as páginas de documentação encontram-se na pasta `app/views/template/docs`.

### Partials
Os arquivos de partials encontram-se na pasta `app/views/partial`.

A função dos partials é definir **trechos pequenos de código html reutilizável**. Por exemplo, um breadcrumb é um elemento que provavelmente aparecerá em diversas páginas. O html do breadcrumb pode ser colocado em um partial e, quando quisermos inserir um breadcrumb, ao invés de copiar e colar o código, podemos usar o comando php `require` para inserir o conteúdo do arquivo naquele local.

## CSS
O projeto utiliza o preprocessador sass para gerar as folhas de estilo. Os arquivos podem ser encontrados na pasta `assets/sass`. Folhas de estilo de páginas específicas devem ser criados diretamente dentro desta pasta. Já a pasta `theme` contém as folhas de estilo que compõe o tema da aplicação, disponível para todas as páginas. A estrutura é a seguinte:

- `_variables.scss`: Definição das variáveis do Bootstrap e também dos componentes da aplicação;
- `main.scss`: Aquivo principal que inclui as fontes, os arquivos do Bootstrap e também nossos componentes customizados. Esse arquivo é incluído no layout, fazendo com que o Bootstrap e o tema estejam disponíveis em todas as páginas;
- `partials/`: Aqui devem ser criados os arquivos scss referentes aos componentes da aplicação. Esses arquivos devem ser adicionados no `main.scss` para serem incluídos no projeto.

**Observação importante:** A *task* de *watch* apenas observa arquivos de folhas de estilo de páginas. Assim, caso tenha criado arquivos dentro da pasta `theme`, será necessário acessar a folha de estilo da página a qual está trabalhando e salvar (isso iniciará o evento de processamento do sass).

## JS
Na pasta `assets/js` encontram-se os arquivos javascript utilizados no sistema. Arquivos de páginas específicas são colocados na raiz da pasta. Caso um código deva ser reutilizado na aplicação toda (como o código de um componente, por exemplo), colocá-lo na pasta `lib` e incluí-lo no arquivo `app.js`.

**Observação importante:** A *task* de *watch* apenas observa arquivos javascript de páginas. Assim, caso tenha criado arquivos dentro da pasta `lib`, será necessário acessar o javascript da página a qual está trabalhando e salvar (isso iniciará o evento de processamento do browserify).

### API Service
O projeto disponibiliza um serviço para fazer chamadas de API. Para acessá-lo, utilize o **objeto global API** e chame um de seus métodos: `get()`, `post()`, `put()` e `delete()`. Esse serviço foi implementado para facilitar consultas no estilo REST e encapsular a biblioteca responsável pelas requisições (facilitando sua substituição futuramente).

**Exemplo:** O código abaixo faz uma requisição GET para a rota `/exemplo1`. Ao completar a requisição é recebido um json. No retorno testamos o código para determinar se a requisição obteve sucesso e então preenchemos um objeto com os dados recebidos.


```php
<?php
// app/config/json-mapper.php

return [
    '/exemplo1' => 'exemplo1.json',
    '/exemplo2' => 'exemplo2.json', // faz o mapeamento da rota para o arquivo json
    '/prova' => 'prova.json'
];
```

```js
{
    "code": 200,
    "message": "success",
    "data": {
        "posts": [
            {
                "id": 1,
                "title": "Vantagens de solicitar um Financiamento",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper, neque at tristique.",
                "img": "https://picsum.photos/128/80"
            },
        ]
    }
}
```

```js
API.get('/exemplo1').done(res => {
    switch(res.code) {
        case 200:
            this.posts = res.data.posts;
            break;
        default:
            throw 'Codigo não esperado! ' + res.code
    }
});
```