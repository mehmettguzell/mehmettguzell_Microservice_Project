import { describe, it, expect } from 'vitest';
import { getAllProducts } from '../services/productService';


describe('ProductService', () => {
  it('should fetch all products', async () => {
    const products = await getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });
});
