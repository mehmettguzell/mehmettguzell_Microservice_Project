package com.mehmettguzell.microservices.order.exception;

public class OrderNotFoundException extends RuntimeException{
    public OrderNotFoundException(Long id) {
        super("Order with id " + id + " not found");
    }
}
