<?php

namespace IntecPhp\Middleware;

use IntecPhp\Service\ResponseHandler;

class AjaxInterceptorMiddleware
{
    private $jsonMapper;
    private $isDevMode;
    private $jsonPath;

    public function __construct(array $jsonMapper, $isDevMode, $jsonPath = 'app/config/json/')
    {
        $this->jsonMapper = $jsonMapper;
        $this->isDevMode = $isDevMode;
        $this->jsonPath = $jsonPath;
    }

    public function returnJsonResponse($request)
    {
        if ($request->isXmlHttpRequest() && $this->isDevMode) {
            $uri = $_SERVER['REQUEST_URI'];
            $jsonFile = $this->jsonMapper[$uri] ?? '404.json';
            $json = json_decode(file_get_contents($this->jsonPath . $jsonFile));
            $rp = new ResponseHandler($json->code, $json->message, (array)$json->data);
            $rp->printJson();
            exit;
        }
    }
}
