package com.mehmettguzell.microservices.order.dto;

public record ErrorResponse(String timestamp, int status, String error, String code, String message) {
}

