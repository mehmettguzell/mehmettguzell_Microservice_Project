package com.mehmettguzell.microservices.inventory.dto;

public enum ErrorCode {
    SKU_ALREADY_EXISTS("SKU code already exists", "SKU_ALREADY_EXISTS"),
    INVENTORY_NOT_FOUND("Inventory not found", "INVENTORY_NOT_FOUND"),
    INVALID_REQUEST("Invalid inventory request", "INVALID_REQUEST"),
    VALIDATION_ERROR("Validation failed", "VALIDATION_ERROR"),
    INTERNAL_ERROR("Internal server error", "INTERNAL_ERROR");

    private final String message;
    private final String code;

    ErrorCode(String message, String code) {
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public String getCode() {
        return code;
    }

    public static String fromMessage(String message) {
        for (ErrorCode e : values()) {
            if (e.getMessage().equalsIgnoreCase(message)) {
                return e.getCode();
            }
        }
        return "UNKNOWN_ERROR";
    }
}

