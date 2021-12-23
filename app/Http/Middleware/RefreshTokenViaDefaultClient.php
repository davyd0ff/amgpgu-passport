<?php
  
  namespace App\Http\Middleware;
  
  use Closure;
  use Laravel\Passport\Passport;
  // use Mockery\Generator\StringManipulation\Pass\Pass;
  
  class RefreshTokenViaDefaultClient {
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    
    public function handle($request, Closure $next) {

      if (empty($request->client_id)) {
        $client = Passport::client()->where('name', env('PASSPORT_GRANT_CLIENT_NAME'))->first();

        $request->merge([
          'grant_type' => 'refresh_token',
          'client_id' => $client->id, // env('PASSPORT_GRANT_PASSWORD_CLIENT_ID'),
          'client_secret' => $client->secret, // env('PASSPORT_GRANT_PASSWORD_CLIENT_SECRET'),
          'scope' => '*',
        ]);
      }
      
      return $next($request);
    }
  }
