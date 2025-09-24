package com.mehmettguzell.microservices.product.exception;

public class ProductAlreadyExist extends RuntimeException {
    public ProductAlreadyExist() {
        super("Product already exists");
    }
}
