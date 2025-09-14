import { getAllProducts } from '@/services/productService';
import { Product } from '@/types';
import ProductBarWrapper from '@/components/ProductComponents/ProductBarWrapper';
import { Suspense } from 'react';

export default async function ProductPage() {
  const productsPromise = getAllProducts();
  
 return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductBarWrapper initialProducts={productsPromise} />
      </Suspense>
    </div>
  )
}
