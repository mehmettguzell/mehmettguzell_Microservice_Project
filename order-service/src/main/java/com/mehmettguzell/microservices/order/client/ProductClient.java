package com.mehmettguzell.microservices.order.client;

import com.mehmettguzell.microservices.order.dto.ApiResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

import java.math.BigDecimal;

public interface ProductClient {

    @GetExchange("/api/product/price/{skuCode}")
    ApiResponse<BigDecimal> getProductPrice(@PathVariable("skuCode") String skuCode);
}
