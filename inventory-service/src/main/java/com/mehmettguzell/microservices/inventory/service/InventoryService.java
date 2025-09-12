package com.mehmettguzell.microservices.inventory.service;

import com.mehmettguzell.microservices.inventory.dto.InventoryRequest;
import com.mehmettguzell.microservices.inventory.dto.InventoryResponse;
import com.mehmettguzell.microservices.inventory.exception.InventoryNotFoundException;
import com.mehmettguzell.microservices.inventory.mapper.inventoryMapper;
import com.mehmettguzell.microservices.inventory.modul.Inventory;
import com.mehmettguzell.microservices.inventory.repository.InventoryRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j

public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final inventoryMapper inventoryMapper;


    public InventoryResponse createInventory(InventoryRequest request) {
        Inventory inventory = inventoryMapper.toEntity(request);
        Inventory savedInventory = saveAndLogInventory(inventory, "Created inventory: ");
        return inventoryMapper.toResponse(savedInventory);
    }

    public InventoryResponse findInventoryBySkuCode(String skuCode) {
        Inventory inventory = inventoryRepository.findInventoryBySkuCode(skuCode);
        return inventoryMapper.toResponse(inventory);
    }

    public List<InventoryResponse> getAllInventories() {
        return inventoryRepository.findAll()
                .stream()
                .map(inventoryMapper::toResponse)
                .toList();
    }

    public boolean isSkuCodeValid(@Valid String skuCode) {
        return inventoryRepository.existsBySkuCode(skuCode);
    }

    public boolean isInStock(String skuCode, Integer quantity) {
        return inventoryRepository.existsBySkuCodeAndQuantityGreaterThanEqual(skuCode, quantity);
    }

    public void setQuantityZero(Long id) {
        Inventory inventory = findInventoryById(id);
        setQuantityZero(inventory);
    }

    public void setQuantityZero(String skuCode) {
        Inventory inventory = inventoryRepository.findInventoryBySkuCode(skuCode);
        setQuantityZero(inventory);
    }

    private void setQuantityZero(Inventory inventory) {
        inventory.setQuantity(0);
        saveAndLogInventory(inventory, "Inventory Quantity: 0: ");
    }

    public InventoryResponse addStock(Long id, InventoryRequest request) {
        Inventory inventory = findInventoryById(id);
        inventory.setQuantity(inventory.getQuantity() + request.quantity());
        Inventory updatedInventory = saveAndLogInventory(inventory, "Stock added to inventory: ");
        return inventoryMapper.toResponse(updatedInventory);
    }


    private Inventory findInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException(id));
    }

    private Inventory saveAndLogInventory(Inventory inventory, String message) {
        Inventory savedInventory = inventoryRepository.save(inventory);
        logInventory(message, savedInventory);
        return savedInventory;
    }

    private void deleteAndLogInventory(Inventory inventory, String message) {
        inventoryRepository.delete(inventory);
        logInventory(message, inventory);
    }

    private void logInventory(String message, Inventory inventory) {
        log.info("{} {}", message, inventory);
    }


}