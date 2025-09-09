package com.mehmettguzell.microservices.product.service;

import com.mehmettguzell.microservices.product.dto.ProductResponse;
import com.mehmettguzell.microservices.product.dto.ProductRequest;
import com.mehmettguzell.microservices.product.exception.ProductNotFoundException;
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

    // ==== PUBLIC API (CRUD + Queries) ====

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Product product = toProductEntity(request);
        Product savedProduct = saveAndLogProduct(product, "created");
        return toProductResponse(savedProduct);
    }

    public ProductResponse getProduct(String id) {
        Product product = getProductEntityOrThrow(id);
        return toProductResponse(product);
    }

    public List<ProductResponse> getAllProducts() {
        return toProductResponseList(productRepository.findAll());
    }

    public List<ProductResponse> searchProductByName(String name) {
        return toProductResponseList(productRepository.findByNameContainingIgnoreCase(name));
    }

    @Transactional
    public ProductResponse updateProduct(String id, ProductRequest request) {
        Product product = getProductEntityOrThrow(id);
        applyRequestToProduct(product, request);
        Product savedProduct = saveAndLogProduct(product, "updated");
        return toProductResponse(savedProduct);
    }

    @Transactional
    public void deleteProduct(String id) {
        Product product = getProductEntityOrThrow(id);
        deleteAndLogProduct(product);
    }

    // ==== PRIVATE HELPERS ====

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

    private void applyRequestToProduct(Product product, ProductRequest request) {
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
    }

    // ==== MAPPERS ====

    private Product toProductEntity(ProductRequest request) {
        return Product.builder()
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .build();
    }

    private ProductResponse toProductResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice()
        );
    }

    private List<ProductResponse> toProductResponseList(List<Product> products) {
        return products.stream()
                .map(this::toProductResponse)
                .toList();
    }
}
