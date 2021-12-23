<?php
  
  
  namespace App\Exceptions;
  
  use Exception;

  class AmgpguPassportException extends Exception {
    protected $messageCode;
    protected $messageDetailed;
    protected $code = 400;
    
    public function render($request) {
      return response()->json([
        'messageCode' => $this->messageCode,
        'messageDetailed' => $this->message
      ], $this->code);
    }
  }