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
      return Cache::remember("$userCode-is-listener", $this->ttl, function () use ($userCode) {
        try {
          return $this->realService->isListener($userCode);
        } catch (\Exception $exp) {
          return false;
        }
      });
    }
    
    public function isStudent(string $userCode): bool {
      return Cache::remember("$userCode-is-student", $this->ttl, function () use ($userCode) {
        try {
          return $this->realService->isStudent($userCode);
        } catch (\Exception $exp) {
          return false;
        }
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
    
    public function getStudentData(string $userCode): array {
      return Cache::remember("$userCode-student-data", $this->ttl, function () use ($userCode) {
        return $this->realService->getStudentData($userCode);
      });
    }
  }