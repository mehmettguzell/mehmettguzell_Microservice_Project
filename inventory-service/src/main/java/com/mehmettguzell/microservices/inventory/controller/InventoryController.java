package com.mehmettguzell.microservices.inventory.controller;

import com.mehmettguzell.microservices.inventory.dto.ApiResponse;
import com.mehmettguzell.microservices.inventory.dto.InventoryRequest;
import com.mehmettguzell.microservices.inventory.dto.InventoryResponse;
import com.mehmettguzell.microservices.inventory.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<InventoryResponse> addInventory(@Valid @RequestBody InventoryRequest request) {
        InventoryResponse createdInventory = inventoryService.createInventory(request);
        return new ApiResponse<>(true, "Inventory created successfully", createdInventory);
    }

    @GetMapping("/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<Boolean> checkSkuExists(@PathVariable String skuCode) {
        boolean exists = inventoryService.doesSkuCodeExist(skuCode);
        String message = exists ? "SKU code exists" : "SKU code does not exist";
        return new ApiResponse<>(true, message, exists);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<List<InventoryResponse>> getAllInventories() {
        List<InventoryResponse> inventories = inventoryService.getAllInventories();
        String message = inventories.isEmpty() ? "No inventory found" : "Inventory list retrieved successfully";
        return new ApiResponse<>(true, message, inventories);
    }

    @GetMapping("/validate")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<Boolean> validateSkuCode(@RequestParam("skuCode") String skuCode) {
        boolean isValid = inventoryService.doesSkuCodeExist(skuCode);
        String message = isValid ? "SKU code is valid" : "SKU code is invalid";
        return new ApiResponse<>(true, message, isValid);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<Boolean> isInStock(@RequestParam String skuCode,
                                          @RequestParam Integer quantity) {
        boolean inStock = inventoryService.isInStock(skuCode, quantity);
        String message = inStock
                ? "Requested quantity is in stock"
                : "Requested quantity is not in stock";
        return new ApiResponse<>(true, message, inStock);
    }

    @PatchMapping("/addStock/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<InventoryResponse> addStock(@PathVariable Long id,
                                                   @Valid @RequestBody InventoryRequest request) {
        InventoryResponse updatedInventory = inventoryService.addStock(id, request);
        return new ApiResponse<>(true, "Stock updated successfully", updatedInventory);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<InventoryResponse> resetQuantity(@RequestParam(required = false) Long id,
                                                        @RequestParam(required = false) String skuCode) {
        InventoryResponse response;
        if (id != null) {
            response = inventoryService.resetQuantity(id);
        } else if (skuCode != null) {
            response = inventoryService.resetQuantity(skuCode);
        } else {
            throw new IllegalArgumentException("Either id or skuCode must be provided");
        }
        return new ApiResponse<>(true, "Inventory quantity set to zero", response);
    }
}
