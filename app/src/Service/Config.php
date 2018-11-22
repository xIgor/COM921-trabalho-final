<?php

namespace IntecPhp\Service;

class Config
{
    public static function getDomain($suffix = '')
    {
        return $_SERVER['SERVER_NAME'] . $suffix;
    }
}
