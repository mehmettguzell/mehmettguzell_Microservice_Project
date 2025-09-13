"use client";

import { useState } from 'react';
import { searchProductsByName, getAllProducts } from '@/services/productService';
import ProductSearchBar from '@/components/ProductBarWrapper/ProductSearchBar';
import ProductList from '@/components/ProductBarWrapper/ProductList';
import ProductCreateCard from '@/components/ProductBarWrapper/ProductCreateCard';
import { Product } from '@/types';

interface Props {
  initialProducts: Product[];
}

export default function ProductSearchBarWrapper({ initialProducts }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } else {
      const filteredProducts = await searchProductsByName(query);
      setProducts(filteredProducts);
    }
  };

  return (
    <div>
      <ProductSearchBar value={searchQuery} onChange={handleSearch} />
      <ProductList initialData={products} />
      <ProductCreateCard setProducts={setProducts} />
    </div>
  );
}
