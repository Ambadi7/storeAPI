import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import PriceSummary from "../components/PriceSummary";

export default function CartPage() {
  const { cartItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 text-sm mb-6">
          Add some products to get started.
        </p>
        <Link
          to="/"
          id="continue-shopping-empty"
          className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          id="clear-cart-btn"
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 px-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Price Summary + Actions */}
        <div className="mt-6 lg:mt-0 space-y-4">
          <PriceSummary cartItems={cartItems} />

          <Link
            to="/checkout"
            id="proceed-to-checkout-btn"
            className="block w-full bg-blue-600 text-white text-center px-4 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            id="continue-shopping-btn"
            className="block w-full border border-gray-300 text-gray-700 text-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
