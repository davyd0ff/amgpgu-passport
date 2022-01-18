<?php
  
  namespace App\Passport;
  
  use DateInterval;
  use Laravel\Passport\Bridge\PersonalAccessGrant;
  use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;
  use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
  use Psr\Http\Message\ServerRequestInterface;

  class PersonalAccessGrantWithRefreshToken extends PersonalAccessGrant {
    public function __construct(
      RefreshTokenRepositoryInterface $refreshTokenRepository
    ) {
      $this->setRefreshTokenRepository($refreshTokenRepository);
    }
    
    public function respondToAccessTokenRequest(ServerRequestInterface $request, ResponseTypeInterface $responseType, DateInterval $accessTokenTTL) {
      $client = $this->validateClient($request);
      $scopes = $this->validateScopes($this->getRequestParameter('scope', $request));
      
      $scopes = $this->scopeRepository->finalizeScopes($scopes, $this->getIdentifier(), $client);
      
      $accessToken = $this->issueAccessToken(
        $accessTokenTTL,
        $client,
        $this->getRequestParameter('user_id', $request),
        $scopes
      );
      $responseType->setAccessToken($accessToken);
      
      $refreshToken = $this->issueRefreshToken($accessToken);
      $responseType->setRefreshToken($refreshToken);
      
      return $responseType;
    }
  }