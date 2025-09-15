export type ApiResponse<T = ApiResponseData> =
  | { success: true; message: string; data: T }
  | { success: false; message: string; data: ApiErrorData };

export interface ApiErrorData {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
}

export type ApiResponseData = Inventory | InventoryBoolean;

export type Inventory = {
  id: string;
  skuCode: string;
  quantity: number;
};

export type InventoryBoolean = { available: boolean };
