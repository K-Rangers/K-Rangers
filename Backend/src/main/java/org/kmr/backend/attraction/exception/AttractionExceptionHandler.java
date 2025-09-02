package org.kmr.backend.attraction.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "org.kmr.backend.attraction.api")
public class AttractionExceptionHandler {

    @ExceptionHandler(AttractionNotFoundException.class)
    public ResponseEntity<String> handleAttractionNotFoundException(AttractionNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
