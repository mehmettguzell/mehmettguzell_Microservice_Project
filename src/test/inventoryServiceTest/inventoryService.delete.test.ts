import { describe, it, expect } from 'vitest';
import { setQuantityZeroById, setQuantityZeroBySkuCode } from '../../services/inventoryService';

describe.skip('Inventory Delete', () => {
    it('should set quantity to zero for an existing inventory item by skuCode', async () => {   
        const skuCode = 'iphone 15';
        const updatedItem = await setQuantityZeroBySkuCode(skuCode);
        expect(updatedItem).toHaveProperty('message','Inventory quantity set 0 for : ' + skuCode);
        });

    it('should set quantity to zero for an existing inventory item by id', async () => {   
        const id = 1;
        const skuCode = 'iphone 15';
        const updatedItem = await setQuantityZeroById(id);
        expect(updatedItem).toHaveProperty('message','Inventory quantity set 0 for : ' + skuCode);
    });
});
