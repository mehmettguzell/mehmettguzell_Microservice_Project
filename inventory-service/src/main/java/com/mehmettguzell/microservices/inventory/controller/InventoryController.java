package com.mehmettguzell.microservices.inventory.controller;

import com.mehmettguzell.microservices.inventory.dto.InventoryRequest;
import com.mehmettguzell.microservices.inventory.dto.InventoryResponse;
import com.mehmettguzell.microservices.inventory.modul.Inventory;
import com.mehmettguzell.microservices.inventory.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/inventory")
@RequiredArgsConstructor

public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryResponse addInventory(@Valid @RequestBody InventoryRequest inventoryRequest){
        return inventoryService.createInventory(inventoryRequest);
    }

    @GetMapping("/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public InventoryResponse findInventoryBySkuCode(@PathVariable String skuCode){
        return inventoryService.findInventoryBySkuCode(skuCode);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryResponse> getAllInventory() {
        return inventoryService.getAllInventories();
    }

    @GetMapping("/validate")
    @ResponseStatus(HttpStatus.OK)
    public boolean isSkuCodeValid(@Valid @RequestParam("skuCode") String skuCode){
        return inventoryService.isSkuCodeValid(skuCode);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity) {
        return inventoryService.isInStock(skuCode, quantity);
    }

    @PatchMapping("/addStock/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public InventoryResponse addStock(@PathVariable Long id,
                                      @Valid @RequestBody InventoryRequest inventoryRequest) {
        return inventoryService.addStock(id, inventoryRequest);
    }

    @DeleteMapping()
    public Map<String, String> setQuantityZero(@RequestParam(required = false) Long id,
                                               @RequestParam(required = false) String skuCode) {
        String message;
        if (id != null) {
            message = inventoryService.setQuantityZero(id);
        } else if (skuCode != null) {
            message =inventoryService.setQuantityZero(skuCode);
        } else {
            throw new IllegalArgumentException("Either id or skuCode must be provided");
        }
        return Map.of("message", message);
    }
}
