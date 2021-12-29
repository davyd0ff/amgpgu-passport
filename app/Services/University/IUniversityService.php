<?php
  
  
  namespace App\Services\University;
  
  
  interface IUniversityService {
    function isStudent(string $userCode): bool;
    
    function isListener(string $userCode): bool;
    
    function getStudentsTree(string $facultyCode = ""): object;
    
    function getStudentAcademicPlans(string $userCode): array;
    
    function getStudentData(string $userCode): object;
  }