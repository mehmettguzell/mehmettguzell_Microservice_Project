"use client";
import React from 'react';
import { Product } from '@/types';
import OrderButton from "./OrderButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <h3>{product.name}</h3>
      <p>SKU: {product.skuCode}</p>
      <p>Fiyat: {product.price} ₺</p>
      <p>Açıklama: {product.description}</p>
      <OrderButton product={product} />
    </div>
  );
}
