package com.mehmettguzell.microservices.order.service;

import com.mehmettguzell.microservices.order.client.InventoryClient;
import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.dto.OrderResponse;
import com.mehmettguzell.microservices.order.exception.OrderNotFoundException;
import com.mehmettguzell.microservices.order.exception.ProductOutOfStockException;
import com.mehmettguzell.microservices.order.mapper.OrderMapper;
import com.mehmettguzell.microservices.order.model.Order;
import com.mehmettguzell.microservices.order.model.OrderStatus;
import com.mehmettguzell.microservices.order.repository.OrderRepository;
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

    @Transactional
    public OrderResponse placeOrder(OrderRequest orderRequest) {
        ensureProductInStock(orderRequest);

        Order order = createPendingOrder(orderRequest);
        persistOrder(order);

        return toResponse(order);
    }

    public OrderResponse getOrderById(Long id) {
        return toResponse(fetchOrder(id));
    }

    public List<OrderResponse> getAllOrders() {
        return fetchAllOrders()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public OrderResponse updateOrder(Long id, OrderRequest orderRequest) {
        Order order = fetchOrder(id);
        applyRequestToOrder(order, orderRequest);
        persistOrder(order);

        return toResponse(order);
    }

    public OrderResponse confirmOrder(Long orderId) {
        Order order = fetchOrder(orderId);
        order.confirm();
        persistOrder(order);
        return toResponse(order);
    }

    @Transactional
    public void cancelOrder(Long id) {
        Order order = fetchOrder(id);
        order.setStatus(OrderStatus.CANCELLED);
    }

    private Order fetchOrder(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    private List<Order> fetchAllOrders() {
        return orderRepository.findAll();
    }

    private void ensureProductInStock(OrderRequest request) {
        if (!inventoryClient.isInStock(request.skuCode(), request.quantity())) {

            Order order = OrderMapper.toEntity(request);
            order.setStatus(OrderStatus.CANCELLED);
            persistOrder(order);

            throw new ProductOutOfStockException(request.skuCode());
        }
    }

    private Order createPendingOrder(OrderRequest request) {
        Order order = OrderMapper.toEntity(request);
        order.setStatus(OrderStatus.PENDING);
        return order;
    }

    private void applyRequestToOrder(Order order, OrderRequest request) {
        OrderMapper.applyRequestToOrder(order, request);
    }

    private void persistOrder(Order order) {
        orderRepository.save(order);
        logOrderAction(order, "saved");
    }

    private void removeOrder(Order order) {
        orderRepository.delete(order);
        logOrderAction(order, "deleted");
    }

    private OrderResponse toResponse(Order order) {
        return OrderMapper.toResponse(order);
    }

    private void logOrderAction(Order order, String action) {
        log.info("Order with id: {}, Order Number: {} has been {} successfully",
                order.getId(), order.getOrderNumber(), action);
    }
}