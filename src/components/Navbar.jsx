import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon } from "./icons";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / App Name */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            ShopEasy
          </Link>

          {/* Cart Link */}
          <Link
            to="/cart"
            id="nav-cart-link"
            className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            {totalItems > 0 && (
              <span
                id="cart-count-badge"
                className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
