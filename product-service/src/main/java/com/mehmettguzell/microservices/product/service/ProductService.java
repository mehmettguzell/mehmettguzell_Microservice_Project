package com.mehmettguzell.microservices.product.service;

import com.mehmettguzell.microservices.product.client.InventoryClient;
import com.mehmettguzell.microservices.product.dto.ProductResponse;
import com.mehmettguzell.microservices.product.dto.ProductRequest;
import com.mehmettguzell.microservices.product.exception.InvalidSkuCodeException;
import com.mehmettguzell.microservices.product.exception.ProductNotFoundException;
import com.mehmettguzell.microservices.product.mapper.ProductMapper;
import com.mehmettguzell.microservices.product.model.Product;
import com.mehmettguzell.microservices.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final InventoryClient inventoryClient;

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        validateSkuCode(request.skuCode());
        Product product = productMapper.toEntity(request);
        Product savedProduct = saveAndLogProduct(product, "created");
        return productMapper.toResponse(savedProduct);
    }

    public ProductResponse getProduct(String id) {
        Product product = getProductEntityOrThrow(id);
        return productMapper.toResponse(product);
    }

    public List<ProductResponse> getAllProducts() {
        return productMapper.toResponseList(productRepository.findAll());
    }

    public List<ProductResponse> searchProductByName(String name) {
        return productMapper.toResponseList(productRepository.findByNameContainingIgnoreCase(name));
    }

    @Transactional
    public ProductResponse updateProduct(String id, ProductRequest request) {
        Product product = getProductEntityOrThrow(id);
        productMapper.updateEntity(product, request);
        Product savedProduct = saveAndLogProduct(product, "updated");
        return productMapper.toResponse(savedProduct);
    }

    @Transactional
    public String deleteProduct(String id) {
        Product product = getProductEntityOrThrow(id);
        if (product.getSkuCode() != null) {
            inventoryQuantityZero(product.getSkuCode());
        }
        deleteAndLogProduct(product);
        return "Product Deleted: " + product.getId() ;
    }

    private void validateSkuCode(String skuCode) {
        if (!inventoryClient.isSkuCodeValid(skuCode)) {
            throw new InvalidSkuCodeException(skuCode);
        }
    }

    private void inventoryQuantityZero(String skuCode) {
        inventoryClient.setQuantityZero(skuCode);
    }

    private Product getProductEntityOrThrow(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    private Product saveAndLogProduct(Product product, String action) {
        productRepository.save(product);
        logProduct(product, action);
        return product;
    }

    private void deleteAndLogProduct(Product product) {
        productRepository.delete(product);
        logProduct(product, "deleted");
    }

    private void logProduct(Product product, String action) {
        log.info("Product {} : id={} , name={}", action, product.getId(), product.getName());
    }
}
