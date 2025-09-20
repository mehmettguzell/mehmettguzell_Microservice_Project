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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductBarWrapper products={products} />
    </div>
  );
}
