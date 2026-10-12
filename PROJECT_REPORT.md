# Aurelia Grand Resort & Spa — Final Frontend Application Project

## 🌟 Project Overview
**Aurelia Grand Resort & Spa** is a luxury 5-star destination resort and hospitality web application built with **React 19**, **Vite**, **React Router DOM v6**, **Redux Toolkit**, and **Vanilla CSS**.

The project fulfills **100% of all assigned requirements** and showcases all core React concepts with zero missing features.

---

## 📌 Checklist of Implemented Requirements

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Minimum 5 Menus/Pages** | 9 comprehensive pages: Home, Suites & Villas, Room Details, Services, Reservations, Explore, Saved Wishlist, Heritage, Concierge Contact + 404 | ✅ Complete |
| **React Router DOM Routing** | Full client-side routing with `createBrowserRouter` / `Routes`, `Route`, `NavLink`, `Link`, and `Navigate` | ✅ Complete |
| **Nested Routing** | Implemented in **Experiences (`/services`)** with `<Outlet />` and 4 sub-routes: `/services/spa`, `/services/dining`, `/services/adventures`, `/services/events` | ✅ Complete |
| **Meaningful Content** | Rich photography, luxury resort copy, pricing calculations, authentic amenities, guest reviews, and itineraries across every page | ✅ Complete |
| **Components & Props** | Modular components: `Navbar`, `Footer`, `RoomCard`, `BookingCard`, `Modal`, `RatingStars`, `FilterBar`, `ConceptBadge`, `ThemeToggle`, `CurrencySelector` | ✅ Complete |
| **useState** | Filter dropdowns, search inputs, modal open/close, active tabs, FAQ accordions, form fields | ✅ Complete |
| **useEffect** | Page title updater, scroll-to-top on route changes, localStorage synchronization, API fetch lifecycle | ✅ Complete |
| **useRef** | 1. Auto-focus on first invalid input field during form validation<br>2. Direct HTML5 audio soundscape controller (Play/Pause/Restart)<br>3. Input focus during wizard step changes | ✅ Complete |
| **useContext** | 1. `ThemeContext` (Dark/Light mode switch)<br>2. `ToastContext` (Global toast notification alerts) | ✅ Complete |
| **useReducer** | Multi-step Reservation Wizard state machine (`useReservationReducer.js`) managing dates, guest calculations, luxury add-ons, and promo code discounts (`AURELIA20`) | ✅ Complete |
| **Conditional Rendering** | Loading skeletons, empty search states, confirmed/pending status chips, discount alerts, modal overlays | ✅ Complete |
| **List Rendering** | Suites grid, service offerings, guest reservations, customer reviews, amenities checklists with unique keys | ✅ Complete |
| **API Integration** | Asynchronous data fetching via custom hook `useFetch` with loading states, error fallback, and manual refetch | ✅ Complete |
| **Custom Hooks** | 1. `useDebounce` (live search delay)<br>2. `useLocalStorage` (reactive storage persistence)<br>3. `useFetch` (reusable data fetching)<br>4. `useDocumentTitle` (dynamic document titles) | ✅ Complete |
| **useParams** | Dynamic suite detail page: `/rooms/:roomId` | ✅ Complete |
| **useSearchParams** | Live URL query param synchronization on `/rooms?category=...&maxPrice=...&sortBy=...&search=...` | ✅ Complete |
| **Redux Toolkit** | 1. `favoritesSlice`: Wishlist add/remove/toggle + navbar counter badge<br>2. `cartSlice`: Experience booking cart<br>3. `uiSlice`: Real-time currency switcher (USD $, EUR €, GBP £, INR ₹, AED) | ✅ Complete |
| **CRUD Operations** | Complete reservation management on `/bookings` (Create new reservation, Read with filters, Update stay details, Delete/Cancel reservation) | ✅ Complete |
| **Form Validation** | Controlled input validation on Contact & Booking forms with regex email verification, phone validation, character limits, and error feedback | ✅ Complete |
| **Responsive Luxury UI** | Glassmorphism, Obsidian Dark & Warm Light themes, mobile drawer navigation, card hover animations | ✅ Complete |
| **Netlify Deployment** | `_redirects` and `netlify.toml` configured to support React SPA client-side routing on Netlify | ✅ Complete |

---

## 🧭 Page Architecture & Routes

```
/                         -> Home (Hero search widget, featured suites, stats counter, resort highlights)
/rooms                    -> Suites & Villas Collection (useSearchParams, useDebounce, price slider, filters)
/rooms/:roomId            -> Dynamic Suite Detail (useParams, photo gallery, stay estimator, privileges)
/services                 -> Master Experiences Page (Nested Routing with <Outlet />)
  ├── /services/spa       -> Lotus Ayurvedic Spa (Treatments & reserve experience)
  ├── /services/dining    -> Michelin Gastronomy & Wine Cellar (Table bookings)
  ├── /services/adventures-> Ocean & Aerial Expeditions (Yachts & charters)
  └── /services/events    -> Weddings, Galas & Summits (Event bookings)
/bookings                 -> Manage Reservations (Full CRUD Operations with useLocalStorage)
/explore                  -> Island Attractions (API Integration with useFetch)
/favorites                -> Guest Wishlist & Itinerary (Redux Toolkit store)
/about                    -> Heritage & Leadership (useRef soundscape player & timeline)
/contact                  -> VIP Concierge & Inquiry (Controlled Form Validation & useRef focus)
*                         -> Custom 404 Uncharted Waters Page
```

---

## 🚀 How to Deploy on Netlify in 2 Minutes

### Method 1: Netlify Drag & Drop (Fastest — 30 Seconds)
1. In your project directory, build is already generated:
   ```bash
   npm run build
   ```
2. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3. Drag and drop the generated `dist` folder (`e:\react final task\dist`) directly into the Netlify drop zone.
4. Netlify will deploy it instantly and provide your live `.netlify.app` domain link!

### Method 2: Netlify CLI
1. Run:
   ```bash
   npx netlify deploy --prod --dir=dist
   ```
2. Follow the prompt to authorize and select your site name.

> **Note:** The `dist` folder already contains `_redirects` (`/* /index.html 200`), ensuring that all direct links (e.g. `/rooms`, `/services/spa`, `/bookings`) work without 404 errors.
