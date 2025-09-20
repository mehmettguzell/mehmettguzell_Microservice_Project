import {} from "react";
import { getProductById } from "@/services/productService";
import ProductIdCard from "@/components/product/ProductIdCard";
import { getInventoryBySkuCode } from "@/services/inventoryService";
import DeleteProductButton from "@/components/product/DeleteProductButton";
import { toast } from "react-hot-toast";
import { Product } from "@/types/Product";
import { ApiErrorData } from "@/types/ApiResponse";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function ProductIdPage({ params }: Props) {
  const { id: productId } = await params;

  let product: Product | ApiErrorData;
  try {
    product = await getProductById(productId);
  } catch (err) {
    notFound();
    return;
  }

  const inventory = await getInventoryBySkuCode(product.skuCode);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Product : {product.name}</h1>
      <ProductIdCard product={product} inventory={inventory} />
      <DeleteProductButton productId={productId} />
    </div>
  );
}
