# Shopping Cart Application Documentation

## Overview

This project is a React + Vite shopping cart application built to satisfy the assignment requirements for:
- React Router
- React Context API
- `useEffect` hooks
- external API data fetching
- Local Storage persistence
- shared layout components and reusable UI

The final app includes a landing page, a products page with dynamic API data, cart state shared across pages, and a global cart persisted in Local Storage.

---

## Assignment requirements and implementation

### 1. Shared reusable component displayed on every page

Requirement:
- Create a reusable component that appears on every page.

Implementation:
- `src/Components/Navbar.jsx` is rendered inside `src/Layouts/Layout.jsx`.
- `Layout.jsx` wraps all routes via `Outlet`, so the Navbar appears on every page.
- The Navbar includes navigation links and a cart icon with a badge.

### 2. Navbar must include navigation links, icon, and cart badge

Requirement:
- Navbar must include navigation links.
- Navbar must include a cart icon.
- Cart badge should show the current number of items in the cart.
- Cart count should update automatically when products are added or changed.

Implementation:
- `Navbar.jsx` displays links to `/`, `/products`, `/about`, and `/contact`.
- `CartIcon` component renders the shopping cart icon.
- The badge value is received from `Layout.jsx` as `cartCount`.
- `cartCount` comes from global `CartContext` and updates automatically when cart state changes.

### 3. Landing page for the company

Requirement:
- Create a home page with branding, welcome message, and description.
- No shopping functionality is required on this page.

Implementation:
- `src/Pages/Home.jsx` is the landing page.
- It includes a hero section, call-to-action buttons, and feature cards.
- It does not require cart actions or product listing.

### 4. Products page with data fetched from an external API

Requirement:
- Products should not be hardcoded.
- Fetch products with `useEffect`.
- Display product image, name, price, and Add to Cart button.
- Show loading state and handle API errors.

Implementation:
- `src/Pages/Products.jsx` renders `src/Components/ProductList.jsx`.
- `ProductList.jsx` uses `axios` and `useEffect` to fetch `https://dummyjson.com/products`.
- It shows a loading message while fetching.
- It handles errors and falls back to a small local product list.
- Each product uses `ProductCard.jsx` to display image, title, price, and Add to Cart button.

### 5. Global cart state with React Context

Requirement:
- Use Context API for cart state.
- Store all cart items and quantities.
- Expose functions such as Add to Cart.
- Avoid prop drilling.

Implementation:
- `src/context/CartContext.jsx` defines `CartContext` and `CartProvider`.
- `CartProvider` holds cart items and actions in state.
- `useCart()` is a custom hook for any component to access cart state.
- `Layout.jsx`, `Products.jsx`, and components use this context.

### 6. Add product to cart and manage quantity

Requirement:
- Add products to the cart.
- If a product is already in the cart, increase quantity rather than duplicate.
- Maintain quantity for each item.
- Navbar cart count should reflect all quantities.

Implementation:
- `CartContext.jsx` implements `addToCart(product)`.
- If the product already exists, it increments `qty`.
- `changeQty(id, delta)` updates the quantity and removes items if quantity drops to zero.
- `cartCount` sums all item quantities.

### 7. Cart persistence using Local Storage

Requirement:
- Save cart data to `localStorage` whenever the cart changes.
- Load cart data from `localStorage` on app start.
- Keep Context and Local Storage synchronized.

Implementation:
- `CartContext.jsx` loads saved cart from `localStorage` on initialization.
- A `useEffect` syncs the `cart` state to `localStorage` after every change.
- The cart remains persistent across browser refreshes.

### 8. Routing with React Router

Requirement:
- Use React Router for navigation.
- Routes: `/`, `/products`, and additional pages.
- Shared layout with Navbar.

Implementation:
- `src/App.jsx` configures `createBrowserRouter`.
- Routes are nested under `Layout.jsx`.
- `Layout.jsx` renders `Navbar` and a shared cart modal.
- Additional pages: `/about`, `/contact`, and `*` for 404.

