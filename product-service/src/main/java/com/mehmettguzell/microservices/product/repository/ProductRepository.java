package com.mehmettguzell.microservices.product.repository;

import com.mehmettguzell.microservices.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product,String> {

    List<Product> findByNameContainingIgnoreCase(String name);

    boolean existsBySkuCode(String skuCode);

    Product findBySkuCode(String skuCode);
}
