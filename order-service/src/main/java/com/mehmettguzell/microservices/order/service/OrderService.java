package com.mehmettguzell.microservices.order.service;

import com.mehmettguzell.microservices.order.client.InventoryClient;
import com.mehmettguzell.microservices.order.dto.ApiResponse;
import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.dto.OrderResponse;
import com.mehmettguzell.microservices.order.exception.InvalidSkuCodeException;
import com.mehmettguzell.microservices.order.exception.OrderCanNotBeCanceledException;
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
        validateOrderRequest(request);
        validateAndCancelIfOutOfStock(request);

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
        validateForUpdate(request, id);

        Order order = fetchOrder(id);
        orderMapper.updateOrder(order, request);

        saveOrder(order);
        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse confirmOrder(Long id) {
        validateId(id);

        Order order = fetchOrder(id);
        order.confirm();

        saveOrder(order);
        return mapToResponse(order);
    }

    @Transactional
    public void cancelOrder(Long id) {
        validateId(id);

        Order order = fetchOrder(id);
        ensureOrderCanBeCancelled(order);

        order.setStatus(OrderStatus.CANCELLED);
        saveOrder(order);
    }

    // ===========================
    // PRIVATE HELPERS
    // ===========================

    private void ensureOrderCanBeCancelled(Order order) {
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new OrderCanNotBeCanceledException(order.getSkuCode());
        }
    }

    private void validateForUpdate(OrderRequest request, Long id) {
        validateId(id);
        orderValidator.validateSkuCode(request.skuCode());
        validateIsSkuCodeValid(request.skuCode());
    }

    private void validateId(Long id){
        orderValidator.validateId(id);
    }

    private void validateIsSkuCodeValid(String skuCode) {
        ApiResponse<Boolean> response = inventoryClient.isSkuCodeValid(skuCode);
        if (!response.data()){
            throw new InvalidSkuCodeException(skuCode);
        }
    }

    private void validateAndCancelIfOutOfStock(OrderRequest request) {
        ApiResponse<Boolean> response = inventoryClient.isInStock(request.skuCode(), request.quantity());
        if (!Boolean.TRUE.equals(response.data())) {
            Order cancelledOrder = orderMapper.toEntity(request);
            cancelledOrder.setStatus(OrderStatus.CANCELLED);
            saveOrder(cancelledOrder);
            throw new ProductOutOfStockException(request.skuCode(), request.quantity());
        }
    }

    public void validateOrderRequest(OrderRequest request) {
        orderValidator.validateSkuCode(request.skuCode());
        orderValidator.validatePrice(request.price());
        orderValidator.validateQuantity(request.quantity());
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