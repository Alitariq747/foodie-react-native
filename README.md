Foodie — Demo Food Ordering App (Expo + Supabase)

A simple food ordering demo with menu, cart, checkout, and admin tools (add product, view orders, update order status). Built with Expo React Native and Supabase.

✨ Features

User

Browse menu (name, image, price, description)

Add to cart / update quantity / remove

Place order & view order history

Email/password auth

Admin

Add / edit / disable products

See all orders with status

Update order status (e.g., pending → preparing → delivering → completed)

Under the hood

Role-based UI (user vs admin)

Typed API calls

Basic error/empty/loading states

🧱 Tech Stack

App: Expo (React Native, TypeScript)

Auth/DB: Supabase (Auth, Postgres, RLS)

State/Navigation: (🔧 React query, Expo Router)

Media/Images: (🔧 e.g., Supabase Storage or remote URLs)



🚀 Getting Started
1) Clone & install
git clone https://github.com/Alitariq747/foodie-react-native.git
cd foodie-react-native
npm install

2) Supabase setup

Create a new project at supabase.com

Grab Project URL and Anon key (Settings → API)

Create a .env file in the project root:

EXPO_PUBLIC_SUPABASE_URL=🔧https://YOUR-REF.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=🔧YOUR-ANON-KEY


If your app uses roles, make sure your profiles table exists and is linked to auth.users (1:1). Keep RLS policies permissive enough for your expected inserts/reads during development.

3) Run
npx expo start


Press i for iOS Simulator or a for Android Emulator.

Log in / sign up from the app screen.

(Optional) Create an admin user (🔧 either seed via SQL or flip the role column in profiles from Supabase Studio).

🧩 Data Model (conceptual)

products: menu items (name, price, image, description)

orders: one order per checkout (user_id, total, status, created_at)

orderitems: line items for an order (order_id, product_id, quantity, price snapshot)

profiles: user profile/role (id = auth.users.id)

One profile → many orders. Each order → many orderitems. Each orderitem → one product.

🔐 Notes on Auth & RLS

Sign-up creates a user in auth.users.

Keep RLS simple while developing; ensure inserts into profiles work at signup (trigger or manual).

Typical order reads/writes should restrict to auth.uid(). Admin-only screens should check profiles.role === 'admin' on the client (and ideally enforce on the server/RLS for production).

🛣️ Roadmap (nice-to-have)

Search & categories

Favorites

Address book

Payments integration

Push notifications (order updates)

Better skeleton/loading + offline cache

🐞 Troubleshooting

Auth error: “Database error saving new user” → usually a failing profiles insert (NOT NULL column without default, or RLS too strict). Relax INSERT policy or add defaults, then retry.

Keys not loading → ensure .env uses EXPO_PUBLIC_* for Expo to expose them in the client.

iOS build issues → clean cache (expo start -c), check SDK version in app.json, ensure Node/Expo CLI updated.
