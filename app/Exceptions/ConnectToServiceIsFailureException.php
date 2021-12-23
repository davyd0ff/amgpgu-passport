<?php
  
  
  namespace App\Exceptions;
  
  
  class ConnectToServiceIsFailureException extends AmgpguPassportException {
    protected $messageCode = 'CONNECT_TO_SERVICE_IS_FAILURE';
  }