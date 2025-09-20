"use client";
import React, { useState } from "react";
import { Inventory } from "@/types/Inventory";
import { addInventory } from "@/services/inventoryService";
import { useRouter } from "next/navigation";
import { validateInventoryInput } from "@/validator/inventoryValidator";
import { toast } from "react-hot-toast/headless";

export default function CreateInventoryCard() {
  const [skuCode, setSkuCode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newInventory: Omit<Inventory, "id"> = { skuCode, quantity };

    try {
      validateInventoryInput(newInventory.skuCode, newInventory.quantity);
      await addInventory(newInventory);

      toast.success("new inventory created successfully");

      resetForm();
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSkuCode("");
    setQuantity(0);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 transition-shadow duration-300 hover:shadow-3xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Create New Inventory
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU Code
          </label>
          <input
            type="text"
            value={skuCode}
            onChange={(e) => setSkuCode(e.target.value)}
            placeholder="Enter SKU Code"
            className="w-full p-4 rounded-2xl border border-gray-300 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter Quantity"
            className="w-full p-4 rounded-2xl border border-gray-300 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Inventory"}
        </button>
      </form>
    </div>
  );
}
