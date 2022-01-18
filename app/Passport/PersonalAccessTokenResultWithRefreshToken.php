<?php
  
  namespace App\Passport;
  
  use Laravel\Passport\PersonalAccessTokenResult;

  class PersonalAccessTokenResultWithRefreshToken extends PersonalAccessTokenResult {
    public $refreshToken;
    public $tokenType;
    
    public function __construct($accessToken, $token, $refreshToken, $tokenType) {
      parent::__construct($accessToken, $token);
      
      $this->refreshToken = $refreshToken;
      $this->tokenType = $tokenType;
    }
    
    public function toArray() {
      $arr = parent::toArray();
      $arr['refreshToken'] = $this->refreshToken;
      $arr['tokenType'] = $this->tokenType;
      
      return $arr;
    }
  }