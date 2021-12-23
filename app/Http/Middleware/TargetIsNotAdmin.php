<?php
  
  namespace App\Http\Middleware;
  
  use App\Exceptions\OperationsOnAdminAreNotAvailableException;
  use App\User;
  use Closure;
  
  class TargetIsNotAdmin {
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
      if ($this->currentUserIsNotAdmin($request) && $this->targetUserIsAdmin($request)) {
        throw new OperationsOnAdminAreNotAvailableException();
      }
      
      return $next($request);
    }
    
    
    private function currentUserIsNotAdmin($request) {
      $current_user_id = $request->user()->id;
      return $current_user_id !== $this->getAdminId();
    }
    
    private function targetUserIsAdmin($request) {
      $target_user_id = $request->all()['id'];
      
      return $target_user_id === $this->getAdminId();
    }
    
    private function getAdminId() {
      return User::where('name', env('APP_ADMIN_NAME'))->first()->id;
    }
  }
