import React from "react";
import { getAllOrders } from "@/services/orderService";
import OrderWrapper from "@/components/order/OrderWrapper";

export default async function CartPage() {
  const allOrders = await getAllOrders();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <OrderWrapper allOrders={allOrders} />
    </div>
  );
}
