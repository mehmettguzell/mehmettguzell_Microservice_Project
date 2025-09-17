package com.mehmettguzell.microservices.product.dto;

public record ApiResponse<T>(
        boolean success,
        String message,
        T data){
}
