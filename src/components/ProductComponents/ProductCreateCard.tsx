"use client";
import React, { startTransition, useState } from "react";
import { Product } from "@/types/Product";
import { createProduct } from "@/services/productService";
import { isSkuCodeValid } from "@/services/inventoryService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clear } from "console";

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
    } catch (err) {
      handleError(err);
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

  const handleError = (err: any) => {
    toast.error(err.message);
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
      className="border p-4 rounded shadow space-y-3 max-w-md"
    >
      <h3 className="text-xl font-bold">Create New Product</h3>

      <div>
        <label className="block font-medium">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">SKU Code:</label>
        <input
          type="text"
          value={skuCode}
          onChange={(e) => setSkuCode(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Product
      </button>
    </form>
  );
}
