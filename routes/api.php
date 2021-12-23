<?php
  
  use App\Capabilities;
  use App\Http\Middleware\HasCapability;
  use Illuminate\Support\Facades\Route;
  
  /*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
  */
  Route::get('/test/phpinfo', function(){
    return phpinfo();
  });
  Route::get('/test/students/tree', 'ApiEmployeeController@getStudentsTree');

  Route::group(['middleware' => ['force-json-response']], function () {
    Route::post('/login', 'ApiAccessTokenController@issueToken')
      ->middleware(['login-via-default-client', 'throttle']);
    Route::post('/login/refresh', 'ApiAccessTokenController@issueToken')
      ->middleware(['refresh-token-via-default-client', 'throttle']);
    
    Route::group(['middleware' => ['auth:api']], function () {
      Route::group(['prefix' => 'user'], function () {
        Route::get('/', 'ApiUserController@getUserInfo');
        Route::get('/menu', 'ApiUserController@getMenu');
        Route::get('/student-data', 'ApiStudentController@getData');
//      Route::get('/listener-data', 'ApiListenerController@getData');
      });
      
      Route::group(['prefix' => 'notifications'], function () {
        Route::get('/incoming', 'ApiNotificationController@getIncoming');
        Route::post('/read/{id}', 'ApiNotificationController@setRead');
        Route::post('/read-all', 'ApiNotificationController@setReadAll');
      });
      
      
      Route::group(['prefix' => 'students'], function () {
        Route::get('/tree/{facultyCode?}', 'ApiEmployeeController@getStudentsTree')
          ->middleware(HasCapability::getStringForRoute(Capabilities::CAN_GET_STUDENT_TREE));
      });
      
      Route::group(['prefix' => 'admin'], function () {
        Route::group(['prefix' => 'notifications'], function () {
          // todo develop: Если я хочу чтобы это работало, то скорее всего придется добавлять категории для пользователей
          //               Listener, Employee, Student...
          //               Категория будет отдельной Entity
          Route::post('/add-for-students', 'NotificationController@add')
            ->middleware(HasCapability::getStringForRoute(Capabilities::CAN_ADD_NOTIFICATION_FOR_STUDENTS));
          Route::post('/add-for-employees', 'NotificationController@add')
            ->middleware(HasCapability::getStringForRoute(Capabilities::CAN_ADD_NOTIFICATION_FOR_EMPLOYEES));
          Route::post('/add-for-listeners', 'NotificationController@add')
            ->middleware(HasCapability::getStringForRoute(Capabilities::CAN_ADD_NOTIFICATION_FOR_LISTENERS));
        });
        
        Route::group(['prefix' => 'users'], function () {
          Route::post('/add', 'ApiUserController@add')
            ->middleware([HasCapability::getStringForRoute(Capabilities::CAN_CREATE_USER)]);
          
          Route::group(['middleware' => ['target-is-not-admin', 'target-has-lower-role-priority']], function () {
            Route::post('/remove/{user}', 'ApiUserController@delete')
              ->middleware([HasCapability::getStringForRoute(Capabilities::CAN_DELETE_USER)]);
            Route::post('/update', 'ApiUserController@update')
              ->middleware([HasCapability::getStringForRoute(Capabilities::CAN_UPDATE_USER)]);
            Route::post('/suspend/{user}', 'ApiUserController@suspend')
              ->middleware([HasCapability::getStringForRoute(Capabilities::CAN_SUSPEND_USER)]);
          });
        });
      });
      
    });
  });
  