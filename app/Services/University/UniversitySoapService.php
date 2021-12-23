<?php
  
  
  namespace App\Services\University;
  
  
  use App\Services\University\SoapService;
  
  class UniversitySoapService implements IUniversityService {
    private $soapClient;
    
    public function __construct() {
      $login = env("SERVICE_1C_PASSPORT_USERNAME");
      $password = env("SERVICE_1C_PASSPORT_PASSWORD");
      $url = env("SERVICE_1C_PASSPORT_URL");
      
      $this->soapClient = new SoapService($url, $login, $password);
    }
    
    public function isStudent(string $userCode): bool {
      return $this->soapClient->isStudent(['usercode' => $userCode]);
    }
    
    public function isListener(string $userCode): bool {
      return $this->soapClient->isListener(['usercode' => $userCode]);
    }
    
    public function getStudentAcademicPlans(string $userCode): array {
      // TODO: Implement getStudentAcademicPlans() method.
    }
  
    public function getStudentData(string $userCode): array {
      return $this->soapClient->getStudentData(['usercode' => $userCode]);
    }
    
    public function getStudentsTree(string $facultyCode = ""): object {
      return $this->soapClient->getStudentsTree(['facultyCode' => $facultyCode]);
    }
  }