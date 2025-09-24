import { getAllProducts } from "@/services/productService";
import ProductBarWrapper from "@/productComponents/ProductBarWrapper";
import { Product } from "@/types/Product";
import toast from "react-hot-toast";

export default async function ProductPage() {
  let products: Product[] = [];

  try {
    products = await getAllProducts();
  } catch (e) {
    toast.error("Failed to load products.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr  from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-12 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 drop-shadow-lg">
        Products
      </h1>

      <div className="w-full max-w-6xl space-y-10">
        <ProductBarWrapper products={products} />
      </div>
    </div>
  );
}
