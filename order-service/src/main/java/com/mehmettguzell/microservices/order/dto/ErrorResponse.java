package com.mehmettguzell.microservices.order.dto;

public record ErrorResponse(
        String code,
        int status,
        String type,
        String timestamp
) {}

