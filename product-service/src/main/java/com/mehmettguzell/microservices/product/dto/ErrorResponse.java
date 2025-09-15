package com.mehmettguzell.microservices.product.dto;

public record ErrorResponse(String timestamp, int status, String error, String code, String message) {
}

