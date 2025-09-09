package com.mehmettguzell.microservices.inventory.dto;

public record InventoryResponse(Long id, String skuCode, Integer quantity) {
}
