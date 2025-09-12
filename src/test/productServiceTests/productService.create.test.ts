import { describe, it, expect } from 'vitest';
import { createProduct, deleteProduct } from '../../services/productService';


describe.skip('ProductService', () => {

    it("should create a new product", async () => {
      const validSkuCode = "iphone 15";
      const newProduct = {
        name: "Test Product",
        skuCode: validSkuCode,
        description: "This is a test product",
        price: 99.99
      };
      const createdProduct = await createProduct(newProduct);
      expect(createdProduct).toHaveProperty('id');
      expect(createdProduct).toHaveProperty('name', newProduct.name);
      expect(createdProduct).toHaveProperty('skuCode', newProduct.skuCode);
      expect(createdProduct).toHaveProperty('description', newProduct.description);
      expect(createdProduct).toHaveProperty('price', newProduct.price);
      await deleteProduct(createdProduct.id); // Clean up after test
    });

    it("should fail to create a product with invalid SKU code", async () => {
      const invalidSkuCode = "invalid sku!";
      const newProduct = {
        name: "Invalid SKU Product",
        skuCode: invalidSkuCode,
        description: "This product has an invalid SKU code",
        price: 49.99
      };  
      try {
        await createProduct(newProduct);
      } catch (error) {
        expect(error).toBeDefined();
      }});

      it("should fail to create a product with missing fields", async () => { 
        const newProduct = {
          name: "Missing Fields Product",
          skuCode: "iphone 15" ,
          price: 49.99
        } as any;
        try {
          await createProduct(newProduct);
        } catch (error) {
          expect(error).toBeDefined();
        }
    });

  });
