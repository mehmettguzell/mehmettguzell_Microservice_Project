"use client";

import React, { useState } from "react";
import { Product } from "@/types/Product";
import { createProduct } from "@/services/productService";
import { isSkuCodeValid } from "@/services/inventoryService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductCreateCard({ setProducts }: Props) {
  const [name, setName] = useState("");
  const [skuCode, setSkuCode] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProductData: Omit<Product, "id"> = {
      name,
      skuCode,
      price: parseFloat(price),
      description,
    };

    if (!(await validateSkuCode())) return;

    try {
      const response = await createProduct(newProductData);
      handleCreationSuccess(response);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const validateSkuCode = async () => {
    const valid = await isSkuCodeValid(skuCode);
    if (!valid) toast.error("SKU Code not in inventory");
    return valid;
  };

  const handleCreationSuccess = (product: Product) => {
    clearForm();
    toast.success(`Product created! ID: ${product.id}`);
    router.refresh();
  };

  const clearForm = () => {
    setName("");
    setSkuCode("");
    setPrice("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 rounded-3xl bg-white/50 backdrop-blur-md shadow-2xl border border-gray-200 space-y-5 transition-shadow duration-300 hover:shadow-3xl"
    >
      <h3 className="text-2xl font-extrabold text-gray-800 text-center">
        Create New Product
      </h3>

      <div>
        <label className="block font-medium text-gray-700 mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-2xl border border-gray-300 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          SKU Code:
        </label>
        <input
          type="text"
          value={skuCode}
          onChange={(e) => setSkuCode(e.target.value)}
          className="w-full p-3 rounded-2xl border border-gray-300 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded-2xl border border-gray-300 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-2xl border border-gray-300 text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Create Product
      </button>
    </form>
  );
}
