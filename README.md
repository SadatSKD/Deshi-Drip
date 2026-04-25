# Deshi Drip ⚡ — MERN Stack Streetwear Brand

> Urban streetwear for men and women. Born in Bangladesh. Built for the Bold.

## 🏗️ Architecture

Full MERN stack with strict MVC pattern:
- **Model**: Mongoose schemas in `server/models/`
- **View**: React + Vite in `client/src/`
- **Controller**: Express controllers in `server/controllers/`

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB via Mongoose |
| Styling | Vanilla CSS with CSS Variables |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup

Edit `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/deshidrip
PORT=5000
NODE_ENV=development
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This creates:
- 8 categories (men/women/all)
- 12 products with Bangladeshi pricing (Tk 799–Tk 2,499)
- 5 testimonials with Bangladeshi customer names

### 4. Run the App

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | All products (supports `?gender=`, `?badge=`, `?category=`) |
| GET | `/api/products/featured` | Featured products (max 6) |
| GET | `/api/products/:slug` | Single product by slug |
| GET | `/api/categories` | All categories |
| GET | `/api/categories/:gender` | Categories by gender |
| GET | `/api/testimonials` | All testimonials |
| POST | `/api/subscribe` | Subscribe to newsletter |
| GET | `/api/health` | Health check |

---

## 🎨 Design System

```css
--black: #0a0a0a      /* Base background */
--green: #00ff6a      /* Primary accent */
--white: #f5f5f0      /* Off-white text */
--terracotta: #e85d26 /* Secondary accent */
--gray: #1a1a1a       /* Card backgrounds */
```

**Fonts:** Space Grotesk (headings) + Inter (body)

---

## 📁 Project Structure

```
deshi-drip/
├── client/src/
│   ├── components/   Navbar, Footer, ProductCard, CategoryCard, HeroSection, Marquee, TestimonialCard, NewsletterSection
│   ├── pages/        Home, Men, Women, Lookbook, ProductDetail, About
│   ├── context/      CartContext (localStorage persistence)
│   ├── hooks/        useFetch
│   └── services/     productService, categoryService, newsletterService
└── server/
    ├── models/       Product, Category, Testimonial, Subscriber
    ├── controllers/  productController, categoryController, testimonialController, subscriberController
    ├── routes/       productRoutes, categoryRoutes, testimonialRoutes, subscriberRoutes
    ├── config/       db.js (Mongoose connection)
    ├── middleware/   errorHandler.js
    └── seed/         seedData.js
```

---

© 2025 Deshi Drip. Dhaka, Bangladesh 🇧🇩
