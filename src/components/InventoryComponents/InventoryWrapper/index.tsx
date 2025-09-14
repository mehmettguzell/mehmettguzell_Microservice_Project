import { Inventory } from "@/types";
import InventoryList from "@/inventoryComponents/InventoryWrapper/InventoryList";
import { use } from "react";
import CreateInventoryCard from "@/inventoryComponents/CreateInventoryCard";
interface Props {
  initialInventory: Promise<Inventory[]>;
}

export default function InventoryBarWrapper({ initialInventory }: Props) {
  const initialInventoryResolved = use(initialInventory);
  return (
    <div>
      <InventoryList initialInventory={initialInventoryResolved} />
      <CreateInventoryCard />
    </div>
  );
}
