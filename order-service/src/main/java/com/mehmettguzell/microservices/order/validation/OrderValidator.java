package com.mehmettguzell.microservices.order.validation;

import com.mehmettguzell.microservices.order.exception.InvalidOrderRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class OrderValidator {

    public void validateSkuCode(String skuCode) {
        if (skuCode == null || skuCode.isBlank()) {
            throw new InvalidOrderRequestException("SKU code cannot be null or blank");
        }
        if (!skuCode.matches("^[A-Za-z0-9\\-_]{3,50}$")) {
            throw new InvalidOrderRequestException("Invalid SKU format. Allowed: A-Z, 0-9, hyphen (-), underscore (_), length 3-50.");
        }
    }

    public void validatePrice(BigDecimal price) {
        if (price == null) throw new InvalidOrderRequestException("Price cannot be null");
        if (price.compareTo(BigDecimal.ZERO) <= 0) throw new InvalidOrderRequestException("Price must be greater than 0");
        if (price.compareTo(new BigDecimal("1000000")) > 0) throw new InvalidOrderRequestException("Price cannot exceed 1000000");
    }

    public void validateQuantity(Integer quantity) {
        if (quantity == null) throw new InvalidOrderRequestException("Quantity cannot be null");
        if (quantity <= 0) throw new InvalidOrderRequestException("Quantity must be greater than 0");
    }

    public void validateId(Long id){
        if (id == null) throw new InvalidOrderRequestException("Order ID cannot be null");
        if (id <= 0) throw new InvalidOrderRequestException("Order ID must be greater than 0");
    }
}
