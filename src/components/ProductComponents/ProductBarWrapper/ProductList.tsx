"use client";

import React from "react";
import ProductCard from "@/components/ProductComponents/ProductBarWrapper/ProductCard";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import OrderButton from "./OrderButton";

interface Props {
  initialData: Product[];
}
export default function ProductList({ initialData }: Props) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-4">
      {initialData.map((product) => (
        <div
          key={product.id}
          onClick={() => router.push(`/product/${product.id}`)}
          className="cursor-pointer"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
