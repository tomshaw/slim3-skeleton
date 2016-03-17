<?php

namespace App\Controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

final class HomeController extends AbstractController
{

    public function index(Request $request, Response $response, $args)
    {
        $params = [
            'meta' => [
                'title' => 'Slim 3 Quick Start Skeleton',
                'description' => 'This is a simple skeleton project for Slim 3 that includes Twig, Flash messages and Monolog.'
            ]
        ];
        
        $this->getView()->render($response, 'home/index.phtml', $params);
        
        return $response;
    }
    
}