---

## Component documentation

### `src/main.jsx`

Purpose:
- Application entry point.
- Wraps the app with `CartProvider` so cart state is global.

Key details:
- Imports `CartProvider` from `src/context/CartContext.jsx`.
- Uses `React.StrictMode` for development safety.
- Ensures context is available to all components.

### `src/context/CartContext.jsx`

Purpose:
- Provide global cart state and actions to the entire app.
- Persist cart data in Local Storage.

Main functions:
- `loadCart()` reads from `localStorage`.
- `CartProvider` initializes `cart` state from stored JSON.
- `useEffect()` writes `cart` into `localStorage` when `cart` changes.
- `addToCart(product)` adds a new cart item or increases quantity.
- `changeQty(id, delta)` adjusts product quantities and removes items with zero quantity.
- `removeFromCart(id)` deletes a cart item.
- `cartCount` computes the total quantity across all cart items.

Why Context is used:
- Cart state is shared across pages and components.
- Without Context, the cart would need to be passed down through props from top-level components.
- Context avoids prop drilling and keeps the cart state centralized.

### `src/App.jsx`

Purpose:
- Defines page routes and shared layout.

Key routes:
- `/` → `Home`
- `/products` → `Products`
- `/about` → `About`
- `/contact` → `Contact`
- `*` → `NotFound`

Notes:
- `Layout.jsx` is the parent route, so Navbar and cart modal appear on every page.
- This matches the assignment requirement for shared layout navigation.

### `src/Layouts/Layout.jsx`

Purpose:
- Shared page layout component.
- Renders `Navbar`, page content via `Outlet`, and `CartModal`.

What changed from props/state to context:
- Previously, `Layout.jsx` stored cart state locally with `useState`.
- The old app passed `addToCart` through Outlet context to child pages.
- Now `Layout.jsx` uses `useCart()` to read `cart`, `cartCount`, and actions from global context.
- Local cart state was removed from `Layout.jsx`.

Why this is better:
- `CartContext` is the single source of truth for cart behavior.
- The layout no longer duplicates cart logic.
- All pages can access cart data without manual prop passing.

### `src/Components/Navbar.jsx`

Purpose:
- Navigation bar shown on every page.
- Displays links and cart badge.

Important props:
- `cartCount`: number of items in the cart.
- `onCartClick`: opens the cart modal.

Why props are still used here:
- `Navbar` is a presentational component and should receive only the data it needs.
- `Layout.jsx` holds the event handler and passes it down.
- This is the correct use of props for reusable components.

### `src/Pages/Home.jsx`

Purpose:
- Landing page for the shopping site.
- No shopping functionality required.

Contents:
- Hero message, brand description, and navigation buttons.
- Feature cards describing the app’s strengths.

Note:
- The Home page does not need cart access.
- It is separated from the shopping flow.

### `src/Pages/Products.jsx`

Purpose:
- Products page that lists items fetched from the API.

Behavior:
- Uses `useCart()` to get `addToCart`.
- Passes `addToCart` as a prop to `ProductList`.

Why passing `addToCart` as a prop is fine:
- `ProductList` is reusable and only needs the callback.
- It does not need to know the cart implementation details.
- This keeps the component flexible and decoupled.

### `src/Components/ProductList.jsx`

Purpose:
- Fetch products from the external API.
- Render product search, loading, error states, and product grid.

Key features:
- Uses `useState` for `products`, `searchTerm`, `loading`, `error`, and modal visibility.
- Uses `useEffect` to fetch products when `searchTerm` changes.
- Shows a fallback product list if the API request fails.
- Renders `ProductCard` for each product.

Important note:
- This component does not manage cart state.
- It receives `onAddToCart` as a prop.
- That separation keeps fetching logic separate from cart logic.

### `src/Components/ProductCard.jsx`

Purpose:
- Display the product image, name, price, and Add to Cart button.

Props:
- `product`: product data object.
- `onAddToCart`: callback to add the product to the cart.
- `onViewDetails`: callback to open the product details modal.

