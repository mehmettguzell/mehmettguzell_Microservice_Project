import {} from 'react';
import {getAllProducts}  from "../../services/productService";
import ProductsClient from '@/components/ProductList';


export default async function ProductPage() {
    const products = await getAllProducts();

  return <ProductsClient initialData={products} />;
}