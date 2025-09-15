package com.mehmettguzell.microservices.inventory.dto;

public record ErrorResponse(
        String timestamp,
        int status,
        String error,
        String code,
        String message
) {}
