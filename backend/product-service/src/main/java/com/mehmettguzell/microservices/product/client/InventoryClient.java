package com.mehmettguzell.microservices.product.client;

import com.mehmettguzell.microservices.product.dto.ApiResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.DeleteExchange;
import org.springframework.web.service.annotation.GetExchange;

public interface InventoryClient {

    @GetExchange("/api/inventory/validate")
    ApiResponse<Boolean> isSkuCodeValid(@RequestParam("skuCode") String skuCode);

    @DeleteExchange("/api/inventory")
    void setQuantityZero(@RequestParam String skuCode);

    @GetExchange("/api/inventory/{skuCode}/stock")
    ApiResponse<Integer> getAllStocksBySkuCode(@PathVariable String skuCode);

}
