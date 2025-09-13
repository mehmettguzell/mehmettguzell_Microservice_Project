"use client";
import React from 'react';
import { Inventory, Product } from '../../types';

interface Props {
  product: Product;
  inventory: Inventory;
}

export default function ProductIdCard({ product, inventory }: Props) {
    const skuCode = product.skuCode;

  return (
    <div className="border p-4 rounded shadow">
      <h3>{product.name}</h3>
      <p>SKU: {product.skuCode}</p>
      <p>Fiyat: {product.price} ₺</p>
      <p>Açıklama: {product.description}</p>
      <p>Quantity: {inventory.quantity}</p>
    </div>
  );
}
