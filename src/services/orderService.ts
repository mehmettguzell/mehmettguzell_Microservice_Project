import { ApiResponse } from "@/types/ApiResponse";
import { fetcher } from "../lib/fetcher";
import { OrderRequest, OrderResponse, OrderStatus } from "../types/index";

const BASE = "http://localhost:9000/api/order";

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

export const createOrder = (order: OrderRequest) =>
  handleResponse(
    fetcher<ApiResponse<OrderResponse>>(`${BASE}`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const getAllOrders = () =>
  handleResponse(
    fetcher<ApiResponse<OrderResponse[]>>(`${BASE}/all`, { cache: "no-store" })
  );

export const getOrderById = (id: number) =>
  handleResponse(
    fetcher<ApiResponse<OrderResponse>>(`${BASE}/${id}`, { cache: "no-store" })
  );

export const updateOrder = (id: number, order: OrderRequest) =>
  handleResponse(
    fetcher<ApiResponse<OrderResponse>>(`${BASE}/update/${id}`, {
      cache: "no-store",
      method: "PUT",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const confirmOrder = (id: number) =>
  handleResponse(
    fetcher<ApiResponse<OrderResponse>>(`${BASE}/confirm/${id}`, {
      cache: "no-store",
      method: "PATCH",
    })
  );

export const cancelOrder = (id: number) =>
  handleResponse<{ message: string }>(
    fetcher<ApiResponse<{ message: string }>>(`${BASE}?id=${id}`, {
      cache: "no-store",
      method: "DELETE",
    })
  );
