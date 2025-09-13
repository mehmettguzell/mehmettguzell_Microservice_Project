import {fetcher} from '../lib/fetcher';
import {OrderRequest, OrderResponse, OrderStatus} from '../types/index';

const BASE = process.env.ORDER_SERVICE_URL;

export const createOrder = (order: OrderRequest) => fetcher<OrderRequest>(`${BASE}`, {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getAllOrders = () => fetcher<OrderResponse[]>(`${BASE}/all`, {cache:'no-store'});

export const getOrderById = (id: number) => fetcher<OrderResponse>(`${BASE}/${id}`, {cache:'no-store'});

export const updateOrder = (id: number, order: OrderRequest) =>
  fetcher<OrderResponse>(`${BASE}/update/${id}`, { 
    cache: 'no-store',
    method: 'PUT',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const confirmOrder = (id: number) => fetcher<OrderResponse>(`${BASE}/confirm/${id}`, {
    cache: 'no-store',
    method: 'PATCH',
  });

export const cancelOrder = (id: number) => fetcher<{ message: string }>(`${BASE}?id=${id}`, {
    cache: 'no-store',
    method: 'DELETE',
  });