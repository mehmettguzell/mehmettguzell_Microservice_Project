package com.mehmettguzell.microservices.inventory.mapper;

import com.mehmettguzell.microservices.inventory.dto.InventoryRequest;
import com.mehmettguzell.microservices.inventory.dto.InventoryResponse;
import com.mehmettguzell.microservices.inventory.modul.Inventory;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class inventoryMapper {

    public InventoryResponse toResponse(Inventory inventory) {
        return new  InventoryResponse(
                inventory.getId(),
                inventory.getSkuCode(),
                inventory.getQuantity()
        );
    }

    public List<InventoryResponse> toResponseList(List<Inventory> all) {
        return all.stream()
                .map(this::toResponse)
                .toList();
    }

    public Inventory toEntity (InventoryRequest inventoryRequest) {
        return Inventory.builder()
                .id(inventoryRequest.id())
                .skuCode(inventoryRequest.skuCode())
                .quantity(inventoryRequest.quantity())
                .build();
    }
}
