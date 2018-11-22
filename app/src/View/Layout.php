<?php

namespace IntecPhp\View;

use Exception;
use IntecPhp\Service\Config;

class Layout
{

    private $stylesheets;
    private $scripts;

    private $title;

    private $metaDescription;
    private $metaKeywords;

    private $layout;
    private $renderLayout = true;
    private $appendPartial = [];

    const DEFAULT_LAYOUT = 'layout';

    public function __construct($layoutName = self::DEFAULT_LAYOUT)
    {
        $this->layout = $layoutName;
        $this->stylesheets = [];
        $this->scripts = [];
        $this->baseUrl = Config::getDomain();
        $this->logoUrl = $this->domain = '/img/logo.png';
    }

    public function setLayout($layout)
    {
        $this->layout = $layout;
        return $this;
    }

    public function setRenderLayout($renderLayout)
    {
        $this->renderLayout = $renderLayout;
        return $this;
    }

    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    public function appendTitle($text, $separator = ' - ')
    {
        $this->title .= $separator . $text;
        return $this;
    }

    public function setMetaKeywords($keywords)
    {
        $this->metaKeywords = $keywords;
        return $this;
    }

    public function setMetaDescription($description)
    {
        $this->metaDescription = $description;
        return $this;
    }

    public function render($page, array $resp = [])
    {
        $this->contentId = $page;
        extract($resp);
        if ($this->renderLayout) {
            include_once 'app/views/partial/layout/' . $this->layout . '.php';
        } else {
            include_once 'app/views/template/' . $page . '.php';
        }
    }

    public function addScript($src)
    {
        $this->scripts[] = $src . '.min.js';
        return $this;
    }

    public function addStylesheet($href)
    {
        $this->stylesheets[] = $href . '.min.css';
        return $this;
    }

    public function appendPartial($partial)
    {
        if(file_exists('app/views/partial/'. $partial .'.php')) {
            $this->appendPartial[] = $partial;
        } else {
            throw new Exception('Partial \'' . $partial . '\' não encontrado');
        }
        return $this;
    }
}
