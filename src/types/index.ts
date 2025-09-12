export type Product = {
    id: string;
    name: string;
    skuCode: string;
    description?: string;
    price: number;
}

export type Inventory = {
    id: string;
    skuCode: string;
    quantity: number;
}

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export type OrderRequest = {
  orderNumber: string;
  skuCode: string;
  price: string;
  quantity: number;
};

export type OrderResponse = {
  id: number;
  orderNumber: string;
  skuCode: string;
  price: string;
  quantity: number;
  status: OrderStatus;
};