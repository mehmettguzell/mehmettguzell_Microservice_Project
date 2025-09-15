import React, { Suspense } from "react";
import { getAllOrders } from "@/services/orderService";
import OrderWrapper from "@/components/OrderComponents/OrderWrapper";

const allOrders = getAllOrders();

export default function CartPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <Suspense fallback={<div>Loading cart...</div>}>
        <OrderWrapper allOrders={allOrders} />
      </Suspense>
    </div>
  );
}
