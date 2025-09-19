package com.mehmettguzell.microservices.inventory.service;

import com.mehmettguzell.microservices.inventory.client.ProductClient;
import com.mehmettguzell.microservices.inventory.dto.ApiResponse;
import com.mehmettguzell.microservices.inventory.dto.InventoryRequest;
import com.mehmettguzell.microservices.inventory.dto.InventoryResponse;
import com.mehmettguzell.microservices.inventory.exception.InvalidInventoryRequestException;
import com.mehmettguzell.microservices.inventory.exception.InventoryNotFoundException;
import com.mehmettguzell.microservices.inventory.mapper.InventoryMapper;
import com.mehmettguzell.microservices.inventory.modul.Inventory;
import com.mehmettguzell.microservices.inventory.repository.InventoryRepository;
import com.mehmettguzell.microservices.inventory.validation.InventoryValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final InventoryMapper inventoryMapper;
    private final InventoryValidator inventoryValidator;
    private final ProductClient productClient;


    public InventoryResponse createInventory(InventoryRequest request) {
        inventoryValidator.validateInventoryRequest(request.skuCode(), request.quantity());
        if (inventoryRepository.existsBySkuCode(request.skuCode())) {
            throw new InvalidInventoryRequestException("SKU code already exists");
        }
        Inventory inventory = mapToEntity(request);
        return saveAndLog(inventory, "Created inventory:");
    }

    public Integer getAllStocksBySkuCode(String skuCode) {
        inventoryValidator.validateInventoryRequest(skuCode);
        return  inventoryRepository.findInventoryQuantityBySkuCode(skuCode);
    }

    public InventoryResponse findInventoryBySkuCode(String skuCode) {
        inventoryValidator.validateInventoryRequest(skuCode);
        Inventory inventory = getInventoryBySkuCode(skuCode);
        return mapToResponse(inventory);
    }

    public List<InventoryResponse> getAllInventories() {
        return inventoryMapper.toResponseList(inventoryRepository.findAll());
    }

    public boolean doesSkuCodeExist(@Valid String skuCode) {
        inventoryValidator.validateInventoryRequest(skuCode);
        return inventoryRepository.existsBySkuCode(skuCode);
    }

        public boolean isInStock(String skuCode, Integer quantity) {
            inventoryValidator.validateInventoryRequest(skuCode, quantity);
            return inventoryRepository.existsBySkuCodeAndQuantityGreaterThanEqual(skuCode, quantity);
        }

    public InventoryResponse addStock(Long id, InventoryRequest request) {
        inventoryValidator.validateInventoryRequest(request.quantity());
        Inventory inventory = getInventoryById(id);
        increaseInventoryQuantity(inventory, request.quantity());
        return saveAndLog(inventory, "Stock added to inventory:");
    }

    public InventoryResponse resetQuantity(Long id) {
        Inventory inventory = getInventoryById(id);

        deleteProductIfExists(inventory.getSkuCode());

        ensureQuantityIsNotAlreadyZero(inventory);
        inventory.setQuantity(0);

        return saveAndLog(inventory, "Inventory quantity reset to 0:");
    }

    private void deleteProductIfExists(String skuCode) {
        String id = productClient.getProductIdBySkuCode(skuCode);
        if (id != null) {
            productClient.deleteProduct(id);
        }
    }

    public InventoryResponse resetQuantity(String skuCode) {
        inventoryValidator.validateInventoryRequest(skuCode);
        Inventory inventory = getInventoryBySkuCode(skuCode);
        ensureQuantityIsNotAlreadyZero(inventory);
        inventory.setQuantity(0);
        return saveAndLog(inventory, "Inventory quantity reset to 0:");
    }

    public void deleteInventory(Long id) {
        Inventory inventory = getInventoryById(id);
        inventoryRepository.delete(inventory);
        logInventory("Deleted inventory:", inventory);
    }

    // ===========================
    // PRIVATE HELPERS
    // ===========================

    private Inventory mapToEntity(InventoryRequest request) {
        return inventoryMapper.toEntity(request);
    }

    private InventoryResponse mapToResponse(Inventory inventory) {
        return inventoryMapper.toResponse(inventory);
    }

    private InventoryResponse saveAndLog(Inventory inventory, String message) {
        Inventory saved = inventoryRepository.save(inventory);
        logInventory(message, saved);
        return mapToResponse(saved);
    }

    public Inventory getInventoryBySkuCode(String skuCode) {
        Inventory inventory = inventoryRepository.findInventoryBySkuCode(skuCode);
        inventoryValidator.validateInventoryExists(inventory, skuCode);
        return inventory;
    }

    private Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    private void increaseInventoryQuantity(Inventory inventory, int quantityToAdd) {
        inventory.setQuantity(inventory.getQuantity() + quantityToAdd);
    }

    private void ensureQuantityIsNotAlreadyZero(Inventory inventory) {
        if (inventory.getQuantity() == 0) {
            throw new InvalidInventoryRequestException("Inventory quantity is already 0");
        }
    }

    private void logInventory(String message, Inventory inventory) {
        log.info("{} {}", message, inventory);
    }


}