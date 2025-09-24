package com.mehmettguzell.microservices.order.mapper;

import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.dto.OrderResponse;
import com.mehmettguzell.microservices.order.model.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class OrderMapper {
    public Order toEntity(OrderRequest request) {
        return Order.builder()
                .orderNumber(UUID.randomUUID().toString())
                .skuCode(request.skuCode())
                .price(request.price())
                .quantity(request.quantity())
                .build();
    }

    public OrderResponse toResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getSkuCode(),
                order.getPrice(),
                order.getQuantity(),
                order.getStatus()
        );
    }

    public List<OrderResponse> toResponseList(List<Order> orders) {
        return orders.stream()
                .map(this::toResponse)
                .toList();
    }

    public void updateOrder(Order order, OrderRequest request) {
        order.setSkuCode(request.skuCode());
        order.setPrice(request.price());
        order.setQuantity(request.quantity());
    }
}
