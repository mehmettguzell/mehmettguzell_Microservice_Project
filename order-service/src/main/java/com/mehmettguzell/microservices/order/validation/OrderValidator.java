package com.mehmettguzell.microservices.order.validation;

import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.exception.InvalidOrderRequestException;
import com.mehmettguzell.microservices.order.model.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class OrderValidator {

    public void validateOrderRequest(OrderRequest request) {
        validateOrderNumber(request.orderNumber());
        validateSkuCode(request.skuCode());
        validatePrice(request.price());
        validateQuantity(request.quantity());
        validateOrderStatus(request.status());
    }

    public void validateOrderNumber(String orderNumber) {
        if (orderNumber == null || orderNumber.isBlank()) {
            throw new InvalidOrderRequestException("Order number cannot be null or blank");
        }
        if (!orderNumber.matches("^[A-Za-z0-9\\-]+$")) {
            throw new InvalidOrderRequestException("Order number format is invalid. Only letters, digits, and hyphens allowed.");
        }
    }

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

    public void validateOrderStatus(OrderStatus status) {
        if (status == null) throw new InvalidOrderRequestException("Order status cannot be null");
        boolean valid = false;
        for (OrderStatus s : OrderStatus.values()) {
            if (s == status) { valid = true; break; }
        }
        if (!valid) throw new InvalidOrderRequestException("Invalid order status: " + status);
    }
}
