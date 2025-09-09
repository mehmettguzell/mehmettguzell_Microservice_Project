package com.mehmettguzell.microservices.order.exception;

public class ProductOutOfStockException extends RuntimeException{

    public ProductOutOfStockException(String skuCode){
        super("Product with skuCode " + skuCode + " is not in inventory");
    }
}
