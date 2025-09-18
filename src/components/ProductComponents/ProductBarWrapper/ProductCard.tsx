"use client";
import React, { useState } from "react";
import { Product } from "@/types/Product";
import OrderButton from "../OrderButton";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="border p-4 rounded shadow">
      <Link href={`/product/${product.id}`}>
        <h3>{product.name}</h3>
        <p>SKU: {product.skuCode}</p>
        <p>Fiyat: {product.price} ₺</p>
        <p>Açıklama: {product.description}</p>
      </Link>
      <OrderButton key={product.id} product={product} />
    </div>
  );
}
