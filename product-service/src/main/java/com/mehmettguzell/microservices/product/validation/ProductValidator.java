package com.mehmettguzell.microservices.product.validation;

import com.mehmettguzell.microservices.product.client.InventoryClient;
import com.mehmettguzell.microservices.product.dto.ProductRequest;
import com.mehmettguzell.microservices.product.exception.InvalidProductRequestException;
import com.mehmettguzell.microservices.product.exception.InvalidSkuCodeException;
import com.mehmettguzell.microservices.product.exception.ProductAlreadyExist;
import com.mehmettguzell.microservices.product.exception.ProductNotFoundException;
import com.mehmettguzell.microservices.product.model.Product;
import com.mehmettguzell.microservices.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductValidator {
    private final InventoryClient inventoryClient;
    private final ProductRepository productRepository;

    public void validateProductRequest(ProductRequest request) {
        validateSkuCode(request.skuCode());
        validateName(request.name());
        validateDescription(request.description());
        validatePrice(request.price());
    }

    public void validateSearchQuery(String name){
        if (name == null || name.isBlank()) {
            throw new InvalidProductRequestException("Search query cannot be null or blank");
        }
    }

    public void validateRequestId(String id) {
        validateIdFormat(id);
        ensureProductExists(id);
    }

    private void validateIdFormat(String id) {
        if (id == null || id.isBlank()) {
            throw new InvalidProductRequestException("Id cannot be null or blank");
        }
        if (!id.matches("^[A-Za-z0-9\\-]+$")) {
            throw new InvalidProductRequestException("Id format is invalid. Only letters, digits, and hyphens allowed.");
        }
    }

    private void ensureProductExists(String id) {
        if (productRepository.existsById(id)) throw new ProductAlreadyExist();
    }

    public void validateSkuCode(String skuCode) {
        validateSkuCodeFormat(skuCode);
        ensureSkuNotInInventory(skuCode);
        ensureProductNotExists(skuCode);

//TODO
    }

    private void validateSkuCodeFormat(String skuCode) {
        if (skuCode == null || skuCode.isBlank()) {
            throw new InvalidProductRequestException("SKU code cannot be null or blank");
        }
        if (!skuCode.matches("^[A-Za-z0-9\\-_]+$")) {
            throw new InvalidProductRequestException(
                    "Invalid SKU format. Allowed: A-Z, 0-9, hyphen (-), underscore (_), length 3-50."
            );
        }
        if (skuCode.length() < 3 || skuCode.length() > 50) {
            throw new InvalidProductRequestException("SKU code length must be 3-50 characters");
        }
    }

    private void ensureSkuNotInInventory(String skuCode) {
        if (!inventoryClient.isSkuCodeValid(skuCode)) {
            throw new InvalidSkuCodeException(skuCode);
        }
    }

    private void ensureProductNotExists(String skuCode) {
        if (productRepository.existsBySkuCode(skuCode)) {
            throw new ProductAlreadyExist();
        }
    }

    public void validateName(String name) {
        if (name == null || name.isBlank()) {
            throw new InvalidProductRequestException("Product name cannot be null or blank");
        }
        if (name.length() > 100) {
            throw new InvalidProductRequestException("Product name cannot exceed 100 characters");
        }
    }

    public void validateDescription(String description) {
        if (description != null && description.length() > 500) {
            throw new InvalidProductRequestException("Description cannot exceed 500 characters");
        }
    }

    public void validatePrice(BigDecimal price) {
        if (price == null) {
            throw new InvalidProductRequestException("Price cannot be null");
        }
        if (price.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidProductRequestException("Price must be greater than 0");
        }
    }

}
