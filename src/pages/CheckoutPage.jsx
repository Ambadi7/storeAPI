import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutSteps from "../components/CheckoutSteps";
import PriceSummary from "../components/PriceSummary";
import ShippingForm from "../components/ShippingForm";
import CartItem from "../components/CartItem";
import { formatPrice, getPriceSummary } from "../utils/priceUtils";

const EMPTY_SHIPPING = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(EMPTY_SHIPPING);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect to cart if empty and no order placed
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 text-sm mb-6">Add products before checking out.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Order Placed!</h1>
        <p className="text-gray-600 mb-1">
          Thank you, <strong>{shippingData.fullName}</strong>!
        </p>
        <p className="text-gray-500 text-sm mb-8">
          A confirmation has been sent to <strong>{shippingData.email}</strong>.
        </p>
        <Link
          to="/"
          id="continue-after-order-btn"
          className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const { subtotal, tax, discount, total } = getPriceSummary(cartItems);

  function handlePlaceOrder() {
    clearCart();
    setOrderPlaced(true);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">Checkout</h1>

      <CheckoutSteps currentStep={currentStep} />

      {/* Step 1: Cart Review */}
      {currentStep === 1 && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Review Your Cart</h2>
          <div className="bg-white rounded-lg border border-gray-200 px-4 mb-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <PriceSummary cartItems={cartItems} />

          <div className="flex gap-3 mt-6">
            <Link
              to="/cart"
              className="flex-1 border border-gray-300 text-gray-700 text-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Cart
            </Link>
            <button
              id="step1-next-btn"
              onClick={() => setCurrentStep(2)}
              className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Shipping
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Shipping Details */}
      {currentStep === 2 && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Shipping Details</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <ShippingForm
              initialValues={shippingData}
              onSubmit={(data) => {
                setShippingData(data);
                setCurrentStep(3);
              }}
              onBack={() => setCurrentStep(1)}
            />
          </div>
        </div>
      )}

      {/* Step 3: Payment Summary */}
      {currentStep === 3 && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Payment Summary</h2>

          {/* Shipping Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Shipping To</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>{shippingData.fullName}</strong></p>
              <p>{shippingData.email} · {shippingData.phone}</p>
              <p>{shippingData.address}</p>
              <p>{shippingData.city}, {shippingData.postalCode}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Items</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-700">
                  <span className="truncate flex-grow pr-4">
                    {item.title}{" "}
                    <span className="text-gray-400">×{item.quantity}</span>
                  </span>
                  <span className="flex-shrink-0 font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Tax (5%)</span>
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

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              id="place-order-btn"
              onClick={handlePlaceOrder}
              className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
