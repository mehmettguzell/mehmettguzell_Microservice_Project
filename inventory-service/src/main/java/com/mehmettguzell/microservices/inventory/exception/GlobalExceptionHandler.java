package com.mehmettguzell.microservices.inventory.exception;

import com.mehmettguzell.microservices.inventory.dto.ErrorCode;
import com.mehmettguzell.microservices.inventory.dto.ErrorResponse;
import com.mehmettguzell.microservices.inventory.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ErrorResponse buildError(HttpStatus status, String code, String message) {
        return new ErrorResponse(
                code,
                status.value(),
                status.getReasonPhrase(),
                java.time.ZonedDateTime.now().toString()
        );
    }

    private <T> ResponseEntity<ApiResponse<T>> buildErrorResponse(HttpStatus status, String message) {
        String code = ErrorCode.fromMessage(message);
        ErrorResponse error = buildError(status, code, message);
        ApiResponse<T> response = new ApiResponse<>(false, message, (T) error);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(InvalidInventoryRequestException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleInvalidInventoryRequest(InvalidInventoryRequestException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InventoryNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleInventoryNotFound(InventoryNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleGenericException(Exception ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }
}
