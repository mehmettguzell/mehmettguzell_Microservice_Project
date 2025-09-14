import { describe, it, expect } from 'vitest';
import {updateProduct } from '../../services/productService';


describe.skip('ProductService', () => {
  it("should update an existing product", async () => {
    const productId = "68c3627122647a3e38deeb66";
    const updatedProduct = {
      name: "Updated Product",
      skuCode: "iphone 15",
      description: "This product has been updated",
      price: 89.99
    };
    const response = await updateProduct(productId, updatedProduct);
    expect(response).toHaveProperty('id', productId);
    expect(response).toHaveProperty('name', updatedProduct.name);
    expect(response).toHaveProperty('skuCode', updatedProduct.skuCode);
    expect(response).toHaveProperty('description', updatedProduct.description);
    expect(response).toHaveProperty('price', updatedProduct.price);
  });
});
