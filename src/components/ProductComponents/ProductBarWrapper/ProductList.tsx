"use client";

import React from "react";
import ProductCard from "@/components/ProductComponents/ProductBarWrapper/ProductCard";
import { Product } from "@/types/Product";

interface Props {
  products: Product[];
}
export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
