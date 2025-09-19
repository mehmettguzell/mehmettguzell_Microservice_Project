import { Inventory } from "@/types/Inventory";
import InventoryList from "@/inventoryComponents/InventoryList";
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
