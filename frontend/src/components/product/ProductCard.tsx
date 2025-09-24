"use client";
import React from "react";
import { Product } from "@/types/Product";
import OrderButton from "./OrderButton";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
      <Link href={`/product/${product.id}`} className="mb-4">
        <h3 className="text-xl font-extrabold text-gray-800 mb-1">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-1">SKU: {product.skuCode}</p>
        <p className="text-gray-600 mb-1">Fiyat: {product.price} ₺</p>
        <p className="text-gray-500 text-sm">{product.description}</p>
      </Link>

      <div className="flex flex-col gap-3 mt-4">
        <OrderButton product={product} />
        <DeleteProductButton productId={product.id} />
      </div>
    </div>
  );
}
