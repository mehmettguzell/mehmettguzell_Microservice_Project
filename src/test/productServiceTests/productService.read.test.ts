import { describe, it, expect } from 'vitest';
import { getAllProducts, getProductById, searchProductsByName, createProduct, deleteProduct } from '../../services/productService';


describe.skip('ProductService', () => {
  
  it('should fetch all products', async () => {
    const products = await getAllProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("should fetch a product by ID", async () => {
    const existingProductId = "68c35fac015067e3777e8a7b";
    const product = await getProductById(existingProductId);

    expect(product).toHaveProperty('id', existingProductId);
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('skuCode');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('price');
  }); 

  it("should return error for non-existing product ID", async () => {
    try {
      await getProductById("non-existing-id");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should search products by name", async () => {
    const searchTerm = "memo";
    const products = await searchProductsByName(searchTerm);

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    products.forEach(product => {
      expect(product.name).toContain(searchTerm);
    });
  });

  });
