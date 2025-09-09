package com.mehmettguzell.microservices.inventory.exception;

public class InventoryNotFoundException extends RuntimeException{
    public InventoryNotFoundException(Long id) {
        super("Inventory with id " + id + " not found");
    }
}
