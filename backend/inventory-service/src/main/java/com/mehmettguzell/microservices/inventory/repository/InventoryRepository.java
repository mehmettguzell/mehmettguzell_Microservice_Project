package com.mehmettguzell.microservices.inventory.repository;

import com.mehmettguzell.microservices.inventory.modul.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    boolean existsBySkuCodeAndQuantityGreaterThanEqual(String skuCode, Integer quantity);

    boolean existsBySkuCode(String skuCode);

    Inventory findInventoryBySkuCode(String skuCode);

    @Query("SELECT i.quantity FROM Inventory i WHERE i.skuCode = :skuCode")
    Integer findInventoryQuantityBySkuCode(@Param("skuCode") String skuCode);}
