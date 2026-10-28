import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "cart_items";
const MAX_QUANTITY = 5;
const MIN_QUANTITY = 1;

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    // Basic validation: must be an array of objects with id and quantity
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) => item && typeof item.id === "number" && typeof item.quantity === "number"
    );
  } catch {
    return [];
  }
}

function saveCartToStorage(cartItems) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Increase quantity if already in cart (up to max)
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function increaseQty(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
          : item
      )
    );
  }

  function decreaseQty(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, MIN_QUANTITY) }
          : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        MAX_QUANTITY,
        MIN_QUANTITY,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
