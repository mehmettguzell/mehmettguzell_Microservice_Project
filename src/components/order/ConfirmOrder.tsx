import React from "react";
import { OrderResponse } from "@/types";
import { confirmOrder } from "@/services/orderService";
import toast from "react-hot-toast";

interface Props {
  order: OrderResponse;
  onConfirm: (id: number) => void;
}

export default function ConfirmOrder({ order, onConfirm }: Props) {
  const handlerOrderConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (order.status !== "PENDING") {
      toast.error("Only pending orders can be confirmed");
      return;
    }
    await confirmOrder(order.id);
    toast.success("Order confirmed successfully");
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
