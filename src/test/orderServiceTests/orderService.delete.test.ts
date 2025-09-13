import { describe, it, expect } from 'vitest';
import { cancelOrder } from '../../services/orderService';

describe.skip('Order Service - Delete Order', () => {
  it('should delete an existing order', async () => {
    const orderId = 13;
    const response = await cancelOrder(orderId);
    expect(response.message).toBe("Order with id " + orderId + " Canceled successfully");
  });
});