<?php
  
  namespace App\Http\Middleware;
  
  use Closure;
  use Laravel\Passport\ClientRepository;
  use Laravel\Passport\Passport;
  // use Mockery\Generator\StringManipulation\Pass\Pass;
  
  class RefreshTokenViaPersonalClient {
    private $clientRepository;
    
    public function __construct(ClientRepository $repository){
      $this->clientRepository = $repository;
    }
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    
    public function handle($request, Closure $next) {

      if (empty($request->client_id)) {
        $client = $this->clientRepository->personalAccessClient();

        $request->merge([
          'grant_type' => 'refresh_token',
          'client_id' => $client->id,
          'client_secret' => $client->secret,
          'scope' => '',
        ]);
      }
      
      return $next($request);
    }
  }
