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
