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

  const orderRequest: OrderRequest = {
    skuCode: product.skuCode,
    price: product.price,
    quantity: amount,
  };

  const handleOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (amount <= 0) {
      toast.error("Please enter a valid amount greater than zero.");
      clearInput();
      return;
    }

    try {
      await createOrder(orderRequest);
      toast.success("order successfull");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const clearInput = () => {
    setAmount(0);
  };

  return (
    <div className="flex gap-2">
      <input
        type="number"
        min={0}
        value={amount}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
        className="w-1/3 border border-gray-300 rounded-lg p-2"
        placeholder="Amount"
      />
      <button
        type="button"
        onClick={handleOrder}
        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Order
      </button>
    </div>
  );
}
