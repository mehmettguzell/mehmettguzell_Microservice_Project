"use client";
import { useState } from "react";
import { Inventory } from "@/types/Inventory";
import AddQuantitySection from "@/inventoryComponents/AddQuantitySection";
import { addStock, setQuantityZeroById } from "@/services/inventoryService";
import { useRouter } from "next/navigation";
import DeleteStocks from "@/inventoryComponents/DeleteStocks";

interface Props {
  inventory: Inventory;
}

export default function InventoryCard({ inventory }: Props) {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const deleteState = () => {
    setAmount(0);
  };

  const handleAddStock = async (amount: number) => {
    if (amount <= 0) return;
    try {
      await addStock(inventory.id, amount);
      router.refresh();
      deleteState();
    } catch (error) {
      setError("Failed to add stock. Please try again.");
      return;
    }
  };

  const handleDeleteStock = async () => {
    try {
      await setQuantityZeroById(inventory.id);
      router.refresh();
    } catch (error) {
      setError("Failed to delete stock. Please try again.");
      return;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          SKU: {inventory.skuCode}
        </h2>
        <span className="text-sm font-medium text-white bg-blue-500 px-3 py-1 rounded-full shadow-md">
          ID: {inventory.id}
        </span>
      </div>
      <div className="text-gray-700">
        <p className="mb-2 text-lg font-semibold">
          Quantity: <span className="text-gray-900">{inventory.quantity}</span>
        </p>
        <p className="text-gray-500 text-sm">Updated recently</p>

        <AddQuantitySection
          amount={amount}
          setAmount={setAmount}
          onAdd={handleAddStock}
        />
        <DeleteStocks onDelete={handleDeleteStock} />
      </div>
    </div>
  );
}
