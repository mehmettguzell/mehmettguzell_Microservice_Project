import React from "react";
import { OrderResponse } from "@/types";
import { confirmOrder } from "@/services/orderService";

interface Props {
  order: OrderResponse;
  onConfirm: (id: number) => void;
}

export default function ConfirmOrder({ order, onConfirm }: Props) {
  const handlerOrderConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (order.status !== "PENDING") return;
    await confirmOrder(order.id);
    onConfirm(order.id);
  };

  return (
    <button
      type="button"
      onClick={handlerOrderConfirm}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Confirm Order
    </button>
  );
}
