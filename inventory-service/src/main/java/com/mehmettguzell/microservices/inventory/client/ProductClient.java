package com.mehmettguzell.microservices.inventory.client;

import com.mehmettguzell.microservices.inventory.dto.ApiResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.DeleteExchange;
import org.springframework.web.service.annotation.GetExchange;

public interface ProductClient {

@GetExchange("/api/product/get-id/{skuCode}")
ApiResponse<String> getProductIdBySkuCode(@PathVariable String skuCode);

@DeleteExchange("/api/product")
ApiResponse<Void> deleteProduct(@RequestParam("id") String id);
}

