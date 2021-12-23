<?php
  
  namespace Tests\Unit\app\Http\Controllers;
  
  
  use App\Models\Entities\Notification;
  use App\User;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Illuminate\Support\Collection;
  use Laravel\Passport\Passport;
  use Tests\TestCase;
  
  class ApiNotificationControllerTest extends TestCase {
    use RefreshDatabase;
    
    public function test_getIncoming() {
      Passport::actingAs($this->getUserStub());
      
      $response = $this->get('/api/notifications/incoming');
      
      $response->assertOk()
        ->assertJson([['title' => 'TEST']]);
    }
    
    
    private function getUserStub() {
      $stub = $this->createMock(User::class);
      $stub->method('getIncomingNotifications')->willReturnCallback(function () {
        return new Collection([$this->getNotificationStub()]);
      });
      
      return $stub;
    }
    
    private function getNotificationStub() {
      $stub = $this->createMock(Notification::class);
      $stub->method('getSerializableData')->willReturn(['title' => "TEST"]);
      
      return $stub;
    }
  }