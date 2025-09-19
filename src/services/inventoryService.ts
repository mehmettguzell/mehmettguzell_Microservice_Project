import { fetcher } from "../lib/fetcher";
import { Inventory } from "@/types/Inventory";
import { ApiResponse, ApiErrorData } from "@/types/ApiResponse";

const BASE = "http://localhost:9000/api/inventory";

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

export const addInventory = (inventory: Omit<Inventory, "id">) =>
  handleResponse(
    fetcher<ApiResponse<Inventory>>(BASE, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(inventory),
      headers: { "Content-Type": "application/json" },
    })
  );

export const getAllInventory = () =>
  handleResponse(
    fetcher<ApiResponse<Inventory[]>>(`${BASE}/all`, { cache: "no-store" })
  );

export const getInventoryBySkuCode = (skuCode: string) =>
  handleResponse(
    fetcher<ApiResponse<Inventory>>(`${BASE}/${skuCode}`, { cache: "no-store" })
  );

export const isSkuCodeValid = (skuCode: string) =>
  handleResponse(
    fetcher<ApiResponse<boolean>>(`${BASE}/validate?skuCode=${skuCode}`, {
      cache: "no-store",
    })
  );

export const isInStock = (skuCode: string, quantity: number) =>
  handleResponse(
    fetcher<ApiResponse<boolean>>(
      `${BASE}/validate?skuCode=${skuCode}&quantity=${quantity}`,
      { cache: "no-store" }
    )
  );

export const addStock = (id: string, quantity: number) =>
  handleResponse(
    fetcher<ApiResponse<Inventory>>(`${BASE}/addStock/${id}`, {
      cache: "no-store",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    })
  );

export const setQuantityZeroBySkuCode = (skuCode: string) =>
  handleResponse(
    fetcher<ApiResponse<Inventory>>(`${BASE}?skuCode=${skuCode}`, {
      cache: "no-store",
      method: "DELETE",
    })
  );

export const setQuantityZeroById = (id: string) =>
  handleResponse(
    fetcher<ApiResponse<Inventory>>(`${BASE}?id=${id}`, {
      cache: "no-store",
      method: "DELETE",
    })
  );
