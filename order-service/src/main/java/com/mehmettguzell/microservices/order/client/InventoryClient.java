package com.mehmettguzell.microservices.order.client;

import com.mehmettguzell.microservices.order.dto.ApiResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

public interface InventoryClient {

    @GetExchange("/api/inventory")
    ApiResponse<Boolean> isInStock(@RequestParam("skuCode") String skuCode,
                                   @RequestParam("quantity") Integer quantity);

    @GetExchange("/api/inventory/validate")
    ApiResponse<Boolean> isSkuCodeValid(@RequestParam("skuCode") String skuCode);

    //@GetExchange()

}
