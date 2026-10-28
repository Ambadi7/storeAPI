export const TAX_RATE = 0.05;
export const DISCOUNT = 0;

export function calculateSubtotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateTax(subtotal) {
  return subtotal * TAX_RATE;
}

export function calculateTotal(subtotal, tax, discount = DISCOUNT) {
  return subtotal + tax - discount;
}

export function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

export function getPriceSummary(cartItems) {
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const discount = DISCOUNT;
  const total = calculateTotal(subtotal, tax, discount);
  return { subtotal, tax, discount, total };
}
