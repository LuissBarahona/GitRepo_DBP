package com.example.demo_lab_s2;

import com.example.demo_lab_s2.exceptions.ArtistNotFoundException;
import com.example.demo_lab_s2.exceptions.ErrorMessage;
import com.example.demo_lab_s2.exceptions.ResourceConflictException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptioHandler {
    @ExceptionHandler(ResourceConflictException.class)
    public ResponseEntity<ErrorMessage> handleResourceConflictException(ResourceConflictException e) {
        ErrorMessage error = new ErrorMessage(e.getMessage(), HttpStatus.CONFLICT.toString());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(ArtistNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleArtistNotFoundException(ArtistNotFoundException e) {
        ErrorMessage error = new ErrorMessage(e.getMessage(), HttpStatus.NOT_FOUND.toString());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }


}
