import {} from 'react';
import {getProductById}  from "@/services/productService";
import ProductIdCard from '@/components/ProductBarWrapper/ProductIdCard';
import {getInventoryBySkuCode} from "@/services/inventoryService"
import ProductBarWrapper from '@/components/ProductBarWrapper';

interface Props {
    params: { id: string };
}

export default async function ProductIdPage({ params }: Props) {
    const { id: productId } = await params;

    const product = await getProductById(productId);
    const inventory = await getInventoryBySkuCode(product.skuCode);

   return (
    <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Product : {product.name}</h1>
        <ProductIdCard product={product} inventory={inventory} />
    </div>
    );
}