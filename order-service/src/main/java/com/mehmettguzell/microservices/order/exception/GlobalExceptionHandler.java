package com.mehmettguzell.microservices.order.exception;

import com.mehmettguzell.microservices.order.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ErrorResponse buildError(HttpStatus status, String code, String message) {
        return new ErrorResponse(
                java.time.ZonedDateTime.now().toString(),
                status.value(),
                status.getReasonPhrase(),
                code,
                message
        );
    }

    @ExceptionHandler(ProductOutOfStockException.class)
    public ResponseEntity<ErrorResponse> handleOutOfStock(ProductOutOfStockException ex) {
        return new ResponseEntity<>(buildError(HttpStatus.CONFLICT, "PRODUCT_OUT_OF_STOCK", ex.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleOrderNotFound(OrderNotFoundException ex) {
        return new ResponseEntity<>(
                buildError(HttpStatus.NOT_FOUND, "ORDER_NOT_FOUND", ex.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(InvalidSkuCodeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidSkuCode(InvalidSkuCodeException ex) {
        return new ResponseEntity<>(
                buildError(HttpStatus.BAD_REQUEST, "INVALID_SKU", ex.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return new ResponseEntity<>(
                buildError(HttpStatus.BAD_REQUEST, "VALIDATION_ERROR", msg),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        return new ResponseEntity<>(
                buildError(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", "An unexpected error occurred"),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
