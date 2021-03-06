<?php
  
  namespace App\Http\Controllers;
  
  use App\Builders\Menu\IMenuBuilder;
  use App\Exceptions\FailedLoginException;
  use App\Serializer\JsonSerializer;
  use App\User;
  use Illuminate\Auth\Events\Registered;
  use Illuminate\Foundation\Auth\ThrottlesLogins;
  use Illuminate\Http\JsonResponse;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Hash;
  use Illuminate\Support\Facades\Validator;
  use Laravel\Passport\Passport;
  
  class ApiUserController extends Controller {
    use ThrottlesLogins;
    
    
    protected function validator(array $data) {
      return Validator::make($data, [
        'name' => ['required', 'string', 'max:255', 'unique:users,name,' . ($data['id'] ?? '')],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . ($data['id'] ?? '')],
        'password' => ['required', 'string', 'min:8'],
        'code' => ['required', 'string', 'min:9', 'unique:users,code,' . ($data['id'] ?? '')],
      ]);
    }

//    protected function validateLogin(Request $request) {
//      $request->validate([
//        'name' => 'required|string',
//        'password' => 'required|string',
//      ]);
//    }
//
//    protected function credentials(Request $request) {
//      return $request->only('name', 'password');
//    }
//
//    protected function attemptLogin(Request $request): bool {
//      return Auth::guard()->attempt(
//        $this->credentials($request), $request->filled('remember')
//      );
//    }
//
//
//    public function login(Request $request): JsonResponse {
////      $this->validateLogin($request);
//
//      if ($this->attemptLogin($request)) {
//        $user = Auth::guard()->user();
//
//        $token = $user->createToken('PASSPORT');
//
//        return new JsonResponse([
//          'access-token' => $token->accessToken,
////          'refresh-token' => $token->refreshToken,
//          'token-type' => 'Bearer ',
//        ], 200);
//      }
//
//      throw new FailedLoginException();
//    }
    
    public function getUserInfo(Request $request): JsonResponse {
      $user = $request->user();
      return new JsonResponse($user->getSerializableData(), 200);
    }

    public function updateProfile(Request $request): JsonResponse {
      
      return new JsonResponse('NotImplementation', 500);
    }
    
    public function add(Request $request): JsonResponse {
      $data = $request->all();
      
      $user = User::where('name', $data['name'])->first();
      if (!$user) {
        $this->validator($data)->validate();
        
        $user = User::create([
          'name' => $data['name'],
          'email' => $data['email'],
          'password' => Hash::make($data['password']),
          'code' => $data['code'],
          'firstname' => $data['firstname'] ?? '',
          'lastname' => $data['lastname'] ?? '',
          'middlename' => $data['middlename'] ?? '',
        ]);
        
        event(new Registered($user));
      }
      
      return new JsonResponse(['id' => $user->id], 201);
    }
    
    public function update(Request $request): JsonResponse {
      $this->validator($request->all())->validate();
      
      $userId = $request->all()["id"];
      if($userId){
        $user = User::find($userId);
        
        $data = $request->all();
        $user->name = $data['name'];
        $user->code = $data['code'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        $user->firstname = $data['firstname'] ?? '';
        $user->lastname = $data['lastname'] ?? '';
        $user->middlename = $data['middlename'] ?? '';

        $user->save();
      }
      
      return new JsonResponse(['id' => $user->id], 200);
    }
    
    public function suspend(Request $request): JsonResponse {
      $user = $request->user();
      $user->suspended = true;
      $user->save();
      
      return new JsonResponse(['id' => $user->id], 200);
    }
    
    public function delete(Request $request): JsonResponse {
      $user = $request->user();
      $user->delete();
      
      return new JsonResponse(['id' => $user->id]);
    }
    
    public function getMenu(Request $request, IMenuBuilder $menuBuilder): JsonResponse {
      $user = $request->user();
      return new JsonResponse($user->getMenu($menuBuilder)->getSerializableData(), 200);
    }
  }
