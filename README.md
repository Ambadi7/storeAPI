# ShopEasy – React Shopping Cart Application

A clean, responsive shopping cart application built with React 19 and Vite. Users can browse products from a live API, search and filter them, manage a persistent cart, and go through a multi-step checkout process.

---

## Project Overview

ShopEasy is a front-end shopping cart built as a practical learning project. It demonstrates core React patterns including component composition, Context API for shared state, custom hooks, and integration with a third-party REST API using TanStack Query.

The application has three main pages:

- **Products** – Browse, search, and filter products fetched from a live API
- **Cart** – Review selected items, adjust quantities, and see a price summary
- **Checkout** – A three-step flow covering cart review, shipping details, and order confirmation

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI component framework |
| Vite | 6 | Build tool and development server |
| Tailwind CSS | 4 | Utility-first CSS styling |
| React Router | 7 | Client-side page routing |
| TanStack Query | 5 | API data fetching, caching, and loading/error states |
| React Context API | (built-in) | Global cart state management |
| localStorage | (browser API) | Cart persistence across page refreshes |
| Axios | 1 | HTTP client for API requests |

---

## Features Completed

### Product Listing
- Fetches 30 products from the DummyJSON API using TanStack Query
- Displays products in a responsive grid (2 → 5 columns depending on screen size)
- Each card shows: product image, title, category, price, star rating, and an Add to Cart button
- Loading spinner shown while fetching
- Error message with a **Try Again** button if the request fails
- Empty results message when no products match the active filters

### Search and Filters
- **Search by title** – filters results as you type
- **Filter by category** – category list is fetched from the API
- **Filter by price range** – minimum and maximum price inputs
- All filters work together simultaneously
- **Clear Filters** button appears when any filter is active
- Product count displayed (e.g. "12 of 30 products")

### Cart Management
- Add products to the cart from any product card
- Remove individual items from the cart
- Increase or decrease quantity per item
- **Maximum quantity: 5** per product — increase button is disabled at the limit
- **Minimum quantity: 1** — decrease button is disabled at the limit
- Cart item count shown as a badge on the navbar cart icon
- Clear entire cart with one button

### Cart Persistence
- Cart is saved to `localStorage` on every change
- Cart is restored automatically when the page is refreshed
- Corrupt or invalid saved data is handled gracefully (falls back to an empty cart)

### Price Summary
- Subtotal – sum of all item prices × quantities
- Tax – fixed at 5% of the subtotal
- Discount – $0.00 (no coupon system)
- Final Total – subtotal + tax − discount
- Summary shown on both the Cart page and all Checkout steps

### Checkout Flow (3 steps)
1. **Cart Review** – Read-only view of cart items and price summary; link back to cart
2. **Shipping Details** – Form with full name, email, phone, address, city, and postal code
3. **Payment Summary** – Read-only view of shipping info, ordered items, and totals; Place Order button

### Shipping Form Validation
- All six fields are required
- Email must match a valid format (`user@domain.tld`)
- Inline error messages appear below each invalid field
- Form values are preserved if the user navigates back to a previous step
- Cannot advance to the next step until the form passes validation

### Order Placement
- Clicking **Place Order** clears the cart from both React state and localStorage
- A success screen is shown with the customer's name and email
- No real payment gateway is used

---

## API Used

This application uses the **DummyJSON** public REST API. No API key is required.

| Endpoint | Purpose |
|---|---|
| `https://dummyjson.com/products?limit=30` | Fetch 30 products |
| `https://dummyjson.com/products/categories` | Fetch all category names |

API response validation is applied — if the response is missing required fields the application shows a descriptive error rather than crashing.

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Steps

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd web-store

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open your browser and visit **http://localhost:5173**

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Build the application for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## Project Structure

```
web-store/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navbar with cart count badge
│   │   ├── ProductCard.jsx     # Product card with Add to Cart button
│   │   ├── ProductList.jsx     # Responsive product grid with empty state
│   │   ├── SearchFilters.jsx   # Search input, category select, price range
│   │   ├── CartItem.jsx        # Cart row with quantity controls and remove button
│   │   ├── PriceSummary.jsx    # Subtotal, tax, discount, total summary box
│   │   ├── CheckoutSteps.jsx   # Step indicator (Cart Review → Shipping → Summary)
│   │   ├── ShippingForm.jsx    # Shipping form with built-in validation
│   │   └── icons.jsx           # Inline SVG icon components (no icon library needed)
│   ├── context/
│   │   └── CartContext.jsx     # Cart state, actions, and localStorage persistence
│   ├── hooks/
│   │   └── useProductFilters.js  # Custom hook managing search and filter state
│   ├── pages/
│   │   ├── ProductsPage.jsx    # Products listing page
│   │   ├── CartPage.jsx        # Cart management page
│   │   └── CheckoutPage.jsx    # Three-step checkout page
│   ├── services/
│   │   └── productService.js   # Axios API calls with response validation
│   ├── utils/
│   │   └── priceUtils.js       # Price calculation helpers (subtotal, tax, total)
│   ├── App.jsx                 # Route definitions and persistent layout
│   ├── main.jsx                # Entry point with all providers (Router, Query, Cart)
│   └── index.css               # Tailwind CSS directives and base styles
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Known Limitations

- **No real payment processing** – clicking Place Order is a simulation; no payment gateway is integrated
- **No user authentication** – there are no accounts, login, or saved order history
- **DummyJSON is a demo API** – data is public, read-only, and not user-specific
- **Cart quantity capped at 5** – per-product maximum is fixed and cannot be changed by the user
- **Fixed tax rate** – tax is always 5%; there is no tax-by-region logic
- **No coupon or discount system** – the discount line always shows $0.00
- **No pagination** – only the first 30 products from the API are loaded
- **Images depend on external URLs** – if DummyJSON image links break, a placeholder is shown instead