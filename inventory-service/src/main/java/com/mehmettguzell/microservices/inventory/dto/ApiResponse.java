package com.mehmettguzell.microservices.inventory.dto;

public record ApiResponse<T>(String message, T data) {
}
