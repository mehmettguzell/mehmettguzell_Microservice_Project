import { describe, it, expect } from 'vitest';
import { getAllOrders, getOrderById } from '../../services/orderService';
import {OrderRequest, OrderResponse, OrderStatus} from '../../types/index';

describe.skip('Order Read', () => {
  it('should fetch all orders', async () => {   
    const orders = await getAllOrders();
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBeGreaterThan(0);
  });

  it('should fetch an order by id', async () => {
    const orderId = 5;
    const order = await getOrderById(orderId);
    expect(order).toHaveProperty('id', orderId);
    expect(order).toHaveProperty('orderNumber');
    expect(order).toHaveProperty('skuCode', order.skuCode);
    expect(order).toHaveProperty('price', order.price);
    expect(order).toHaveProperty('quantity', order.quantity);
    expect(order).toHaveProperty('status');
  });  
});