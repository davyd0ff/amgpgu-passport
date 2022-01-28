<?php
  
  namespace App\Http\Middleware;
  
  use App\Exceptions\AmgpguPassportException;
  use App\Exceptions\CapabilityWasNotFoundException;
  use App\Exceptions\UserHasNotCapabilityException;
  use App\Models\Entities\Capability;
  use Closure;
  
  class IsOwnerOrHasCapability {
    private $middlewareHasCapability;
    
    public function __construct(HasCapability $middleware){
      $this->middlewareHasCapability = $middleware;
    }
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
      return $this->middlewareHasCapability->handle($request, $next, $capabilityName);
    }
    
    public static function getMiddlewareName(string $capability): string {
      return 'is-owner:file,' . $capability;
    }
  }
