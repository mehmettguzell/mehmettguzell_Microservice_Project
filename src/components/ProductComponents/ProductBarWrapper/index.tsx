"use client";

import { useState, useEffect, useCallback } from "react";
import ProductSearchBar from "./ProductSearchBar";
import ProductList from "./ProductList";
import ProductCreateCard from "@/components/ProductComponents/ProductCreateCard";
import { Product } from "@/types/Product";
import {
  searchProductsByName,
  getAllProducts,
} from "@/services/productService";
import OrderButton from "../OrderButton";

interface Props {
  products: Product[];
}

export default function ProductBarWrapper({ products }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("");
      try {
        if (!query) {
          setProductList(products);
        } else {
          const result = await searchProductsByName(query);
          setProductList(result);
        }
      } catch (e) {
        setError("Ürünler aranırken bir hata oluştu.");
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
      {error && <div className="text-red-500">{error}</div>}
      <ProductList products={productList} />
      <ProductCreateCard setProducts={setProductList} />
    </div>
  );
}
