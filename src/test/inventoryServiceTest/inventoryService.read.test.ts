import { describe, it, expect } from 'vitest';
import {  getAllInventory, getInventoryBySkuCode, isSkuCodeValid ,isInStock} from '../../services/inventoryService';

describe.skip('Inventory Read', async () => {
    it('should fetch all inventory items', async () => {    
        const inventoryItems = await getAllInventory();
        expect(inventoryItems).toBeInstanceOf(Array);
    });

    it('should fetch inventory by SKU code', async () => {
        const skuCode = 'iphone 15';
        const inventoryItem = await getInventoryBySkuCode(skuCode);
        expect(inventoryItem).toHaveProperty('skuCode', skuCode);
    })
    it('should validate existing SKU code', async () => {
        const skuCode = 'iphone 15';
        const isValid = await isSkuCodeValid(skuCode);
        expect(isValid).toBe(true);
    });
    it('should invalidate non-existing SKU code', async () => {
        const skuCode = 'non-existing-sku';
        const isValid = await isSkuCodeValid(skuCode);
        expect(isValid).toBe(false);
    });

    it('should check if item is in stock', async () => {
        const skuCode = 'iphone 15';
        const quantity = 5;
        const inStock = await isInStock(skuCode, quantity);
        expect(inStock).toBe(true);
    });
});
