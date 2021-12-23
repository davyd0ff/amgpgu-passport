<?php
  
  namespace App\Http\Controllers;
  
  use App\Services\University\IUniversityService;
  use Illuminate\Http\JsonResponse;
  use App\Services\University\UniversityCachingService;
  use App\Services\University\UniversitySoapService;
  
  
  class ApiEmployeeController extends Controller {
    public function getStudentsTree(IUniversityService $universityService, $facultyCode = ""): JsonResponse {
      $studentTree = $universityService->getStudentsTree($facultyCode);
      
      return new JsonResponse($studentTree, 200);
    }
  }
