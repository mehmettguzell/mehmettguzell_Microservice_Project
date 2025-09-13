import {} from 'react';
import {getProductById}  from "@/services/productService";

interface Props {
    params: { id: string };
}

export default async function ProductIdPage({ params }: Props) {
    const { id: productId } = await params;
    const product = await getProductById(productId);

   return (
        <p>Ürün ID: {product.name}</p>
    );
}