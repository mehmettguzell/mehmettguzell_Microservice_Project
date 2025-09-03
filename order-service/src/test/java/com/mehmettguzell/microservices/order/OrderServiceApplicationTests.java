package com.mehmettguzell.microservices.order;

import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Import;
import org.testcontainers.containers.MySQLContainer;
import io.restassured.RestAssured;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class OrderServiceApplicationTests {

    @ServiceConnection
    static MySQLContainer<?> mysql = new MySQLContainer<>("mysql:8.3.0");

    @LocalServerPort
    private int port; // primitive, not Integer

    @BeforeEach
    void setup() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
    }

    static {
        mysql.start();
    }

    @Test
    void shouldSubmitOrder() {
        String submitOrderJson = """
                {
                    "skuCode":"iphone_15",
                    "price":1000,
                    "quantity": 1
                }
                """;

        var responseBodyString = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(submitOrderJson)
                .when()
                .post("/api/order")
                .then()
                .statusCode(201)
                .extract()
                .body()
                .asString();

        assertThat(responseBodyString, is("Order Placed Successfully"));
    }
}
