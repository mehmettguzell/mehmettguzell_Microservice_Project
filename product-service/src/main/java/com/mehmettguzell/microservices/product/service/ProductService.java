package com.mehmettguzell.microservices.product.service;

import com.mehmettguzell.microservices.product.dto.ProductResponse;
import com.mehmettguzell.microservices.product.dto.ProductRequest;
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

    public ProductResponse getProduct(String id) {
        Product product = getProductOrThrow(id);

        return toProductResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = toProductEntity(productRequest);
        Product savedProduct = savedAndLogProduct(product, "created");
        return toProductResponse(savedProduct);
    }

    @Transactional
    public ProductResponse updateProduct(String requestProductId, ProductRequest requestProduct) {
        Product updatedProduct = getProductOrThrow(requestProductId);
        updateProductFromRequest(updatedProduct, requestProduct);
        Product savedProduct = savedAndLogProduct(updatedProduct, "updated");
        return toProductResponse(savedProduct);
    }
    @Transactional
    public void deleteProduct(String id) {
        Product product = getProductOrThrow(id);
        deleteAndLogProduct(product);
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toProductResponse)
                .toList();
    }

    public void updateProductFromRequest(Product product, ProductRequest request) {
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
    }

    public Product getProductOrThrow(String productId){
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product savedAndLogProduct(Product product, String action){
        productRepository.save(product);
        logProduct(product, action);
        return product;
    }

    public void deleteAndLogProduct(Product product){
        productRepository.delete(product);
        logProduct(product, "deleted");
    }

    public void logProduct(Product product, String action){
        log.info("Product {} : id={} , name={}", action, product.getId(), product.getName());
    }

    public Product toProductEntity(ProductRequest productRequest){
        return  Product.builder()
                .name(productRequest.name())
                .description(productRequest.description())
                .price(productRequest.price())
                .build();
    }

    public ProductResponse toProductResponse(Product product){
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice()
        );
    }
}
