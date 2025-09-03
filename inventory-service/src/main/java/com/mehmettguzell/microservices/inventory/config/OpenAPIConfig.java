package com.mehmettguzell.microservices.inventory.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI inventoryServiceAPI() {
        return new OpenAPI()
                .info(new Info().title("Inventory Service API")
                        .description("Inventory Service API")
                        .version("1.0")
                        .contact(new Contact().name("Mehmettguzell")
                                .email("mehmetg120031@gmail.com")
                                .url("https://github.com/mehmettguzell"))
                        .license(new License().name("Apache 2.0")));
    }
}
