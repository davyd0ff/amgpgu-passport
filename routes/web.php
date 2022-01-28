<?php
  
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Route;
  
  Auth::routes();
  Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
  Route::post('login', 'Auth\LoginController@login');
  Route::post('logout', 'Auth\LoginController@logout')->name('logout');
  
  
  Route::get('/{path?}/{page?}/{param?}', function (Request $request, $path = null, $page = null, $param = null) {
    $encodedUser = '{}';
    $encodedToken = '{}';

    $user = $request->user();
    if($user){
      $tokens = $user->createToken('Passport ' . $user->name);
      $encodedToken = json_encode([
        'access_token' => $tokens->accessToken,
        'refresh_token' => $tokens->refreshToken,
        'token_type' => $tokens->tokenType,
      ], JSON_UNESCAPED_UNICODE);
      $encodedUser = json_encode($user->getSerializableData(), JSON_UNESCAPED_UNICODE);
    }
      
    return view('application', [
      'user' => $encodedUser,
      'token' => $encodedToken
    ]);
  });
  
  
  //   Route::post('logout', 'Auth\LoginController@logout')->name('logout');
  
  //   Route::group(['middleware' => ['auth']], function () {
  // //    Route::group(['prefix' => 'files'], function () {
  // //      Route::get('/fetch/{context}', 'FileController@fetchFiles');
  // //      Route::post('/upload/{context}', 'FileController@uploadFiles');
  // //      // todo develop: тут скорее всего тоже нужен context (аля категория)
  // //      //               чей файл удаляем... студента, слушателя, сотрудника или администратора
  // //      Route::delete('/delete/{file}', 'FileController@delete')
  // //        ->middleware('is-owner:file,' . Capabilities::CAN_DELETE_STUDENT_FILES);
  // //    });
  
  
  //     Route::get('/{path?}/{page?}/{param?}', function ($path = null, $page = null, $param = null) {
  //       $user = auth()->user();
  
  //       return view('application', [
  //         'user' => json_encode($user->serialize(new \App\Serializer\JsonSerializer()), JSON_UNESCAPED_UNICODE),
  //       ]);
  //     });
  //   });
  
  
  
