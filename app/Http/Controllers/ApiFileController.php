<?php
  
  
  namespace App\Http\Controllers;
  
  
  use App\Models\Entities\File;
  use Illuminate\Http\JsonResponse;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Storage;
  
  
  class ApiFileController extends Controller {
    
    public function fetchFiles(Request $request, $context): JsonResponse {
//      $user = $request->user();
//
//      $files = $user->files
//        ->where('context', $context)
//        ->all();
//
//      return new JsonResponse(collect($files)->map(function (File $f) {
//        return $f->getSerializableData();
//      }));
      
      $user = $request->user();
      
      $files = $user->getFiles($context)
        ->map(function (File $f) {
          return $f->getSerializableData();
        })
        ->toArray();
      
      return new JsonResponse($files);
    }
    
    public function uploadFiles(Request $request, $context): JsonResponse {
      $user = $request->user();
      $files = collect();
      
      foreach ($request->file('files') as $file) {
        $path = $file->store('public');
        $file = new File([
          'name' => $file->getClientOriginalName(),
          'path' => $path,
          'type' => $file->getMimeType(),
          'context' => $context,
        ]);
        $file->owner()->associate($user);
        $file->save();
        $files->add($file);
      }
      
      return new JsonResponse($files
        ->map(function (File $f) {
          return $f->getSerializableData();
        })
        ->toArray()
      );
    }
    
    public function delete(Request $request, File $file): JsonResponse {
      Storage::delete($file->path);
      $file->delete();
      
      return new JsonResponse(['id' => $file->id]);
    }
  }