"use client";

import { use, useEffect, useState } from 'react';
import {getAllProducts, searchProductsByName}  from "@/services/productService";
import ProductList from '@/components/ProductList';
import ProductSearchBar from '@/components/ProductSearchBar';
import { Product } from '@/types';
import ProductCreateCard from '@/components/ProductCreateCard';


export default  function ProductPage() {
    const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      getAllProducts().then(setProducts);
    }else {
      searchProductsByName(searchQuery).then(setProducts);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ProductSearchBar value={searchQuery} onChange={setSearchQuery} />
      <ProductList initialData={products} />
      <ProductCreateCard setProducts={setProducts} />
    </div>
  );
}