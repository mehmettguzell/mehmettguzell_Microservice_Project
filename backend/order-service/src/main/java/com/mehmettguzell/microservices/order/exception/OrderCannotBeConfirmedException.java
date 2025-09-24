package com.mehmettguzell.microservices.order.exception;

public class OrderCannotBeConfirmedException extends RuntimeException{
    public OrderCannotBeConfirmedException(Long orderId){
        super("Order with id " + orderId + " cannot be confirmed because it is not PENDING");
    }
}
