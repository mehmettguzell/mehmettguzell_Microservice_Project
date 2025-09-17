package com.mehmettguzell.microservices.product.exception;

import com.mehmettguzell.microservices.product.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    public ErrorResponse buildError(HttpStatus status, String code, String message ) {
        return new ErrorResponse(
                java.time.ZonedDateTime.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                code,
                message
        );
    }
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProductNotFoundException(ProductNotFoundException ex) {
        return new ResponseEntity<>(buildError(HttpStatus.NOT_FOUND, "PRODUCT_NOT_FOUND", ex.getMessage()), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(InvalidSkuCodeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidSkuCodeException(InvalidSkuCodeException ex) {
        return new ResponseEntity<>(buildError(HttpStatus.BAD_REQUEST, "INVALID_SKU_CODE", ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        return new ResponseEntity<>(buildError(HttpStatus.BAD_REQUEST, "INVALID_ARGUMENTS", ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        return new ResponseEntity<>(buildError(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "An unexpected error occurred"), HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

}
    