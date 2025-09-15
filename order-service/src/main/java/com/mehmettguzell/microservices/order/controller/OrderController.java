package com.mehmettguzell.microservices.order.controller;

import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.dto.OrderResponse;
import com.mehmettguzell.microservices.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse placeOrder(@Valid @RequestBody OrderRequest orderRequest) {
        return orderService.placeOrder(orderRequest);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderResponse getOrder(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderResponse updateOrder(@PathVariable Long id,
                                     @Valid @RequestBody OrderRequest orderRequest) {
        return orderService.updateOrder(id, orderRequest);
    }

    @PatchMapping("/confirm/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderResponse confirmOrder(@PathVariable Long id){
        return orderService.confirmOrder(id);
    }

    @DeleteMapping
    public Map<String,String> deleteOrder(@RequestParam Long id) {
        String message = orderService.cancelOrder(id);
        return Map.of("message", message);
    }
}
