<?php
  
  namespace App\Http;
  
  use App\Http\Middleware\ForceJsonResponse;
  use App\Http\Middleware\HasCapability;
  use App\Http\Middleware\IsOwnerOrHasCapability;
  use App\Http\Middleware\LoginViaDefaultClient;
  use App\Http\Middleware\RefreshTokenViaDefaultClient;
  use App\Http\Middleware\RefreshTokenViaPersonalClient;
  use App\Http\Middleware\TargetHasLowerRolePriority;
  use App\Http\Middleware\TargetIsNotAdmin;
  use Illuminate\Foundation\Http\Kernel as HttpKernel;
  
  class Kernel extends HttpKernel {
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
      \App\Http\Middleware\TrustProxies::class,
      \Fruitcake\Cors\HandleCors::class,
      \App\Http\Middleware\CheckForMaintenanceMode::class,
      \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
      \App\Http\Middleware\TrimStrings::class,
      \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];
    
    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
      'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        // \Illuminate\Session\Middleware\AuthenticateSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
      ],
      
      'api' => [
        // 'throttle:60,1',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
      ],
    ];
    
    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
      'auth' => \App\Http\Middleware\Authenticate::class,
      'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
      'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
      'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
      'can' => \Illuminate\Auth\Middleware\Authorize::class,
      'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
      'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
      'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
      'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
      'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
      'has-capability' => HasCapability::class,
      'is-owner' => IsOwnerOrHasCapability::class,
      'target-is-not-admin' => TargetIsNotAdmin::class,
      'target-has-lower-role-priority' => TargetHasLowerRolePriority::class,
      'login-via-default-client' => LoginViaDefaultClient::class,
      'refresh-token-via-default-client' => RefreshTokenViaDefaultClient::class,
      'refresh-token-via-personal-client' => RefreshTokenViaPersonalClient::class,
      'force-json-response' => ForceJsonResponse::class,
    ];
  }
