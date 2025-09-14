import { Inventory } from "@/types";
import InventoryCard from "../InventoryCard";

interface Props {
    initialInventory: Inventory[];
}

export default function InventoryList({ initialInventory }: Props) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {initialInventory.map(inventory => (
                <div 
                    key={inventory.id} 
                    className="border p-4 rounded shadow"
                    >
                    <InventoryCard inventory={inventory} />
                </div>
            ))}
        </div>
    );
}