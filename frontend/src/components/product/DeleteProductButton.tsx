"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/services/productService";
import toast from "react-hot-toast";

interface Props {
  productId: string;
}

export default function DeleteProductButton({ productId }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(productId);
      toast.success("Deleted: " + productId);
      router.push("/product");
    } catch (e: any) {
      toast.error(e.message);
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-2 px-5 py-2 flex items-center gap-2 text-red-600 font-semibold rounded-2xl border-2 border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg active:scale-95 transition-all duration-200"
    >
      <Trash2 size={16} />
      Delete Product
    </button>
  );
}
