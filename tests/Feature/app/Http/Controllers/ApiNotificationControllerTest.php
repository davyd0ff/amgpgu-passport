<?php
  
  namespace Tests\Feature\app\Http\Controllers;
  
  
  use App\Models\Entities\Notification;
  use App\User;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Tests\TestCase;
  use Laravel\Passport\Passport;
  
  
  class ApiNotificationControllerTest extends TestCase {
    use RefreshDatabase;
    
    private $notification;
    private $from;
    private $recipients;
    
    protected function setUp(): void {
      parent::setUp();
      
      $this->from = factory(User::class)->create();
      $this->recipients = collect([
        factory(User::class)->create(),
        factory(User::class)->create(),
        factory(User::class)->create(),
      ]);
      $this->notification = factory(Notification::class)->create([
        'title' => 'TEST',
        'from_user_id' => $this->from,
      ]);
      
      $this->notification->attachRecipients($this->recipients);
    }
    
    
    public function test_getIncoming() {
      Passport::actingAs($this->recipients->first());
      
      $response = $this->get('/api/notifications/incoming');
      
      $response->assertOk();
      $json = json_decode($response->getContent());
      $this->assertEquals($json[0]->title, "TEST");
    }
    
    public function test_setRead() {
      Passport::actingAs($this->recipients[1]);
      
      $response = $this->post('/api/notifications/read/' . $this->notification->id);
      
      $response->assertOk()
        ->assertJson([]);
    }
    
    public function test_getIncoming_UserHasNoNotification() {
      Passport::actingAs(factory(User::class)->create());
      
      $response = $this->get('/api/notifications/incoming');
      
      $response->assertOk()
        ->assertJson([]);
    }
    
    public function test_setReadAll() {
      Passport::actingAs($this->recipients->last());
      
      $response = $this->post('/api/notifications/read-all');
      
      $response->assertOk()
        ->assertJson([]);
    }
    
//    public function test_add(){
//
//    }
  }