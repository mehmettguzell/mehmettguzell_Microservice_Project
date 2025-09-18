package com.mehmettguzell.microservices.order.exception;

import com.mehmettguzell.microservices.order.dto.ApiResponse;
import com.mehmettguzell.microservices.order.dto.ErrorCode;
import com.mehmettguzell.microservices.order.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final ResponseEntityExceptionHandler responseEntityExceptionHandler;

    public GlobalExceptionHandler(ResponseEntityExceptionHandler responseEntityExceptionHandler) {
        this.responseEntityExceptionHandler = responseEntityExceptionHandler;
    }

    private ErrorResponse buildError(String code, HttpStatus status) {
        return new ErrorResponse(
                code,
                status.value(),
                status.getReasonPhrase(),
                java.time.ZonedDateTime.now().toString()
        );
    }

    public ResponseEntity<ApiResponse<ErrorResponse>> buildApiResponse(HttpStatus status, String message) {
        String code = ErrorCode.getErrorCode(message);
        ErrorResponse errorResponse = buildError(code, status);
        ApiResponse<ErrorResponse> apiResponse = new ApiResponse<>(false, message,  errorResponse);
        return new ResponseEntity<>(apiResponse, status);
    }

    @ExceptionHandler(ProductOutOfStockException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleOutOfStock(ProductOutOfStockException ex) {
        return buildApiResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleOrderNotFound(OrderNotFoundException ex) {
        return buildApiResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }
    @ExceptionHandler(InvalidSkuCodeException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleInvalidSkuCode(InvalidSkuCodeException ex) {
        return buildApiResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleValidation(MethodArgumentNotValidException ex) {
        return buildApiResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleException(Exception ex) {
        return buildApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }
    @ExceptionHandler(InvalidOrderRequestException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleInvalidOrderRequest(InvalidOrderRequestException ex) {
        return buildApiResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

}
