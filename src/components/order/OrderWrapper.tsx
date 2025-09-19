"use client";

import { OrderResponse } from "@/types";
import React, { useState } from "react";
import OrderList from "./OrderList";

type OrderWrapperProps = {
  allOrders: OrderResponse[];
};

export default function OrderWrapper({ allOrders }: OrderWrapperProps) {
  const [orders, setOrders] = useState<OrderResponse[]>(allOrders);

  const handleCancel = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o))
    );
  };

  const handleConfirm = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "CONFIRMED" } : o))
    );
  };

  return (
    <OrderList
      allOrders={orders}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}
