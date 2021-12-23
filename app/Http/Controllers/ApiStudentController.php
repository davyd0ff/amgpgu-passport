<?php
  
  namespace App\Http\Controllers;
  
  use App\Services\University\IUniversityService;
  use App\User;
  use Illuminate\Http\JsonResponse;
  use Illuminate\Http\Request;
  
  class ApiStudentController extends Controller {
    
    public function getData(Request $request, IUniversityService $service): JsonResponse {
      $user = $request->user();
      $studentData = $service->getStudentData($user->getUserCode());
      
      return new JsonResponse($studentData, 200);
    }
  }