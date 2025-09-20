"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/Product";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center px-4 sm:px-6 lg:px-12 py-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
