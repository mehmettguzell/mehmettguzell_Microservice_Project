package com.mehmettguzell.microservices.order.client;

import com.mehmettguzell.microservices.order.dto.ApiResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PatchExchange;

public interface InventoryClient {

    @GetExchange("/api/inventory")
    ApiResponse<Boolean> isInStock(@RequestParam("skuCode") String skuCode,
                                   @RequestParam("quantity") Integer quantity);

    @GetExchange("/api/inventory/validate")
    ApiResponse<Boolean> isSkuCodeValid(@RequestParam("skuCode") String skuCode);

    @PatchExchange("/api/inventory/reduceStock/{skuCode}")
    ApiResponse<Void> reduceStock( @PathVariable String skuCode, @RequestParam("quantity") Integer quantity);
}
