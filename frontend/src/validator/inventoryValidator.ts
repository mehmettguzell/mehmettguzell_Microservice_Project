export function validateInventoryInput(
  skuCode: string,
  quantity: number
): void {
  if (!skuCode || quantity <= 0) {
    throw new Error("SKU Code and Quantity are required.");
  }
  if (skuCode.length < 3 || skuCode.length > 50) {
    throw new Error("SKU Code must be between 3 and 50 characters.");
  }
  if (quantity > 2147483647) {
    throw new Error("Quantity exceeds maximum allowed value.");
  }
}
