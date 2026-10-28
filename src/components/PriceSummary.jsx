import { getPriceSummary, formatPrice, TAX_RATE } from "../utils/priceUtils";

export default function PriceSummary({ cartItems }) {
  const { subtotal, tax, discount, total } = getPriceSummary(cartItems);

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-2">
      <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
        <span>{formatPrice(tax)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Discount</span>
        <span>-{formatPrice(discount)}</span>
      </div>

      <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-gray-900">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
