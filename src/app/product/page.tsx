import { getAllProducts } from '@/services/productService';
import { Product } from '@/types';
import ProductBarWrapper from '@/components/ProductBarWrapper';

export default async function ProductPage() {
  const products: Product[] = await getAllProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductBarWrapper initialProducts={products} />
    </div>
  );
}
