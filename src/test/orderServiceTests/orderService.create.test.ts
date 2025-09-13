import { describe, it, expect } from 'vitest';
import { createOrder } from '../../services/orderService';
import {OrderRequest} from '../../types/index';

describe.skip('Order Create', () => {
  it('should create a new order', async () => {   
    const newOrderRequest: OrderRequest = { 
        skuCode: 'pixel_7',
        price: 1000,
        quantity: 1
    };
    
    const newOrder = await createOrder(newOrderRequest);

    expect(newOrder).toHaveProperty('id');
    expect(newOrder).toHaveProperty('orderNumber');
    expect(newOrder).toHaveProperty('skuCode', newOrderRequest.skuCode);
    expect(newOrder).toHaveProperty('price', newOrderRequest.price);
    expect(newOrder).toHaveProperty('quantity', newOrderRequest.quantity);
    expect(newOrder).toHaveProperty('status', 'PENDING');
  });
});
