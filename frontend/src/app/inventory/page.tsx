import React, { Suspense } from "react";
import { getAllInventory } from "@/services/inventoryService";
import InventoryBarWrapper from "@/inventoryComponents/InventoryBarWrapper";

export default async function InventoryPage() {
  const inventoryItems = await getAllInventory();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-12 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 drop-shadow-lg text-center">
        📦 Inventory
      </h1>

      <div className="w-full max-w-6xl">
        <Suspense
          fallback={
            <div className="text-center text-gray-300 font-medium py-10">
              Loading inventory...
            </div>
          }
        >
          <InventoryBarWrapper initialInventory={inventoryItems} />
        </Suspense>
      </div>
    </div>
  );
}
