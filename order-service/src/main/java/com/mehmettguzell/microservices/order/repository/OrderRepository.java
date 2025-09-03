package com.mehmettguzell.microservices.order.repository;

import com.mehmettguzell.microservices.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {

}
