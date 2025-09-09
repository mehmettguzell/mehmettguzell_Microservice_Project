package com.mehmettguzell.microservices.order.mapper;

import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.dto.OrderResponse;
import com.mehmettguzell.microservices.order.model.Order;

import java.util.UUID;

public class OrderMapper {
    public static Order toEntity(OrderRequest request) {
        return Order.builder()
                .orderNumber(UUID.randomUUID().toString())
                .skuCode(request.skuCode())
                .price(request.price())
                .quantity(request.quantity())
                .build();
    }

    public static OrderResponse toResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getSkuCode(),
                order.getPrice(),
                order.getQuantity(),
                order.getStatus()
        );
    }

    public static void applyRequestToOrder(Order order, OrderRequest request) {
        order.setSkuCode(request.skuCode());
        order.setPrice(request.price());
        order.setQuantity(request.quantity());
    }
}
