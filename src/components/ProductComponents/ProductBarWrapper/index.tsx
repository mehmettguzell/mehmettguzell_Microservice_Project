'use client';

import { use, useState } from 'react';
import { searchProductsByName, getAllProducts } from '@/services/productService';
import ProductSearchBar from '@/components/ProductComponents/ProductBarWrapper/ProductSearchBar';
import ProductList from '@/components/ProductComponents/ProductBarWrapper/ProductList';
import ProductCreateCard from '@/components/ProductComponents/ProductBarWrapper/ProductCreateCard';
import { Product } from '@/types';

interface Props {
  initialProducts: Promise<Product[]>;
}

export default function ProductSearchBarWrapper({ initialProducts }: Props) {
  const initialProductsResolved = use(initialProducts);
  const [productList, setProductList] = useState<Product[]>(initialProductsResolved);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      const allProducts = await getAllProducts();
      setProductList(allProducts);
    } else {
      const filteredProducts = await searchProductsByName(query);
      setProductList(filteredProducts);
    }
  };

  return (
    <div>
      <ProductSearchBar value={searchQuery} onChange={handleSearch} />
      <ProductList initialData={productList} />
      <ProductCreateCard setProducts={setProductList} />
    </div>
  );
}
