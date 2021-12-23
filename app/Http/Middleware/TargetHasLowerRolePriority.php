<?php
  
  namespace App\Http\Middleware;
  
  use App\Exceptions\OperationDeniedException;
  use App\User;
  use Closure;
  
  class TargetHasLowerRolePriority {
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
      $current_user = $request->user();
      $target_user = User::where('id', $request->all()['id'])->first();
      
      $current_user_min_priority = $current_user->roles->min('priority');
      $target_user_min_priority = $target_user->roles->min('priority') ?? 1000;
      
      if ($current_user_min_priority > $target_user_min_priority) {
        throw new OperationDeniedException();
      }
      
      return $next($request);
    }
  }
