package com.mehmettguzell.microservices.inventory.repository;

import com.mehmettguzell.microservices.inventory.modul.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    boolean existsBySkuCodeAndQuantityGreaterThanEqual(String skuCode, Integer quantity);
    boolean existsBySkuCode(String skuCode);
    Inventory findInventoryBySkuCode(String skuCode);
}
