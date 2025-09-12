import { describe, it, expect } from 'vitest';
import { getAllProducts, getProductById, searchProductsByName, createProduct, deleteProduct } from '../../services/productService';

  describe.skip('Delete Product', () => {
    it("should delete a product by ID", async () => {
      const productToDelete = {
        name: "Product to Delete",
        skuCode: "iphone 15",
        description: "This product will be deleted",
        price: 19.99
      };
      const createdProduct = await createProduct(productToDelete);
      const response = await deleteProduct(createdProduct.id);
      expect(response).toHaveProperty('message', 'Product Deleted: ' + createdProduct.id);
      try {
        await getProductById(createdProduct.id);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
