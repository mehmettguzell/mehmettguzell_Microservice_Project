"use client";
import React, { useState } from "react";
import { Inventory } from "@/types/Inventory";
import { addInventory } from "@/services/inventoryService";
import { useRouter } from "next/navigation";

export default function CreateInventoryCard() {
  const [skuCode, setSkuCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const resetForm = () => {
    setSkuCode("");
    setQuantity(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!skuCode || quantity <= 0) {
      alert("Please provide valid SKU Code and Quantity.");
      return;
    }

    setLoading(true);
    const newInventoryData: Omit<Inventory, "id"> = {
      skuCode,
      quantity,
    };

    try {
      await addInventory(newInventoryData);
      resetForm();
      router.refresh();
    } catch (error: any) {
      const errorData = error?.response?.data;
      alert(
        "Failed to create inventory. Please try again." +
          (errorData?.message || "")
      );
    }
  };

  return (
    <div className="mt-6 max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create New Inventory
      </h2>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU Code
          </label>
          <input
            type="text"
            value={skuCode}
            onChange={(e) => setSkuCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 placeholder-gray-400"
            placeholder="Enter SKU Code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 placeholder-gray-400"
            placeholder="Enter Quantity"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all duration-200"
          onClick={handleSubmit}
        >
          Create Inventory
        </button>
      </form>
    </div>
  );
}
