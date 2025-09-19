"use client";
import React from "react";
import { OrderResponse } from "@/types";
import { cancelOrder } from "@/services/orderService";
import toast from "react-hot-toast";

interface Props {
  order: OrderResponse;
  onCancel: (id: number) => void;
}

export default function CancelOrder({ order, onCancel }: Props) {
  const handlerOrderCancel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (order.status === "CANCELLED" || order.status === "CONFIRMED") {
      toast.error("Only pending orders can be cancelled");
      return;
    }
    await cancelOrder(order.id);
    toast.success("Order cancelled successfully");
    onCancel(order.id);
  };

  return (
    <button
      type="button"
      onClick={handlerOrderCancel}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Cancel Order
    </button>
  );
}
