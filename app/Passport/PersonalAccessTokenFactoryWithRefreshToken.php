<?php
  
  namespace App\Passport;
  
  use Laravel\Passport\ClientRepository;
  use Laravel\Passport\PersonalAccessTokenFactory;
  use Laravel\Passport\TokenRepository;
  use Lcobucci\JWT\Parser as JwtParser;
  use League\OAuth2\Server\AuthorizationServer;

  class PersonalAccessTokenFactoryWithRefreshToken extends PersonalAccessTokenFactory {
    public function __construct(AuthorizationServer $server, ClientRepository $clients, TokenRepository $tokens, JwtParser $jwt) {
      parent::__construct($server, $clients, $tokens, $jwt);
    }
    public function make($userId, $name, array $scopes = []) {
      $response = $this->dispatchRequestToAuthorizationServer(
        $this->createRequest($this->clients->personalAccessClient(), $userId, $scopes)
      );
      
      $token = tap($this->findAccessToken($response), function($token) use ($userId, $name){
        $this->tokens->save($token->forceFill([
          'user_id' => $userId,
          'name' => $name
        ]));
      });
      
      // todo develop: скорее всего необходимо как-то сохранить refreshToken
      
      return new PersonalAccessTokenResultWithRefreshToken(
        $response['access_token'],
        $token,
        $response['refresh_token'],
        $response['token_type']
      );
    }
  }