<?php
  
  use App\Capabilities;
  use App\Http\Middleware\HasCapability;
  use App\Http\Middleware\IsOwnerOrHasCapability;
  use App\Models\Entities\Notification;
  use Illuminate\Http\JsonResponse;
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
  
  Route::group(['prefix' => 'test'], function () {
    Route::get('/phpinfo', function () {
      return phpinfo();
    });
    Route::get('/notifications', function () {
      $user = App\User::where('id', 1)->first();
      return new JsonResponse(
        $user
          ->getIncomingNotifications(now()->addYears(-1))
          ->map(function (Notification $notification) {
            return $notification->getSerializableData();
          })
          ->map(function ($notification) {
            $notification['isMeantToMe'] = true;
            return $notification;
          }), 200);
    });
  });
  
  
  Route::group(['middleware' => ['force-json-response']], function () {
    Route::post('/logout', 'Auth\LoginController@logout');
    Route::post('/login/default', 'ApiAccessTokenController@issueToken')
      ->middleware(['login-via-default-client', 'throttle']);
    Route::post('/login/refresh/default', 'ApiAccessTokenController@issueToken')
      ->middleware(['refresh-token-via-default-client', 'throttle']);
    Route::post('/login/refresh/personal', 'ApiAccessTokenController@issueToken')
      ->middleware(['refresh-token-via-personal-client', 'throttle']);
    
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
      
      Route::group(['prefix' => 'files'], function () {
        Route::get('/fetch/{context}', 'ApiFileController@fetchFiles');
        Route::post('/upload/{context}', 'ApiFileController@uploadFiles');
        // todo think: CAN_DELETE_STUDENT_FILES ?? А если файлы listeners? или employees?
        Route::delete('/delete/{file}', 'ApiFileController@delete')
          ->middleware(IsOwnerOrHasCapability::getMiddlewareName(Capabilities::CAN_DELETE_STUDENT_FILES));
      });
      
      Route::group(['prefix' => 'students'], function () {
        Route::get('/tree/{facultyCode?}', 'ApiEmployeeController@getStudentsTree')
          ->middleware(HasCapability::getMiddlewareName(Capabilities::CAN_GET_STUDENT_TREE));
      });
      
      Route::group(['prefix' => 'admin', 'middleware' => ['throttle:6000,1']], function () {
        Route::group(['prefix' => 'notifications'], function () {
          Route::group(['prefix' => 'add'], function () {
            Route::post('/for-students', 'ApiNotificationController@add')
              ->middleware(HasCapability::getMiddlewareName(Capabilities::CAN_ADD_NOTIFICATION_FOR_STUDENTS));
            Route::post('/for-employees', 'ApiNotificationController@add')
              ->middleware(HasCapability::getMiddlewareName(Capabilities::CAN_ADD_NOTIFICATION_FOR_EMPLOYEES));
            Route::post('/for-listeners', 'ApiNotificationController@add')
              ->middleware(HasCapability::getMiddlewareName(Capabilities::CAN_ADD_NOTIFICATION_FOR_LISTENERS));
          });
        });
        
        Route::group(['prefix' => 'users'], function () {
          Route::post('/add', 'ApiUserController@add')
            ->middleware([HasCapability::getMiddlewareName(Capabilities::CAN_CREATE_USER)]);
          
          Route::group(['middleware' => ['target-is-not-admin', 'target-has-lower-role-priority']], function () {
            Route::post('/remove/{user}', 'ApiUserController@delete')
              ->middleware([HasCapability::getMiddlewareName(Capabilities::CAN_DELETE_USER)]);
            Route::post('/update', 'ApiUserController@update')
              ->middleware([HasCapability::getMiddlewareName(Capabilities::CAN_UPDATE_USER)]);
            Route::post('/suspend/{user}', 'ApiUserController@suspend')
              ->middleware([HasCapability::getMiddlewareName(Capabilities::CAN_SUSPEND_USER)]);
          });
        });
      });
    });
    
    Route::any('/{path?}/{page?}/{param?}', function () {
      throw new App\Exceptions\OperationDeniedException();
    });
  });
  