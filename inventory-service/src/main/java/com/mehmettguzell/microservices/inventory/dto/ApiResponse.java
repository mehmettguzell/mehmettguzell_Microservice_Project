package com.mehmettguzell.microservices.inventory.dto;

public record ApiResponse<T>(boolean success, String message, T data) {

    public static <T> ApiResponse <T> ok(T data, String message) {
        return new ApiResponse<T>(true, message, data);
    }
}
