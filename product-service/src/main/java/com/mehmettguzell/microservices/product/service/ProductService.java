package com.mehmettguzell.microservices.product.service;

import com.mehmettguzell.microservices.product.client.InventoryClient;
import com.mehmettguzell.microservices.product.dto.ActionType;
import com.mehmettguzell.microservices.product.dto.ProductResponse;
import com.mehmettguzell.microservices.product.dto.ProductRequest;
import com.mehmettguzell.microservices.product.exception.ProductNotFoundException;
import com.mehmettguzell.microservices.product.mapper.ProductMapper;
import com.mehmettguzell.microservices.product.model.Product;
import com.mehmettguzell.microservices.product.repository.ProductRepository;
import com.mehmettguzell.microservices.product.validation.ProductValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final InventoryClient inventoryClient;
    private final ProductValidator productValidator;

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        validateProductRequest(request);
        Product product = mapToEntity(request);
        Product savedProduct = persistProduct(product, ActionType.CREATED);
        return mapToResponse(savedProduct);
    }

    public BigDecimal getProductPriceBySkuCode(String skuCode) {
        return productRepository.findBySkuCode(skuCode).getPrice();
    }

    public ProductResponse getProduct(String id) {
        productValidator.validateRequestId(id);
        return mapToResponse(getProductEntityByIdOrThrow(id));
    }

    public String getProductIdBySkuCode(String skuCode) {
        Product product = productRepository.findBySkuCode(skuCode);
        return product != null ? product.getId() : null;
    }

    public List<ProductResponse> getAllProducts() {
        return toRepsonseList(productRepository.findAll());
    }

    public List<ProductResponse> searchProductByName(String name) {
        productValidator.validateSearchQuery(name);
        return toRepsonseList(productRepository.findByNameContainingIgnoreCase(name));
    }

    @Transactional
    public ProductResponse updateProduct(String id, ProductRequest request) {
        validateUpdateRequest(id, request);
        Product product = fetchAndUpdateProduct(id, request);
        Product savedProduct = persistProduct(product, ActionType.UPDATED);
        return mapToResponse(savedProduct);
    }

    @Transactional
    public void deleteProduct(String id) {
        Product product = getProductEntityByIdOrThrow(id);
        resetInventoryIfExists(product);
        removeProduct(product);
    }

    @Transactional
    public void deleteProductBySkuCode(String skuCode) {
        Product product = getProductEntityBySkuCodeOrThrow(skuCode);
        resetInventoryIfExists(product);
        removeProduct(product);
    }

    // ===========================
    // PRIVATE HELPERS
    // ===========================

    private List<ProductResponse> toRepsonseList(List<Product> products) {
        return productMapper.toResponseList(products);
    }

    private void validateUpdateRequest(String id, ProductRequest request) {
        productValidator.validateRequestId(id);
        productValidator.validateDescription(request.description());
        productValidator.validatePrice(request.price());
        productValidator.validateName(request.name());
    }

    private void validateProductRequest(ProductRequest request){
        productValidator.validateSkuCode(request.skuCode());
        productValidator.validateName(request.name());
        productValidator.validateDescription(request.description());
        productValidator.validatePrice(request.price());
    }

    private ProductResponse mapToResponse(Product product) {
        return productMapper.toResponse(product);
    }
    private Product mapToEntity(ProductRequest request) {
        return productMapper.toEntity(request);
    }

    private Product fetchAndUpdateProduct(String id, ProductRequest request) {
        Product product = getProductEntityByIdOrThrow(id);
        productMapper.updateEntity(product, request);
        return product;
    }

    private Product persistProduct(Product product, ActionType action) {
        return saveProductWithLog(product, action.getLabel());
    }

    private Product getProductEntityByIdOrThrow(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    private Product getProductEntityBySkuCodeOrThrow(String skuCode) {
        Product product = productRepository.findBySkuCode(skuCode);
        if (product == null) {
            throw new ProductNotFoundException(skuCode);
        }
        return product;
    }


    private Product saveProductWithLog(Product product, String action) {
        productRepository.save(product);
        logProduct(product, action);
        return product;
    }

    private void resetInventoryIfExists(Product product) {
        String skuCode = product.getSkuCode();
        if (skuCode != null && !skuCode.isBlank()) {
            try {
                inventoryClient.setQuantityZero(skuCode);
            } catch (Exception ex) {
                log.error("Failed to reset inventory for SKU {}: {}", skuCode, ex.getMessage());
            }
        } else {
            log.warn("Product SKU is null or blank, skipping inventory reset for product id: {}", product.getId());
        }
    }

    private void removeProduct(Product product) {
        deleteAndLogProduct(product);
    }

    private void deleteAndLogProduct(Product product) {
        productRepository.delete(product);
        logProduct(product, ActionType.DELETED.getLabel());
    }

    private void logProduct(Product product, String action) {
        log.info("Product {} : id={} , name={}", action, product.getId(), product.getName());
    }



}
