package com.mehmettguzell.microservices.order.controller;

import com.mehmettguzell.microservices.order.dto.ApiResponse;
import com.mehmettguzell.microservices.order.dto.OrderRequest;
import com.mehmettguzell.microservices.order.dto.OrderResponse;
import com.mehmettguzell.microservices.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrderResponse> placeOrder(@Valid @RequestBody OrderRequest orderRequest) {
        return ApiResponse.ok(orderService.placeOrder(orderRequest),"Order Created");
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<OrderResponse> getOrder(@PathVariable Long id) {
        return ApiResponse.ok(orderService.getOrderById(id),"Order Found");
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<List<OrderResponse>> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ApiResponse.ok(orders, "All Orders Found");
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<OrderResponse> updateOrder(@PathVariable Long id,
                                     @Valid @RequestBody OrderRequest orderRequest) {
        return ApiResponse.ok(orderService.updateOrder(id, orderRequest),"Order Updated");
    }

    @PatchMapping("/confirm/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<OrderResponse> confirmOrder(@PathVariable Long id){
        return ApiResponse.ok(orderService.confirmOrder(id),"Order Confirmed");
    }

    @DeleteMapping
    public ApiResponse<Void> deleteOrder(@RequestParam Long id) {
        orderService.cancelOrder(id);
        return ApiResponse.ok(null, "Order Deleted " + id);
    }
}
