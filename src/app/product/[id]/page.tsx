import {} from 'react';
import {getProductById}  from "@/services/productService";
import ProductIdCard from '@/components/ProductIdCard';
import {getInventoryBySkuCode} from "@/services/inventoryService"

interface Props {
    params: { id: string };
}

export default async function ProductIdPage({ params }: Props) {
    const { id: productId } = await params;

    const product = await getProductById(productId);
    const inventory = await getInventoryBySkuCode(product.skuCode);

   return (
        <div key={product.id} className="cursor-pointer">
            <ProductIdCard product={product} inventory={inventory} />
        </div>
    );
}