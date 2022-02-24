<?php
  
  
  namespace App\Services\University;
  
  
  use Illuminate\Support\Facades\Cache;
  
  class UniversityCachingService implements IUniversityService {
    private $ttl;
    private $realService;
    
    public function __construct(IUniversityService $service, int $ttl = 60*60*24) {
      $this->ttl = $ttl;
      $this->realService = $service;
    }
    
    public function isListener(string $userCode): bool {
      try{
        return Cache::remember("$userCode-is-listener", $this->ttl, function () use ($userCode) {
          return $this->realService->isListener($userCode);
        });
      } catch (\Exception $exp) {
        return false;
      }
    }
    
    public function isStudent(string $userCode): bool {
      try{
        return Cache::remember("$userCode-is-student", $this->ttl, function () use ($userCode) {
          $studentData = $this->getStudentData($userCode);
          return is_array($studentData->educations) && count($studentData->educations) > 0;
        });
      } catch (\Exception $exp) {
        return false;
      }
    }

    public function getStudentData(string $userCode): object {
      return Cache::remember("$userCode-student-data", $this->ttl, function () use ($userCode) {
        return $this->realService->getStudentData($userCode);
      });
    }
    
    public function getStudentsTree(string $facultyCode = ""): object {
      return Cache::remember("$facultyCode-students-tree", $this->ttl, function () use ($facultyCode) {
        return $this->realService->getStudentsTree($facultyCode);
      });
    }
    
    public function getStudentAcademicPlans(string $userCode): array {
      return Cache::remember("$userCode-student-plans", $this->ttl, function () use ($userCode) {
        return $this->realService->getStudentAcademicPlans($userCode);
      });
    }
  }