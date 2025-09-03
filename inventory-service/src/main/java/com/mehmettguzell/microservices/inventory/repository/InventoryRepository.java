package com.mehmettguzell.microservices.inventory.repository;

import com.mehmettguzell.microservices.inventory.modul.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    boolean existsBySkuCodeAndQuantityGreaterThanEqual(String skuCode, Integer quantity);
}
