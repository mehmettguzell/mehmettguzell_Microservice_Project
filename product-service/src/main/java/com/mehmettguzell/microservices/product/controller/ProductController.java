package com.mehmettguzell.microservices.product.controller;

import com.mehmettguzell.microservices.product.dto.ApiResponse;
import com.mehmettguzell.microservices.product.dto.ProductRequest;
import com.mehmettguzell.microservices.product.dto.ProductResponse;
import com.mehmettguzell.microservices.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProductResponse> createProduct(@Valid @RequestBody ProductRequest productRequest){
        return ApiResponse.ok(productService.createProduct(productRequest), "New Product Created");
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<ProductResponse> getProduct(@PathVariable String id){
        return ApiResponse.ok(productService.getProduct(id), "Product Found");
    }

    @GetMapping("get-id/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<String> getProductBySkuCode(@PathVariable String skuCode){
        return ApiResponse.ok(productService.getProductIdBySkuCode(skuCode), "Product Found");
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<List<ProductResponse>> getAllProducts(){
        List<ProductResponse> products = productService.getAllProducts();
        return ApiResponse.ok(products, "All products retrieved successfully");
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<List<ProductResponse>> searchProductByName(@RequestParam String name){
        List<ProductResponse> products = productService.searchProductByName(name);
        return ApiResponse.ok(products, "Searched products found successfully");
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<ProductResponse> updateProduct(
            @PathVariable String id,
            @Valid @RequestBody ProductRequest productRequest
    ) {
        ProductResponse updatedProduct = productService.updateProduct(id, productRequest);
        return ApiResponse.ok(updatedProduct, "Product Updated");
    }

    @DeleteMapping()
    @ResponseStatus(HttpStatus.OK)
    public ApiResponse<Void> deleteProduct(@RequestParam String id){
        productService.deleteProduct(id);
        return ApiResponse.ok(null, "Product Deleted: " + id);
    }
}
