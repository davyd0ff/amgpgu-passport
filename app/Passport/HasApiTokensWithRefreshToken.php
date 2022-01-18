<?php
  namespace App\Passport;

  use Illuminate\Container\Container;
  use Laravel\Passport\HasApiTokens;

  trait HasApiTokensWithRefreshToken {
    use HasApiTokens {
      HasApiTokens::createToken as parentCreateToken;
    }
    
    public function createToken($name, array $scopes = []){
      return Container::getInstance()->make(PersonalAccessTokenFactoryWithRefreshToken::class)->make(
        $this->getKey(), $name, $scopes
      );
    }
  }