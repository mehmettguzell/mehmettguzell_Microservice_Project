package com.mehmettguzell.microservices.order.dto;

public record ApiResponse<T>(boolean success, String message, T data)
{
    public static <T> ApiResponse<T> ok(T data, String message) {
        return new ApiResponse<>(true, message, data);
    }
}
