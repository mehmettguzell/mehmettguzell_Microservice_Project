package com.mehmettguzell.microservices.product.exception;

public class InvalidSkuCodeException extends RuntimeException {
    public InvalidSkuCodeException(String skuCode) {
        super("Invalid skuCode: "  + skuCode);
    }
}
