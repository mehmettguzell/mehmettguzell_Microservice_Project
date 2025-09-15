"use client";
import React from "react";
import { OrderResponse } from "@/types";
import OrderCard from "./OrderCard";

interface Props {
  allOrders: OrderResponse[];
  onCancel: (id: number) => void;
  onConfirm: (id: number) => void;
}

export default function OrderList({ allOrders, onCancel, onConfirm }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {allOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      ))}
    </div>
  );
}
