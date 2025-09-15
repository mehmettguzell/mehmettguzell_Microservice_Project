import React, { Suspense } from "react";
import { getAllInventory } from "@/services/inventoryService";
import InventoryBarWrapper from "@/components/InventoryComponents/InventoryWrapper/index";

export default async function InventoryPage() {
  const inventoryItems = await getAllInventory();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <Suspense fallback={<div>Loading inventory...</div>}>
        <InventoryBarWrapper initialInventory={inventoryItems} />
      </Suspense>
    </div>
  );
}
