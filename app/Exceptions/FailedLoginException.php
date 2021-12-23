<?php
  
  namespace App\Exceptions;
  
  class FailedLoginException extends AmgpguPassportException {
    protected $messageCode = 'FAILED_TO_LOGIN';
    protected $code = 400;
  }