<?php

    namespace App\Services\University;

    class HttpEndpoints {
      public const getStudentsTree = [
        'method' => 'GET',
        'point' => '/passport/students/tree',
      ];

      public const isStudent = [
        'method' => 'GET',
        'point' => '/passport/is-student',
      ];

      public const isListener = [
        'method' => 'GET',
        'point' => '/passport/is-listener',
      ];

      public const getStudentData = [
        'method' => 'GET',
        'point' => '/passport/students/data/$usercode',
      ];
    }