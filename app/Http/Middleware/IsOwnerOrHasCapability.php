<?php
  
  namespace App\Http\Middleware;
  
  use App\Exceptions\AmgpguPassportException;
  use App\Exceptions\CapabilityWasNotFoundException;
  use App\Exceptions\UserHasNotCapabilityException;
  use App\Models\Entities\Capability;
  use Closure;
  
  class IsOwnerOrHasCapability extends HasCapability {
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, string $parameterName, string $capabilityName) {
      if (!$this->userIsOwner($request, $parameterName)) {
        return $this->checkCapability($request, $next, $capabilityName);
      }
      return $next($request);
    }
    
    private function userIsOwner($request, string $parameterName) {
      $user = auth()->user();
      $model = $request->route($parameterName);
      
      return $user->compare($model->owner);
    }
    
    private function checkCapability($request, Closure $next, string $capabilityName) {
      return parent::handle($request, $next, $capabilityName);
    }
  }
