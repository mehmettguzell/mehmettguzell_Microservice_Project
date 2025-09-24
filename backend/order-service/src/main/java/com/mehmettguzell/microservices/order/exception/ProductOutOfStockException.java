package com.mehmettguzell.microservices.order.exception;

public class ProductOutOfStockException extends RuntimeException{

    public ProductOutOfStockException(String skuCode, int requestedQuantity) {
        super("Product with SKU code " + skuCode + " is out of stock for requested quantity: " + requestedQuantity);
    }
}
