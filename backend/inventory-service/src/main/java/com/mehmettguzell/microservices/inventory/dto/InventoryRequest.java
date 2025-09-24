package com.mehmettguzell.microservices.inventory.dto;

public record InventoryRequest(Long id, String skuCode, Integer quantity)  { }
