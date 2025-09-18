package com.mehmettguzell.microservices.product.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    SKU_ALREADY_EXISTS("SKU_ALREADY_EXISTS", "SKU code already exists"),
    INVALID_SKU("INVALID_SKU", "Invalid skuCode"),
    PRODUCT_ALREADY_EXISTS("PRODUCT_ALREADY_EXISTS", "Product already exists"),
    PRODUCT_NOT_FOUND("PRODUCT_NOT_FOUND", "Could not find product with given id"),
    INVALID_PRODUCT_REQUEST("INVALID_PRODUCT_REQUEST", "Invalid product request"),

    UNKNOWN_ERROR("UNKNOWN_ERROR", "An unknown error occurred");    // TODO

    private final String code;
    private final String message;

    public static String getErrorCode(String message) {
        for (ErrorCode errorCode : values()) {
            if (errorCode.getMessage().equalsIgnoreCase(message)) {
                return errorCode.getCode();
            }
        }
        return UNKNOWN_ERROR.code;
    }
}
