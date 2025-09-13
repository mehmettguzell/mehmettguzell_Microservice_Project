import { describe, it, expect } from 'vitest';
import { updateOrder, confirmOrder } from '../../services/orderService';
import {OrderRequest, OrderResponse} from '../../types/index';



describe.skip('Order Service - Update Order', () => {
    it('should update an existing order', async () => {
    const orderId = 5;
    const payload: OrderRequest = {
      skuCode: 'pixel_7',
      price: 2622,            
      quantity: 121,
    };

    const updatedOrder: OrderResponse = await updateOrder(orderId, payload);

    expect(updatedOrder.id).toBe(orderId);
    expect(updatedOrder.skuCode).toBe(payload.skuCode);
    expect(updatedOrder.price).toBe(payload.price);
    expect(updatedOrder.quantity).toBe(payload.quantity);
  });

  it('should confirm an existing order', async () => {
    const orderId = 13;
    const confirmedOrder: OrderResponse = await confirmOrder(orderId);
    expect(confirmedOrder.id).toBe(orderId);
    expect(confirmedOrder.status).toBe('CONFIRMED');
  });

});