package com.mehmettguzell.microservices.order.model;

import com.mehmettguzell.microservices.order.exception.OrderCannotBeConfirmedException;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "t_orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    private String skuCode;
    private BigDecimal price;
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;


    public void confirm() {
        if (this.status != OrderStatus.PENDING) {
            throw new OrderCannotBeConfirmedException(this.id);
        }
        this.status = OrderStatus.CONFIRMED;
    }
}
