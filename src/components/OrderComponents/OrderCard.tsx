"use client";
import React from "react";
import { OrderResponse } from "@/types";
import CancelOrder from "./CancelOrder";
import ConfirmOrder from "./ConfirmOrder";

interface Props {
  order: OrderResponse;
  onCancel: (id: number) => void;
  onConfirm: (id: number) => void;
}

export default function OrderCard({ order, onCancel, onConfirm }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <h3>{order.skuCode}</h3>
      <p>Order Number: {order.orderNumber}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Fiyat: {order.price} ₺</p>
      <p>Status: {order.status}</p>
      <CancelOrder order={order} onCancel={onCancel} />
      <ConfirmOrder order={order} onConfirm={onConfirm} />
    </div>
  );
}
