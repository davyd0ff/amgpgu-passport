<?php
  
  namespace Tests\Feature\app\Http\Controllers;
  
  use App\User;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Illuminate\Support\Facades\Hash;
  use Tests\TestCase;
  use Laravel\Passport\Passport;
  
  
  class ApiUserControllerTest extends TestCase {
    use RefreshDatabase;
    
    private const USER_NAME = 'TEST';
    private const USER_SECRET = 'TEST';
    private const USER_EMAIL = 'test@amgpgu.ru';
    private $oldAuthData;    
    
    protected function setUp(): void {
      parent::setUp();
      
      factory(User::class)->create([
        'name' => self::USER_NAME,
        'email' => self::USER_EMAIL,
        'password' => Hash::make(self::USER_SECRET),
      ]);
      
      $this->artisan('passport:client', [
        '--personal' => true,
        '--name' => config('app.name') . 'Personal Access',
      ]);
      
      $this->artisan('passport:client', [
        '--password' => true,
        '--name' => env('PASSPORT_GRANT_CLIENT_NAME'),
        '--provider' => 'users',
      ]);
      
      $this->oldAuthData = $this->call('post', '/api/login', [
        'username' => self::USER_NAME,
        'password' => self::USER_SECRET,
      ])->json();
    }
    
    
    public function test_login_ViaDefaultClient() {
      $response = $this->call('post', '/api/login', [
        'username' => self::USER_NAME,
        'password' => self::USER_SECRET,
      ]);
      
      $response->assertJsonPath("token_type", "Bearer")
        ->assertJsonStructure([
          'token_type',
          'expires_in',
          'access_token',
          'refresh_token',
        ]);
    }
  
    /**
     * @depends test_login_ViaDefaultClient
     */
    public function test_getUserInfo_WithOldAccessToken() {
      $authorizationHeader = $this->oldAuthData["token_type"] . ' ' . $this->oldAuthData['access_token'];
    
      $response = $this->withHeaders([
        'Accept' => 'application/json',
        'Authorization' => $authorizationHeader,
      ])
        ->get('/api/user');
    
      $response->assertJsonPath('name', self::USER_NAME)
        ->assertJsonPath('email', self::USER_EMAIL);
    }
    
    public function test_login_ViaOthersClient() {
      $otherClientName = "TEST GRANT CLIENT PASSWORD";
      $this->artisan('passport:client', [
        '--password' => true,
        '--name' => $otherClientName,
        '--provider' => 'users',
      ]);
      $otherClient = Passport::client()->where('name', $otherClientName)->first();
      
      
      $response = $this->call('post', '/api/login', [
        'grant_type' => 'password',
        'client_id' => $otherClient->id,
        'client_secret' => $otherClient->secret,
        'username' => self::USER_NAME,
        'password' => self::USER_SECRET,
        'scope' => '*',
      ]);
      
      
      $response->assertJsonPath("token_type", "Bearer")
        ->assertJsonStructure([
          'token_type',
          'expires_in',
          'access_token',
          'refresh_token',
        ]);
    }
    
    public function test_login_ViaWrongClient() {
      $response = $this->call('post', '/api/login', [
        'grant_type' => 'password',
        'client_id' => '123',
        'client_secret' => 'TEST CLIENT SECRET',
        'username' => self::USER_NAME,
        'password' => self::USER_SECRET,
        'scope' => '*',
      ]);
      
      $response->assertUnauthorized()
        ->assertJsonStructure([
          'error',
          'error_description',
          'message',
        ]);
    }
    
    public function test_login_WithWrongCredentials() {
      $response = $this->call('post', '/api/login', [
        'username' => "WRONG_USER_NAME",
        'password' => "WRONG_USER_PASSWORD",
      ]);
      
      $response->assertStatus(400)
        ->assertJsonStructure([
          'error',
          'error_description',
          'message',
        ]);
    }

    public function test_refreshToken_ViaDefaultClient(){
      $response = $this->call('post', '/api/login/refresh', [
        'refresh_token' => $this->oldAuthData['refresh_token'],
      ]);

      $response->assertJsonStructure([
        'token_type',
        'expires_in',
        'access_token',
        'refresh_token',
      ]);
    }

    public function test_refreshToken_ViaDefaultClientWithWrongToken() {
      $response = $this->call('post', '/api/login/refresh', [
        'refresh_token' => 'A AM AN WRONG TOKEN',
      ]);

      $response->assertUnauthorized();
    }
  }