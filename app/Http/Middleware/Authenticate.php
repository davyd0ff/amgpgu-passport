<?php
  
  namespace App\Http\Middleware;
  
  use App\Exceptions\UserIsNotAuthenticatedException;
  use App\User;
  use Closure;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Auth\Middleware\Authenticate as Middleware;
  
  class Authenticate extends Middleware {
//    public function handle($request, Closure $next, ...$guards) {
//      if (Auth::guest()) {
//        if (in_array('api', $guards)) {
//          throw new UserIsNotAuthenticatedException();
//        } else {
//          parent::handle($request, $next, $guards[0] ?? null);
//        }
//      }
//      return $next($request);
//    }
    
    protected function redirectTo($request) {
      if (!$request->expectsJson()) {
        return route('login');
      }
    }
  }