This component is reusable and only handles presentation.

### `src/Components/CartModal.jsx`

Purpose:
- Show cart contents in a modal overlay.
- Display the total price and quantity controls.

How it works:
- Receives `cart`, `onChangeQty`, and `onRemove` from `Layout.jsx`.
- Uses `CartItem` to render each row.
- Includes `CheckoutForm` for a simplified checkout interaction.

### `src/Components/CartItem.jsx`

Purpose:
- Render an individual cart item row.
- Show item name, quantity controls, price, and remove button.

Interactions:
- `+` and `-` buttons call `onChangeQty`.
- Remove button calls `onRemove`.

### `src/Components/Modal.jsx`

Purpose:
- Generic modal wrapper for dialogs.
- Handles overlay click outside to close.
- Used by `AddProductModal`, `ProductDetailsModal`, and `CartModal`.

### `src/Components/CheckoutForm.jsx`

Purpose:
- Simple checkout form inside the cart modal.
- Validates name, email, and address.
- Demonstrates form handling with local component state.

### `src/Components/AddProductModal.jsx` and `src/Components/ProductDetailsModal.jsx`

Purpose:
- `AddProductModal` provides a form to add a new product.
- `ProductDetailsModal` fetches and shows details for a single product.
- These are optional helper components for product management and details.

---

## Context API vs Props

### What changed from the previous version

Previously:
- `Layout.jsx` held cart state in its own `useState` hook.
- Cart actions were defined in `Layout.jsx` and passed through Outlet context.
- This was a form of prop/state drilling to child pages.

Now:
- Cart state lives in `CartContext.jsx`.
- `CartProvider` wraps the entire app in `src/main.jsx`.
- Any component can access cart state with `useCart()`.
- `Layout.jsx` no longer manages cart state directly.

### What is still passed as props

Props are still the right choice for:
- Passing `cartCount` and `onCartClick` to `Navbar`.
- Passing `onAddToCart` to `ProductList`.
- Passing `cart`, `onChangeQty`, and `onRemove` to `CartModal`.

Why this is correct:
- Context is used for global state and actions.
- Props are used for component-specific configuration and callbacks.
- This is the best pattern for beginner-friendly React code.

### Why Context instead of props for cart state

Use Context when:
- state is needed by many pages or deeply nested components
- you want to avoid passing the same prop through many layers

Use props when:
- only a direct child component needs the value or callback
- the component is reusable and should remain decoupled

In this app:
- The shared cart state belongs in Context.
- The UI callback from `Products` to `ProductList` belongs in props.

---

## Data flow example

1. User clicks `Add to Cart` in `ProductCard`.
2. `ProductCard` calls `onAddToCart(product)`.
3. `Products.jsx` passes the `addToCart` function from `useCart()`.
4. `CartContext.jsx` updates the global `cart` state.
5. `CartProvider` saves the updated cart to `localStorage`.
6. `Navbar` re-renders because `cartCount` changed in context.
7. `CartModal` would show the latest cart contents on open.

---

## Running the project

```bash
npm install
npm run dev
```

Open the browser at the Vite URL shown in the terminal.

---

## Completed assignment checklist

- [x] Shared Navbar on every page
- [x] Navbar navigation links and cart badge
- [x] Landing page at `/`
- [x] Products page at `/products`
- [x] Fetch products from external API with `useEffect`
- [x] Loading and error handling for API fetch
- [x] Global cart state with Context API
- [x] Add-to-cart functionality without duplicate items
- [x] Quantity management per item
- [x] Cart persistence in Local Storage
- [x] Routing with shared layout
- [x] Clean folder structure and reusable components

## Notes for beginners

- Use Context for app-wide state like cart data.
- Use props for callbacks and values in reusable child components.
- `useEffect` is used for side effects like API calls and writing Local Storage.
- `useState` is used for local UI state like loading, search input, and modals.
- Keep presentational components focused on UI, not data logic.
