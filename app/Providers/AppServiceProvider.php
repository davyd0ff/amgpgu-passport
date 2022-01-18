<?php
  
  namespace App\Providers;
  
  use App\Builders\Menu\IMenuBuilder;
  use App\Builders\Menu\MenuBuilder;
  use App\Passport\PersonalAccessGrantWithRefreshToken;
  use App\Services\University\IUniversityService;
  use App\Services\University\UniversityCachingService;
  use App\Services\University\UniversitySoapService;
  use Illuminate\Support\ServiceProvider;
  use Laravel\Passport\Bridge\RefreshTokenRepository;
  use Laravel\Passport\Passport;
  use League\OAuth2\Server\AuthorizationServer;

  class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register() {
      //
      $this->app->when(UniversityCachingService::class)->needs(IUniversityService::class)->give(UniversitySoapService::class);
      $this->app->singleton(IUniversityService::class, UniversityCachingService::class);
      $this->app->bind(IMenuBuilder::class, MenuBuilder::class);
    }
    
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot() {
      //
      $authorizeServer = resolve(AuthorizationServer::class);
      $grant = new PersonalAccessGrantWithRefreshToken($this->app->make(RefreshTokenRepository::class));
      $grant->setRefreshTokenTTL(Passport::refreshTokensExpireIn());
      $authorizeServer->enableGrantType(
        $grant,
        Passport::personalAccessTokensExpireIn()
      );
    }
  }
