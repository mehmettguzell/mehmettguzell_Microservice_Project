package com.mehmettguzell.microservices.product.service;

import com.mehmettguzell.microservices.product.dto.ProductResponse;
import com.mehmettguzell.microservices.product.dto.ProductRequest;
import com.mehmettguzell.microservices.product.model.Product;
import com.mehmettguzell.microservices.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class ProductService {
    private final ProductRepository productRepository;

    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = toProductEntity(productRequest);
        Product savedProduct = savedAndLogProduct(product, "created");
        return toProductResponse(savedProduct);
    }

    public ProductResponse updateProduct(String requestProductId, ProductRequest requestProduct) {
        Product updatedProduct = getProductOrThrow(requestProductId);
        updateProductFromRequest(updatedProduct, requestProduct);
        Product savedProduct = savedAndLogProduct(updatedProduct, "updated");
        return toProductResponse(savedProduct);
    }

    public void updateProductFromRequest(Product product, ProductRequest request) {
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
    }

    public Product savedAndLogProduct(Product product, String action){
        productRepository.save(product);
        log.info("Product {} : id={} , name={}", action, product.getId(), product.getName());
        return product;
    }

    public Product getProductOrThrow(String productId){
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
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

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toProductResponse)
                .toList();
    }
}
