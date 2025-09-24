import { Inventory } from "@/types/Inventory";
import InventoryCard from "@/inventoryComponents//InventoryCard";

interface Props {
  initialInventory: Inventory[];
}

export default function InventoryList({ initialInventory }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {initialInventory.map((inventory) => (
        <InventoryCard key={inventory.id} inventory={inventory} />
      ))}
    </div>
  );
}
