"use client";
import React from "react";
import { Product } from "@/types/Product";
import { Inventory } from "@/types/Inventory";

interface Props {
  product: Product;
  inventory: Inventory;
}

export default function ProductIdCard({ product, inventory }: Props) {
  return (
    <div
      className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-md p-6 w-full max-w-lg
                    hover:shadow-2xl hover:scale-105 transition-transform duration-300"
    >
      <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
        {product.name}
      </h3>
      <p className="text-gray-600 mb-1">SKU: {product.skuCode}</p>
      <p className="text-gray-600 mb-1">Fiyat: {product.price} ₺</p>
      <p className="text-gray-500 mb-2 text-sm">{product.description}</p>
      <p className="text-gray-700 font-semibold">
        Quantity: {inventory.quantity}
      </p>
    </div>
  );
}
