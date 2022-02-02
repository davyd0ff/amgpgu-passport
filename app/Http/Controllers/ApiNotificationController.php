<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Entities\Notification;
  use App\Models\Entities\File;
  use Illuminate\Http\JsonResponse;
  use Illuminate\Http\Request;
  use App\User;
  
  class ApiNotificationController extends Controller {
    
    public function getIncoming(Request $request): JsonResponse {
      $user = $request->user();
      
      // todo develop: добавить секционирование по дате, на данный момент грузятся все уведомления за год
      //               возможно... придется добавлять старые уведомления, если пользователь не прочитал еще старее уведомления
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
    }
    
    public function setRead(Request $request, int $id): JsonResponse {
      $user = $request->user();
      $user->readNotifications([$id]);
      
      // todo develop: add event - "user read notification". example of event is ApiUserController@Add
      return new JsonResponse([], 200);
    }
    
    public function setReadAll(Request $request): JsonResponse {
      $user = $request->user();
      
      $user->readNotifications(
        $user->getUnreadIncomingNotifications()
          ->map(function (Notification $notification) {
            return $notification->id;
          })
          ->all()
      );
      // todo develop: add event for each notification
      return new JsonResponse([], 200);
    }
    
    public function add(Request $request) {
      // todo develop: user has capability for to add notification
      $user = auth()->user();
      $recipients = json_decode($request->recipients ?? "[]");
      $files = $request->file('files') ?? [];
      
      $notification = Notification::create([
        'title' => $request->title,
        'message' => $request->message,
        'from_user_id' => $user->id,
      ]);
      
      foreach ($files as $file) {
        $path = $file->store('public');
        $file = new File([
          'name' => $file->getClientOriginalName(),
          'path' => $path,
          'type' => $file->getMimeType(),
          'context' => 'notifications'
        ]);
        $file->owner()->associate($notification);
        $file->save();
      }
      
      $notification->attachRecipients(User::whereIn('code', $recipients)->get());
      
      return new JsonResponse([]);
    }
  }
