# UI Context

## Theme

- Customer storefront: responsive fashion storefront with a minimal black/white/gray visual system, product imagery, and Tailwind utility styling.
- Admin dashboard: functional dashboard with a light gray background and simple forms/tables.

## Colors

No project-defined CSS variables exist today; colors are applied through Tailwind classes and a few literal CSS values.

Customer app:

| Role | CSS Variable | Value |
| --- | --- | --- |
| Page/background surface | Not defined; `bg-white` | `#ffffff` |
| Primary action/background | Not defined; `bg-black` | `#000000` |
| Primary action/text on dark | Not defined; `text-white` | `#ffffff` |
| Primary text | Not defined; `text-gray-800` | `#1f2937` |
| Secondary text | Not defined; `text-gray-700` | `#374151` |
| Muted text | Not defined; `text-gray-600`, `text-gray-500`, `text-gray-400` | `#4b5563`, `#6b7280`, `#9ca3af` |
| Search/background band | Not defined; `bg-gray-50` | `#f9fafb` |
| Light option surface | Not defined; `bg-gray-100` | `#f3f4f6` |
| Dropdown surface | Not defined; `bg-slate-100` | `#f1f5f9` |
| Borders | Not defined; `border-gray-200`, `border-gray-300`, `border-gray-400`, `border-gray-800`, `border-black` | `#e5e7eb`, `#d1d5db`, `#9ca3af`, `#1f2937`, `#000000` |
| Hero accent | Not defined; `text-[#414141]`, `bg-[#414141]` | `#414141` |
| Selected payment indicator | Not defined; `bg-green-400` | `#4ade80` |
| Order status indicator | Not defined; `bg-green-500` | `#22c55e` |
| Selected product size border | Not defined; `border-orange-500` | `#f97316` |
| Forgot password link | Not defined; `text-blue-600` | `#2563eb` |
| Mobile active nav | Not defined; `a.active` media rule | `background-color: black`, `color: white` |

Admin app:

| Role | CSS Variable | Value |
| --- | --- | --- |
| Page background | Not defined; `bg-gray-50` | `#f9fafb` |
| Card/surface background | Not defined; `bg-white` | `#ffffff` |
| Primary action/background | Not defined; `bg-black` | `#000000` |
| Logout action/background | Not defined; `bg-gray-600` | `#4b5563` |
| Text on dark actions | Not defined; `text-white` | `#ffffff` |
| Page text | Not defined; `text-gray-600` | `#4b5563` |
| Form label/order text | Not defined; `text-gray-700` | `#374151` |
| Table header surface | Not defined; `bg-gray-100` | `#f3f4f6` |
| Size chip selected surface | Not defined; `bg-pink-100` | `#fce7f3` |
| Size chip default surface | Not defined; `bg-slate-200` | `#e2e8f0` |
| Form border | Not defined; global `select,input,textarea` | `#c2c2c2` |
| Form focus outline | Not defined; global `select,input,textarea` | `#C586A5` |
| Sidebar active background | Not defined; `.active` | `#ffebf5` |
| Sidebar active border | Not defined; `.active` | `#C586A5` |
| Borders | Not defined; `border-gray-200`, `border-gray-300` | `#e5e7eb`, `#d1d5db` |

## Typography

- `frontend/src/index.css` imports Google fonts and applies `Outfit` globally.
- `Prata` is available through `.prata-regular`.
- `admin/src/index.css` imports Google fonts and applies `outfit` globally.
- `Prata` is used for customer hero/display styling through the `.prata-regular` class.

## Border Radius

- Customer logo wrapper, cart badge, search input shell, and payment indicators use `rounded-full`.
- Customer checkout inputs use `rounded`.
- Customer track order button uses `rounded-sm`.
- Customer profile dropdown uses `rounded`.
- Admin login card uses `rounded-lg`.
- Admin login inputs and login button use `rounded-md`.
- Admin logout button uses `rounded-full`.
- Admin sidebar links use `rounded-l`.
- Admin global `select,input,textarea` use `border-radius: 4px`.

## Component Library

- The project uses Tailwind utility classes directly in JSX.
- There is no shadcn, Material UI, Chakra, Bootstrap, or icon component library in use.
- Shared customer UI is built from local components such as `ProductItem`, `Title`, `CartTotal`, `SearchBar`, `Navbar`, and `Footer`.
- Shared admin UI is built from local components such as `Navbar`, `Sidebar`, and `Login`.

## Layout Patterns

- `frontend/src/App.jsx` wraps the app in `px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`.
- `Navbar`, `SearchBar`, route content, and `Footer` appear across the customer app.
- Toast notifications are globally mounted via `ToastContainer`.
- `admin/src/App.jsx` uses `bg-gray-50 min-h-screen`.
- When authenticated, `Navbar` sits above a two-column layout with `Sidebar` and page content.
- Page content is constrained with `w-[70%] mx-auto ml-[max(5vw,25px)] my-8`.
- Customer protected routes are Cart, Place order, and Orders.

## Navigation Patterns

- Customer desktop nav links: Home, Collection, About, Contact.
- Customer mobile nav uses a slide-over menu from the right.
- Customer search icon toggles search visibility through `ShopContext`.
- Customer profile icon routes anonymous users to login and shows a hover menu for logged-in users.
- Customer cart icon shows a count badge from `getCartCount()`.
- Admin sidebar links: Add Items, List Items, Orders.
- Admin active sidebar links get `#ffebf5` background and `#C586A5` border.
- Admin sidebar labels hide on smaller screens with `hidden md:block`.

## Core UI Patterns

- Product cards use product image, name, and price through `ProductItem`.
- Section headings use the shared `Title` component with split text styling.
- Buttons are mostly black backgrounds with white text.
- Inputs are plain bordered fields.
- Filters are checkbox groups for category and subcategory.
- Sort is a native `select`.
- Payment method selection is implemented with bordered rows and a small circular selected indicator.
- Admin inputs, selects, and textareas get a shared border, outline color, and 4px radius from global CSS.
- Admin product add uses image upload previews, text inputs, selects, clickable size chips, and a bestseller checkbox.
- Admin product list uses a responsive CSS grid table.
- Admin orders use responsive grid cards with status `select`.
- Product taxonomy shown in UI: categories `Men`, `Women`, `Kids`; subcategories `Topwear`, `Bottomwear`, `Winterwear`; sizes `S`, `M`, `L`, `XL`, `XXL`.

## Icons

- No icon library is used.
- Icons are image assets imported from local `assets.js` files, including cart, bin, exchange, dropdown, cross, profile, menu, search, star, upload, add, order, and parcel icons.

## Assets

- Customer assets live in `frontend/src/assets/` and are re-exported from `assets.js`. They include logo, hero/about/contact images, product images, icons, payment logos, and policy icons.
- Admin assets live in `admin/src/assets/` and include logo, upload placeholder, sidebar icons, and parcel icon.

## UI Risks

- Some source files contain mojibake for the intended rupee symbol and check/cross console text. Currency display should be normalized deliberately rather than copied blindly.
- `PlaceOrder.jsx` uses `toast` without importing it, so payment/order error paths can break at runtime.
- `Collection.jsx` imports `use` from React even though it is unused.
- Several effects have incomplete dependency arrays; changing state logic may surface stale values.
- Large image assets are bundled into the frontend build, including logo/about/contact images over 1 MB each.
