import {} from 'react';
import {getAllProducts}  from "../../services/productService";
import ProductList from '@/components/ProductList';
import Link from 'next/link';


export default async function ProductPage() {
    const products = await getAllProducts();

  return (
    <>
      <ProductList initialData={products} />
      {/* <Link href="/product/new" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Product
      </Link> */}
    </>
  );
}