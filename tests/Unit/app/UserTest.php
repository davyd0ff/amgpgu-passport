<?php
  
  namespace Tests\Unit\app;

  use App\User;
  use Tests\TestCase;

  class UserTest extends TestCase {
    protected function setUp(): void{
      parent::setUp();
  
      $this->artisan('passport:client', [
        '--personal' => true,
        '--name' => config('app.name') . 'Personal Access Test',
      ]);
    }
    
    public function test_createToken(){
      $user = factory(User::class)->create();
      
      $tokens = $user->createToken('TEST TOKEN');
      
      $this->assertObjectHasAttribute('accessToken', $tokens);
      $this->assertObjectHasAttribute('refreshToken', $tokens);
      $this->assertObjectHasAttribute('tokenType', $tokens);
      $this->assertIsString($tokens->accessToken);
      $this->assertIsString($tokens->refreshToken);
      $this->assertIsString($tokens->tokenType);
      $this->assertEquals($tokens->tokenType, 'Bearer');
    }

    public function test_getUserCode_userHasCode() {
      $user = factory(User::class)->create(['code' => 'TEST']);

      $code = $user->getUserCode();

      $this->assertEquals($code, 'TEST');
    }

    public function test_getUserCode_userHasNoCode() {
      $user = factory(User::class)->create(['code' => null]);

      $code = $user->getUserCode();

      $this->assertEquals($code, '0');
    }
  }