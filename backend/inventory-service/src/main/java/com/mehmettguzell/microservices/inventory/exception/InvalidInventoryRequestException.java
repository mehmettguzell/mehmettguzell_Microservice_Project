package com.mehmettguzell.microservices.inventory.exception;

public class InvalidInventoryRequestException extends RuntimeException {
    public InvalidInventoryRequestException(String message) {
        super(message);
    }
}
