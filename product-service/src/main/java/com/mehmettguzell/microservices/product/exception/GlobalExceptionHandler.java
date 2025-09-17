package com.mehmettguzell.microservices.product.exception;

import com.mehmettguzell.microservices.product.dto.ApiResponse;
import com.mehmettguzell.microservices.product.dto.ErrorCode;
import com.mehmettguzell.microservices.product.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    public ErrorResponse buildErrorDetail(String code, HttpStatus status){
        return new ErrorResponse(
                code,
                status.value(),
                status.getReasonPhrase(),
                java.time.ZonedDateTime.now().toString()
        );
    }

    public ResponseEntity<ApiResponse<ErrorResponse>> buildApiResponse(HttpStatus status, String message){
        String code = ErrorCode.getErrorCode(message);
        ErrorResponse errorDetail = buildErrorDetail(code, status);
        ApiResponse<ErrorResponse> response = new ApiResponse<>(false, message, errorDetail);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleProductNotFoundException(ProductNotFoundException ex) {
        return buildApiResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(InvalidSkuCodeException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>>  handleInvalidSkuCodeException(InvalidSkuCodeException ex) {
        return buildApiResponse(HttpStatus.BAD_REQUEST, ex.getMessage());

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public  ResponseEntity<ApiResponse<ErrorResponse>>  handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        return buildApiResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleException(Exception ex) {
        return buildApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }
}
