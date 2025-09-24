import { Inventory } from "@/types/Inventory";
import InventoryList from "@/inventoryComponents/InventoryList";
import CreateInventoryCard from "@/inventoryComponents/CreateInventoryCard";
interface Props {
  initialInventory: Inventory[];
}

export default function InventoryBarWrapper({ initialInventory }: Props) {
  return (
    <div className="space-y-10">
      <InventoryList initialInventory={initialInventory} />
      <div className="mt-10">
        <CreateInventoryCard />
      </div>
    </div>
  );
}
