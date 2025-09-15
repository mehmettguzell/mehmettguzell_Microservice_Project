"use client";
import { OrderResponse } from "@/types";
import { use } from "react";
import React, { useState, useEffect } from "react";
import OrderList from "./OrderList";
import { getAllOrders } from "@/services/orderService";

export default function OrderWrapper() {
  const [allOrders, setAllOrders] = useState<OrderResponse[]>([]);

  useEffect(() => {
    getAllOrders().then((data) => setAllOrders(data));
  }, []);

  const handleCancel = (orderId: number) => {
    setAllOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o))
    );
  };

  const handleConfirm = (orderId: number) => {
    setAllOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "CONFIRMED" } : o))
    );
  };

  return (
    <OrderList
      allOrders={allOrders}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}
