import { describe, it, expect } from 'vitest';
import { addInventory } from '../../services/inventoryService';
import {Inventory} from '../../types/index';

describe.skip('addInventory', () => {
  it('should create a new inventory item', async () => {
    const newInventory: Omit<Inventory, 'id'> = {
        skuCode: 'Test Item',
        quantity: 10
    };
    const createdInventory = await addInventory(newInventory);
    expect(createdInventory).toHaveProperty('id');
    expect(createdInventory.skuCode).toBe(newInventory.skuCode);
    expect(createdInventory.quantity).toBe(newInventory.quantity);
  });
});