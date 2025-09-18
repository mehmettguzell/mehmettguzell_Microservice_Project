package com.mehmettguzell.microservices.inventory.validation;

import com.mehmettguzell.microservices.inventory.exception.InvalidInventoryRequestException;
import com.mehmettguzell.microservices.inventory.exception.InventoryNotFoundException;
import com.mehmettguzell.microservices.inventory.modul.Inventory;
import com.mehmettguzell.microservices.inventory.repository.InventoryRepository;
import org.springframework.stereotype.Component;


@Component
public class InventoryValidator {

    private InventoryRepository inventoryRepository;

    public void isAnyInventoryExist(){
        if (inventoryRepository.count() == 0) {
            throw new InventoryNotFoundException("No inventory records found");
        }
    }

    public void validateInventoryRequest(String skuCode, Integer quantity) {
        validateSkuCode(skuCode);
        validateQuantity(quantity);
    }

    public void validateInventoryRequest(Integer quantity) {
        validateQuantity(quantity);
    }

    public void validateInventoryRequest(String skuCode) {
        validateSkuCode(skuCode);
    }

    public void validateInventoryExists(Inventory inventory, String skuCode) {
        if (inventory == null) {
            throw new InventoryNotFoundException(skuCode);
        }
    }

    public void validateQuantity(Integer quantity){
        if (quantity <= 0) {
            throw new InvalidInventoryRequestException("Quantity must be greater than 0");
        }
    }

    private void validateSkuCode(String skuCode) {
        if (skuCode == null || skuCode.isBlank()) {
            throw new InvalidInventoryRequestException("SKU code cannot be null or blank");
        }
        if (!skuCode.matches("^[A-Za-z0-9\\-_]+$")) {
            throw new InvalidInventoryRequestException(
                    "SKU code format is invalid. Allowed format: only uppercase letters (A-Z), digits (0-9), and hyphen (-), length 3-50 characters."
            );
        }
        if (skuCode.length() < 3 || skuCode.length() > 50) {
            throw new InvalidInventoryRequestException("SKU code length must be between 3 and 50 characters");
        }
    }
}
