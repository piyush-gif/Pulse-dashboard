# Pulse — E-Commerce Analytics Dashboard

A frontend-only analytics dashboard for an e-commerce business — built to practice real-world React patterns beyond basic CRUD: data tables, charts, custom hooks, and accessibility.

**[Live Demo](https://pulse-dashboard-seven-chi.vercel.app/)**

![Overview screenshot]
(./assets/Overview.png)

## What it does

- **Overview** — key business stats (revenue, orders, products, avg order value) plus two charts: top product categories and products by price range
- **Products** — searchable, sortable, filterable data table with pagination
- **Orders** — order list with status, linking to a detailed line-item view per order
- **Users** — searchable customer directory

All data comes from [DummyJSON](https://dummyjson.com)'s public API (products, carts, users). Order status is simulated (DummyJSON doesn't provide one) — deterministically assigned per order ID, disclosed here for transparency.

## Tech stack

React (JS, Vite) · React Router · Recharts · Plain CSS (custom design system, no UI framework)

## What I practiced

- **Hooks:** `useState`, `useEffect`, `useMemo` (search/sort/filter performance), custom hooks (`useProducts`, `useCarts`, `useUsers`) wrapping API calls with loading/error state
- **Routing:** multi-page navigation with React Router, dynamic routes (`/orders/:id`) with `useParams`
- **Data tables:** hand-built sorting, filtering, and pagination logic (not a table library) to understand the mechanics
- **Charts:** Recharts integration with real, derived data (no simulated numbers in the charts themselves)
- **Accessibility:** labeled form inputs, `aria-sort` on sortable headers, `aria-label`s on icon/pagination buttons, keyboard-navigable throughout, status shown as text + color (not color alone)
- **Design:** a custom design system (color tokens, typography, layout) built specifically for this dashboard rather than a default UI kit

## Running locally

```bash
git clone <your-repo-url>
cd pulse-dashboard
npm install
npm run dev
```

## Notes

- No backend/database — this project intentionally focuses on frontend depth (state, UI complexity, data presentation) rather than full-stack CRUD, which is already demonstrated in my other projects.
- Order status and category/price-range groupings are computed client-side from real API data; only the order _status_ label itself is simulated.
