export type InventoryCheck = { available: boolean };

export type ApiResponseData = Inventory | InventoryCheck;

export interface ApiErrorData {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
}

export type ApiResponse<T = ApiResponseData> =
  | { success: true; message: string; data: T }
  | { success: false; message: string; data: ApiErrorData };

export type Product = {
  id: string;
  name: string;
  skuCode: string;
  description?: string;
  price: number;
};

export type Inventory = {
  id: string;
  skuCode: string;
  quantity: number;
};

export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type OrderRequest = {
  skuCode: string;
  price: number;
  quantity: number;
};

export type OrderResponse = {
  id: number;
  orderNumber: string;
  skuCode: string;
  price: number;
  quantity: number;
  status: OrderStatus;
};
