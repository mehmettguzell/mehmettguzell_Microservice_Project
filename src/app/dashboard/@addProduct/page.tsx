import ProductCreateCard from '@/components/ProductCreateCard';
import {} from 'react';

export default async function AddProductPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <ProductCreateCard/>
    </div>
  );
}