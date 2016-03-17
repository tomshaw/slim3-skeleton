<?php

namespace App\Controller;

use Slim\Container;

class AbstractController
{       
    protected $container;

    public function __construct(Container $c)
    {
        $this->container    = $c;
    }
    
    public function getContainer()
    {
        return $this->container;
    }
    
    public function getRootUrl()
    {
        if (!$this->rootUrl) {
            $this->rootUrl = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
        }
        return $this->rootUrl;
    }
    
    public function getRouter()
    {
        return $this->getContainer()->get('router');
    }
    
    public function getView()
    {
        return $this->getContainer()->get('view');
    }
    
    public function getLogger()
    {
        return $this->getContainer()->get('logger');
    }
    
    public function getFlash()
    {
        return $this->getContainer()->get('flash');
    }
    
    public function getDatabase()
    {
        return $this->getContainer()->get('db');
    }
    
    public function getEntityManager()
    {
        return $this->getContainer()->get('em');
    }

    public function getRepository($resource)
    {
        return $this->getEntityManager()->getRepository($resource);
    }
}
