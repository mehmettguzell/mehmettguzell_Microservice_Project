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
    <div className="orderCard-div">
      <h3 className="orderCard-header">{order.skuCode}</h3>
      <p className="orderCard-body font-semibold">
        Order Number: {order.orderNumber}
      </p>
      <p className="orderCard-body">Quantity: {order.quantity}</p>
      <p className="orderCard-body">Fiyat: {order.price} ₺</p>
      <p
        className={`font-semibold ${order.status === "PENDING" ? "text-yellow-500" : order.status === "CONFIRMED" ? "text-green-500" : "text-red-500"}`}
      >
        Status: {order.status}
      </p>
      <div className="orderCard-footer">
        <CancelOrder order={order} onCancel={onCancel} />
        <ConfirmOrder order={order} onConfirm={onConfirm} />
      </div>
    </div>
  );
}
