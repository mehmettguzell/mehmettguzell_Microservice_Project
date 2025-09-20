import { getProductById } from "@/services/productService";
import ProductIdCard from "@/components/product/ProductIdCard";
import { getInventoryBySkuCode } from "@/services/inventoryService";
import DeleteProductButton from "@/components/product/DeleteProductButton";
import { Product } from "@/types/Product";
import { ApiErrorData } from "@/types/ApiResponse";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function ProductIdPage({ params }: Props) {
  const { id: productId } = params;

  let product: Product | ApiErrorData;
  try {
    product = await getProductById(productId);
  } catch (err) {
    notFound();
  }

  const inventory = await getInventoryBySkuCode(product.skuCode);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-12 flex flex-col items-center space-y-8">
      <h1
        className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text
                     bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400 drop-shadow-lg"
      >
        Product: {product.name}
      </h1>

      <ProductIdCard product={product} inventory={inventory} />

      <DeleteProductButton productId={productId} />
    </div>
  );
}
