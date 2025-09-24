package com.mehmettguzell.microservices.product.dto;


public record ErrorResponse(
        String code,
        int status,
        String type,
        String timestamp
) {}
