import { describe, it, expect } from 'vitest';
import { addStock } from '../../services/inventoryService';

describe.skip('Inventory Update', () => {
  it('should add stock to an existing inventory item', async () => {  
    const quantity = 5;
    const updatedItem = await addStock(1, quantity);
    expect(updatedItem).toHaveProperty('skuCode'); 
    expect(updatedItem).toHaveProperty("quantity"); 
  });
});
