package com.mehmettguzell.microservices.order.dto;

import com.mehmettguzell.microservices.order.model.OrderStatus;

import java.math.BigDecimal;

public record OrderRequest(Long id, String orderNumber, String skuCode,
                           BigDecimal price, Integer quantity, OrderStatus status) {
}
