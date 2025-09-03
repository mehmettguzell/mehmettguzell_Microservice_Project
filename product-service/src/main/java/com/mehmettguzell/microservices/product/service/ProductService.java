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
        productRepository.save(product);

        log.info("Product created successfully: id={}, name={}", product.getId(), product.getName());
        return toProductResponse(product);
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
