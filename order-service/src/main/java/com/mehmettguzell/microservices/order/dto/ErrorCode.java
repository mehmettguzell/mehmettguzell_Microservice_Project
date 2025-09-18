package com.mehmettguzell.microservices.order.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    SKU_ALREADY_EXISTS("SKU_ALREADY_EXISTS", "SKU code already exists");
    // TODO

    private final String code;
    private final String message;

    public static String getErrorCode(String message){
        for (ErrorCode errorCode : values()) {
            if (errorCode.getMessage().equalsIgnoreCase(message)) {
                return errorCode.getCode();
            }
        }
        return "UNKNOWN_ERROR";
    }
}
