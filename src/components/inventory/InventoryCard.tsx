"use client";
import { useState } from "react";
import { Inventory } from "@/types/Inventory";
import AddQuantitySection from "@/inventoryComponents/AddQuantitySection";
import {
  addStock,
  deleteInventoryById,
  setQuantityZeroById,
} from "@/services/inventoryService";
import { useRouter } from "next/navigation";
import DeleteStocks from "@/inventoryComponents/DeleteStocks";
import { validateInventoryInput } from "@/validator/inventoryValidator";
import toast from "react-hot-toast";
import DeleteInventory from "./DeleteInventory";

interface Props {
  inventory: Inventory;
}

export default function InventoryCard({ inventory }: Props) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetAll = () => {
    setAmount(0);
    setLoading(false);
  };

  const handleAddStock = async (amount: number) => {
    try {
      validateInventoryInput(inventory.skuCode, amount);
      if (amount <= 0) {
        toast.error("Quantity cannot be zero or negative");
        return;
      }
      setLoading(true);
      await addStock(inventory.id, amount);
      toast.success(`${amount} items added to stock ✅`);
      router.refresh();
      resetAll();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
      resetAll();
    }
  };

  const onDeleteInventory = async () => {
    try {
      setLoading(true);
      await deleteInventoryById(inventory.id);
      toast.success("Inventory deleted 🗑️");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
      resetAll();
    }
  };

  const handleDeleteStock = async () => {
    try {
      await setQuantityZeroById(inventory.id);
      toast.success("Stock quantity set to zero 🗑️");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
      resetAll();
    }
  };

  return (
    <div className="mt-6 max-w-md mx-auto relative bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-6 hover:shadow-3xl transition-shadow duration-300">
      <span className="absolute top-4 right-4 text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
        ID: {inventory.id}
      </span>
      <div className="absolute top-14 right-4">
        <DeleteInventory
          onDeleteInventory={onDeleteInventory}
          id={inventory.id}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-extrabold text-gray-800 text-lg sm:text-xl">
          SKU: {inventory.skuCode}
        </h3>
      </div>

      <div className="text-gray-700 mb-4">
        <p className="mb-1 text-lg font-semibold">
          Quantity: <span className="text-gray-900">{inventory.quantity}</span>
        </p>
        <p className="text-gray-500 text-sm">Updated recently</p>
      </div>

      {/* Add & Delete Sections */}
      <AddQuantitySection
        amount={amount}
        setAmount={setAmount}
        onAdd={handleAddStock}
      />
      <DeleteStocks onDelete={handleDeleteStock} />
    </div>
  );
}
