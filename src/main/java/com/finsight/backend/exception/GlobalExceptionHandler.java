package com.finsight.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleAll(Exception e) {

        e.printStackTrace(); // for you (console log)

        Map<String, String> error = new HashMap<>();
        error.put("error", "Something went wrong. Please try another file.");

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
