package com.mehmettguzell.microservices.order.exception;

public class OrderCanNotBeCanceledException extends RuntimeException {
    public OrderCanNotBeCanceledException(String orderSkuCode) {
        super("Order with id " + orderSkuCode + " cannot be canceled");
    }
}
