import { Inventory } from "@/types";
import InventoryList from "./InventoryList";
import { use } from "react";
import CreateInventoryCard from "../CreateInventoryCard";
interface Props {
    initialInventory: Promise<Inventory[]>;
};

export default function InventoryBarWrapper({ initialInventory }: Props) {
    const initialInventoryResolved = use(initialInventory);
    return (
        <div>
            <InventoryList initialInventory={initialInventoryResolved} />
            <CreateInventoryCard />
        </div>
    );
}