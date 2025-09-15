import { get } from "http";
import { fetcher } from "../lib/fetcher";
import { ApiResponse, Inventory } from "../types";

const BASE = "http://localhost:9000/api/inventory";

export const addInventory = (Inventory: Omit<Inventory, "id">) =>
  fetcher<Inventory>(`${BASE}`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(Inventory),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getAllInventory = async () => {
  const response = await fetcher<ApiResponse<Inventory[]>>(`${BASE}/all`, {
    cache: "no-store",
  });
  return response.data;
};

export const getInventoryBySkuCode = (skuCode: string) =>
  fetcher<ApiResponse<Inventory>>(`${BASE}/${skuCode}`, { cache: "no-store" });

export const isSkuCodeValid = (skuCode: string) =>
  fetcher<ApiResponse<boolean>>(`${BASE}/validate?skuCode=${skuCode}`, {
    cache: "no-store",
  });

export const isInStock = (skuCode: string, quantity: number) =>
  fetcher<ApiResponse<boolean>>(
    `${BASE}/validate?skuCode=${skuCode}&quantity=${quantity}`,
    {
      cache: "no-store",
    }
  );

export const addStock = (id: string, quantity: number) =>
  fetcher<ApiResponse<Inventory>>(`${BASE}/addStock/${id}`, {
    cache: "no-store",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

export const setQuantityZeroBySkuCode = (skuCode: string) =>
  fetcher<ApiResponse<Inventory>>(`${BASE}?skuCode=${skuCode}`, {
    cache: "no-store",
    method: "DELETE",
  });

export const setQuantityZeroById = (id: string) =>
  fetcher<ApiResponse<Inventory>>(`${BASE}?id=${id}`, {
    cache: "no-store",
    method: "DELETE",
  });
