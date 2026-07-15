# Scholar Pizza 🍕

A complete online ordering website for a real pizza restaurant in Karachi — customers browse a 60+ item menu, build a cart, choose a payment method, and place their order **directly through WhatsApp**, while every order is also saved to the database and managed from a custom admin panel.

**Live:** [scholar-pizza.vercel.app](https://scholar-pizza.vercel.app)

---

## How ordering works

1. Customer browses the menu (8 categories, 60+ items — pizzas with multiple size options, burgers, sandwiches, pasta, sides, drinks, and value deals)
2. Adds items to the cart, adjusts quantities, and proceeds to checkout
3. Fills in delivery details (name, phone, address) and picks a payment method — **Cash on Delivery, Easypaisa, or JazzCash**
4. On placing the order, two things happen:
   - The order is **saved to MongoDB** (so the restaurant has a permanent record with payment/order status)
   - A **pre-filled WhatsApp message** opens with the complete order — items, sizes, quantities, totals, customer details, and payment method — sent straight to the restaurant's WhatsApp

Why WhatsApp? In Pakistan, customers already live there. No signup wall, no app download, no unfamiliar checkout form — one tap and the restaurant has the order in the chat where they already do business.

---

## Features

### Customer side
- 📱 **Full menu with categories** — Classic Pizza, Special Pizza, Burgers, Sandwiches, Sides & Starters, Pasta, Drinks, and Value Deals
- 📏 **Size-based pricing** — pizzas support Small / Regular / Large pricing per item
- 🛒 **Cart with quantity controls** — add, remove, update quantities, live total
- 💳 **Payment method selection** — COD, Easypaisa, or JazzCash (with payment instructions shown for mobile wallets)
- 💬 **WhatsApp checkout** — the entire order converts into a formatted `wa.me` message
- ⚡ Mobile-first responsive design — because that's where food orders happen

### Admin panel (`/admin`)
- 🔐 **Login-protected** (credentials via environment variables)
- 📊 **Stats at a glance** — total orders, pending orders, and total revenue
- 📦 **Order management** — view all orders with customer details, filter by status, and update order status and payment status
- 🗑️ **Delete orders**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) + React |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas (official `mongodb` driver) |
| Checkout | WhatsApp deep-link integration (`wa.me` pre-filled messages) |
| Deployment | Vercel |

### API routes
| Endpoint | Purpose |
|---|---|
| `POST /api/orders` | Save a new order (items, totals, customer info, payment method) |
| `GET /api/orders` | List recent orders (admin) |
| `PATCH /api/orders/:id` | Update order status / payment status |
| `DELETE /api/orders/:id` | Delete an order |
| `POST /api/admin/login` | Admin authentication |

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (free tier works)

### 1. Clone and install
```bash
git clone https://github.com/OBAID-DAFTANI/scholar-pizza.git
cd scholar-pizza
npm install
```

### 2. Environment variables
Create a `.env.local` file in the project root:

```env
MONGODB_URI=your-mongodb-connection-string
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
```


### 3. Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) — the admin panel lives at `/admin`.

---

## What building this taught me

- **Friction kills orders.** Every extra step in checkout loses real customers — which is why checkout lives on WhatsApp instead of a custom payment form.
- **Save first, then hand off.** Orders are written to the database *before* opening WhatsApp, so the restaurant never loses an order even if the customer closes the chat.
- **The owner's workflow matters as much as the customer's.** The admin panel was designed so a non-technical restaurant owner can track orders, payments, and revenue completely solo.

---

## Roadmap / Possible improvements
- Automated payment verification for Easypaisa/JazzCash
- Customer-facing order status tracking
- Menu management UI in the admin panel (currently menu lives in code)
- Order notifications for the restaurant (sound/push on new orders)

---

## Author

**Obaid Ur Rehman** — Full-Stack Developer (MERN/Next.js), Karachi, Pakistan

- GitHub: [OBAID-DAFTANI](https://github.com/OBAID-DAFTANI)
- LinkedIn: [hafiz-obaid-ur-rehman](https://linkedin.com/in/hafiz-obaid-ur-rehman)