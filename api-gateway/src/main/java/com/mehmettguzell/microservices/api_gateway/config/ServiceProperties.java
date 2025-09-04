package com.mehmettguzell.microservices.api_gateway.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "services")
@Getter @Setter
public class ServiceProperties {
    private Map<String, String> services;
}
