package com.mehmettguzell.microservices.order.service;

import com.mehmettguzell.microservices.order.client.InventoryClient;
import com.mehmettguzell.microservices.order.dto.ApiResponse;
import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.dto.OrderResponse;
import com.mehmettguzell.microservices.order.exception.OrderNotFoundException;
import com.mehmettguzell.microservices.order.exception.ProductOutOfStockException;
import com.mehmettguzell.microservices.order.mapper.OrderMapper;
import com.mehmettguzell.microservices.order.model.Order;
import com.mehmettguzell.microservices.order.model.OrderStatus;
import com.mehmettguzell.microservices.order.repository.OrderRepository;
import com.mehmettguzell.microservices.order.validation.OrderValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;
    private final OrderMapper orderMapper;
    private final OrderValidator orderValidator;

    @Transactional
    public OrderResponse placeOrder(OrderRequest request) {
        orderValidator.validateOrderRequest(request);
        ensureProductInStock(request);

        Order order = mapToPendingOrder(request);
        saveOrder(order);

        return mapToResponse(order);
    }

    public OrderResponse getOrderById(Long id) {
        return mapToResponse(fetchOrder(id));
    }

    public List<OrderResponse> getAllOrders() {
        return orderMapper.toResponseList(orderRepository.findAll());
    }

    @Transactional
    public OrderResponse updateOrder(Long id, OrderRequest request) {
        orderValidator.validateSkuCode(request.skuCode());
        Order order = fetchOrder(id);

        orderMapper.updateOrder(order, request);
        saveOrder(order);

        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse confirmOrder(Long id) {
        Order order = fetchOrder(id);
        order.confirm();
        saveOrder(order);

        return mapToResponse(order);
    }

    @Transactional
    public String cancelOrder(Long id) {
        Order order = fetchOrder(id);

        if (order.getStatus() == OrderStatus.CANCELLED) return "Already Cancelled";

        order.setStatus(OrderStatus.CANCELLED);
        saveOrder(order);

        return "Order with id " + id + " cancelled successfully";
    }

    // ===========================
    // PRIVATE HELPERS
    // ===========================

    private void ensureProductInStock(OrderRequest request) {
        ApiResponse<Boolean> response = inventoryClient.isInStock(request.skuCode(), request.quantity());
        if (!Boolean.TRUE.equals(response.data())) {
            Order order = orderMapper.toEntity(request);
            order.setStatus(OrderStatus.CANCELLED);
            saveOrder(order);

            throw new ProductOutOfStockException(request.skuCode());
        }
    }


    private Order mapToPendingOrder(OrderRequest request) {
        Order order = orderMapper.toEntity(request);
        order.setStatus(OrderStatus.PENDING);
        return order;
    }

    private Order fetchOrder(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    private void saveOrder(Order order) {
        orderRepository.save(order);
        logOrderAction(order, "saved");
    }

    private OrderResponse mapToResponse(Order order) {
        return orderMapper.toResponse(order);
    }

    private void logOrderAction(Order order, String action) {
        log.info("Order with id: {}, order number: {} has been {} successfully",
                order.getId(), order.getOrderNumber(), action);
    }
}