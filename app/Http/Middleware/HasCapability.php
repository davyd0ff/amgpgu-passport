<?php
  
  namespace App\Http\Middleware;
  
  use App\Exceptions\CapabilityWasNotFoundException;
  use App\Exceptions\UserHasNotCapabilityException;
  use App\Models\Entities\Capability;
  use Closure;
  
  class HasCapability {
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    
    public function handle($request, Closure $next, string $capabilityName) {
      $user = $request->user();
      $capability = Capability::where('name', $capabilityName)->first();
      
      if ($capability && $user) {
        if ($user->hasCapability($capability)) {
          return $next($request);
        }
        
        throw new UserHasNotCapabilityException($capability->alias);
      }
      
      throw new CapabilityWasNotFoundException();
    }
    
    public static function getMiddlewareName(string $capability) : string {
      return 'has-capability:' . $capability;
    }
  }
