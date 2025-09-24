package com.mehmettguzell.microservices.api_gateway.config;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "myapp.security")
@Getter
@Setter
public class SecurityProperties {
    private List<String> openPaths;
}
