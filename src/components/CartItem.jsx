import { useCart } from "../context/CartContext";
import { TrashIcon } from "./icons";
import { formatPrice } from "../utils/priceUtils";

export default function CartItem({ item }) {
  const { removeFromCart, increaseQty, decreaseQty, MAX_QUANTITY, MIN_QUANTITY } = useCart();

  const imageUrl = item.images?.[0] || item.thumbnail;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-0">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
        <img
          src={imageUrl}
          alt={item.title}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/80x80?text=N/A";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{formatPrice(item.price)} each</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            id={`decrease-qty-${item.id}`}
            onClick={() => decreaseQty(item.id)}
            disabled={item.quantity <= MIN_QUANTITY}
            className="w-7 h-7 rounded border border-gray-300 text-gray-700 flex items-center justify-center text-sm font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            −
          </button>
          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
          <button
            id={`increase-qty-${item.id}`}
            onClick={() => increaseQty(item.id)}
            disabled={item.quantity >= MAX_QUANTITY}
            className="w-7 h-7 rounded border border-gray-300 text-gray-700 flex items-center justify-center text-sm font-bold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Right side: item total + remove */}
      <div className="flex flex-col items-end justify-between flex-shrink-0">
        <span className="text-sm font-bold text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </span>
        <button
          id={`remove-item-${item.id}`}
          onClick={() => removeFromCart(item.id)}
          className="text-red-400 hover:text-red-600 transition-colors"
          aria-label={`Remove ${item.title}`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
