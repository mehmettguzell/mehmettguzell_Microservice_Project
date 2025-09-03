package com.mehmettguzell.microservices.product.repository;

import com.mehmettguzell.microservices.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends MongoRepository<Product,String> {

}
