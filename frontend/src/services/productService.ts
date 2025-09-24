import { fetcher } from "../lib/fetcher";
import { Product } from "../types/Product";
import { ApiResponse, ApiErrorData } from "@/types/ApiResponse";

const BASE = "http://localhost:9000/api/product";

async function handleResponse<T>(promise: Promise<ApiResponse<T>>): Promise<T> {
  const response = await promise;

  if (!response.success) {
    const errorMessage =
      typeof response.data === "object" &&
      response.data !== null &&
      "message" in response.data
        ? (response.data as any).message
        : "Unknown error";

    throw new Error(errorMessage);
  }

  return response.data;
}

export const createProduct = (product: Omit<Product, "id">) =>
  handleResponse(
    fetcher<ApiResponse<Product>>(`${BASE}`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const getAllProducts = () =>
  handleResponse(
    fetcher<ApiResponse<Product[]>>(`${BASE}/all`, { cache: "no-store" })
  );

export const getProductById = (id: string) =>
  handleResponse(
    fetcher<ApiResponse<Product>>(`${BASE}/${id}`, { cache: "no-store" })
  );

export const searchProductsByName = (name: string) =>
  handleResponse(
    fetcher<ApiResponse<Product[]>>(`${BASE}/search?name=${name}`, {
      cache: "no-store",
    })
  );

export const updateProduct = (
  id: string,
  product: Partial<Omit<Product, "id">>
) =>
  handleResponse(
    fetcher<ApiResponse<Product>>(`${BASE}/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const deleteProduct = (id: string) =>
  handleResponse(
    fetcher<ApiResponse<{ message: string }>>(`${BASE}?id=${id}`, {
      cache: "no-store",
      method: "DELETE",
    })
  );
