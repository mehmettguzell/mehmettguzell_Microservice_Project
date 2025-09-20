"use client";

import { useState, useEffect, useCallback } from "react";
import ProductSearchBar from "./ProductSearchBar";
import ProductList from "./ProductList";
import ProductCreateCard from "@/components/product/ProductCreateCard";
import { Product } from "@/types/Product";
import {
  searchProductsByName,
  getAllProducts,
} from "@/services/productService";
import toast from "react-hot-toast";

interface Props {
  products: Product[];
}

export default function ProductBarWrapper({ products }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);

  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null;
    return (...args: Parameters<typeof func>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const fetchProducts = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        if (!query) {
          setProductList(products);
        } else {
          const result = await searchProductsByName(query);
          setProductList(result);
        }
      } catch (e) {
        toast.error(" Search failed.");
      } finally {
        setLoading(false);
      }
    }, 300),
    [products]
  );

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery, fetchProducts]);

  return (
    <div>
      <ProductSearchBar value={searchQuery} onChange={setSearchQuery} />
      {loading && <div>Loading...</div>}
      <ProductList products={productList} />
      <ProductCreateCard setProducts={setProductList} />
    </div>
  );
}
