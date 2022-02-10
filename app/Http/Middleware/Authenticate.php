<?php
  
  namespace App\Http\Middleware;
  
  use App\Exceptions\UserIsNotAuthenticatedException;
  use Illuminate\Auth\Middleware\Authenticate as Middleware;

  class Authenticate extends Middleware {

    protected function unauthenticated($request, array $guards) {
      if (in_array('api', $guards)) {
        throw new UserIsNotAuthenticatedException();
      } else {
        parent::unauthenticated($request, $guards);
      }
    }
  
    protected function redirectTo($request) {
      if (!$request->expectsJson()) {
        return route('login');
      }
    }
  }
