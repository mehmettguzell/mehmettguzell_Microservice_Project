import {} from 'react';
import {getAllProducts}  from "@/services/productService";
import ProductList from '@/components/ProductList';


export default async function ProductPage() {
    const products = await getAllProducts();

  return (

    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductList initialData={products} />
    </div>
  );
}