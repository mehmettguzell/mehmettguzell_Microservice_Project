import { Inventory } from "@/types";
import InventoryList from "@/inventoryComponents/InventoryWrapper/InventoryList";
import { use } from "react";
import CreateInventoryCard from "@/inventoryComponents/CreateInventoryCard";
interface Props {
  initialInventory: Inventory[];
}

export default function InventoryBarWrapper({ initialInventory }: Props) {
  return (
    <div>
      <InventoryList initialInventory={initialInventory} />
      <CreateInventoryCard />
    </div>
  );
}
