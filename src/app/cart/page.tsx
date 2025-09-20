import React from "react";
import { getAllOrders } from "@/services/orderService";
import OrderWrapper from "@/components/order/OrderWrapper";

export default async function CartPage() {
  const allOrders = await getAllOrders();

  return (
    <div className="memo-div ">
      <h1 className="memo-h1">🛒 Your Cart</h1>
      <OrderWrapper allOrders={allOrders} />
    </div>
  );
}
