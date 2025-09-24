package com.mehmettguzell.microservices.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ActionType {
    CREATED("created"),
    UPDATED("updated"),
    DELETED("deleted");

    private final String label;
}
