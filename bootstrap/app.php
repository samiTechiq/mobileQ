<?php

use Illuminate\Foundation\Application;
use App\Http\Middleware\HandleAgentRoute;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\HandleDashboardRedirect;
use App\Http\Middleware\HandleReceptionistRoute;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'dashboard' => HandleDashboardRedirect::class,
            'receptionist' => HandleReceptionistRoute::class,
            'agent' => HandleAgentRoute::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();