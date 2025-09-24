"use client";
import React from "react";
import toast from "react-hot-toast";
import { Product } from "@/types/Product";
import { createOrder } from "@/services/orderService";
import { OrderRequest } from "@/types";

interface Props {
  product: Product;
}

export default function OrderButton({ product }: Props) {
  const [amount, setAmount] = React.useState<number>(0);

  const handleOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (amount <= 0) {
      toast.error("Please enter a valid amount greater than zero.");
      setAmount(0);
      return;
    }

    const orderRequest: OrderRequest = {
      skuCode: product.skuCode,
      price: product.price,
      quantity: amount,
    };

    try {
      await createOrder(orderRequest);
      toast.success("Order successfull ✅");
      setAmount(0);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="number"
        min={0}
        value={amount}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
        className="w-1/3 p-3 rounded-2xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
        placeholder="Amount"
      />
      <button
        onClick={handleOrder}
        className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Order
      </button>
    </div>
  );
}
