import { useCart } from "../context/CartContext";
import { StarIcon } from "./icons";
import { formatPrice } from "../utils/priceUtils";

export default function ProductCard({ product }) {
  const { addToCart, cartItems, MAX_QUANTITY } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const inCart = !!cartItem;
  const atMax = cartItem?.quantity >= MAX_QUANTITY;

  const rating = typeof product.rating === "object" ? product.rating.rate : product.rating;
  const imageUrl = product.images?.[0] || product.thumbnail;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      {/* Product Image */}
      <div className="h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://placehold.co/200x200?text=No+Image";
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow gap-2">
        {/* Category */}
        <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-grow">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-600">{Number(rating).toFixed(1)}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-base font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={() => addToCart(product)}
            disabled={atMax}
            className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
              atMax
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : inCart
                ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {atMax ? "Max qty" : inCart ? "Add more" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
