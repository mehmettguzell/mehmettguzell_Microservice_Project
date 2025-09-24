package com.mehmettguzell.microservices.inventory.dto;

public record ErrorResponse(
        String code,
        int status,
        String type,
        String timestamp
) {}
