package com.mehmettguzell.microservices.api_gateway.routes;

import com.mehmettguzell.microservices.api_gateway.config.ServiceProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@RequiredArgsConstructor

public class Routes {

    private final ServiceProperties serviceProperties;

    @Bean
    public RouteLocator RouteLocator(RouteLocatorBuilder builder) {
        RouteLocatorBuilder.Builder routesBuilder  = builder.routes();

        serviceProperties.getServices().forEach((serviceName, uri) ->
                routesBuilder.route(serviceName, r ->
                        r.path("/api/" + serviceName + "/**")
                                .uri(uri)));

        return routesBuilder.build();
    }
}
