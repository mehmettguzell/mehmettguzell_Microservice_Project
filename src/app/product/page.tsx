import { getAllProducts } from "@/services/productService";
import ProductBarWrapper from "@/productComponents/ProductBarWrapper";
import { Product } from "@/types/Product";

export default async function ProductPage() {
  let error = "";
  let products: Product[] = [];

  try {
    products = await getAllProducts();
  } catch (e) {
    error = "Ürünler yüklenirken bir hata oluştu.";
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ProductBarWrapper products={products} />
      )}
    </div>
  );
}
