package com.mehmettguzell.microservices.product.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(String id){
        super("Could not find product with id: " + id);
    }
    public ProductNotFoundException(){
        super("Could not find any product ");
    }
}
