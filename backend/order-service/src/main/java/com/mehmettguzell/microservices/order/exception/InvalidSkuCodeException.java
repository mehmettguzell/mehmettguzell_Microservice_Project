package com.mehmettguzell.microservices.order.exception;

public class InvalidSkuCodeException extends RuntimeException {
    public InvalidSkuCodeException(String skuCode) {
        super("Invalid skuCode: "  + skuCode);
    }
}
