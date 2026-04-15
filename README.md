# Al-Zaytoun — KSA Premium Shoes Store

A premium dark-luxury e-commerce storefront for Arabic sandals, formal shoes, and accessories — built for the Saudi market.

**Live Stack:** Next.js 16 · React 19 · CSS Modules · Arabic-first (RTL) with English toggle

---

## Features

### Shopping Experience
- **20 products** — 12 Arabic sandals, 5 formal shoes, 3 accessories with full Arabic translations
- **Product Detail Page** — image gallery, size/color picker, customer reviews, related products, mobile sticky bar
- **Cart & Checkout** — quantity controls, promo code, express pay, shipping/payment selection
- **Search Modal** — instant product search with popular suggestions
- **Sidebar Filters** — filter by category, brand, size, and price range

### Pages (14 Routes)
| Route | Description |
|-------|-------------|
| `/` | Homepage — hero slider, featured products, categories, reviews, trust badges |
| `/sandals` | Arabic Sandals collection |
| `/shoes` | Formal Shoes collection |
| `/accessories` | Accessories collection |
| `/product/[id]` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout with shipping & payment |
| `/sale` | Sale items |
| `/about` | Heritage & brand story |
| `/contact` | Contact page with WhatsApp integration |
| `/shipping` | Shipping & Returns policy |
| `/faq` | FAQ with accordion |
| `/size-guide` | Size guide reference |

### KSA-Specific
- **Arabic (RTL) as default language** with English toggle
- **WhatsApp floating button** on all pages (KSA standard)
- **Payment badges** — Mada, Visa, Apple Pay, Tamara (buy-now-pay-later), COD
- **Compliance info** — CR number, VAT number, Maroof registration
- **Next-day delivery** messaging for Riyadh & Jeddah

### Design
- Premium dark luxury theme with brightened gold accents for readability
- Responsive across desktop, tablet, and mobile
- Smooth animations and page transitions
- Hero slider with multiple slides
- Live chat widget
- Customer reviews section with aggregate ratings

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI:** React 19, CSS Modules
- **Fonts:** Playfair Display, Tajawal (Arabic)
- **i18n:** Custom context-based Arabic/English with RTL support
- **State:** React Context (Cart, Auth, Language, Inventory)

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.js           # Homepage
│   ├── layout.js         # Root layout with fonts & providers
│   ├── globals.css       # Design system (dark luxury theme)
│   ├── sandals/          # Sandals collection
│   ├── shoes/            # Shoes collection
│   ├── accessories/      # Accessories collection
│   ├── product/[id]/     # Dynamic product detail
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout page
│   ├── contact/          # Contact with WhatsApp
│   ├── about/            # Brand heritage
│   ├── sale/             # Sale items
│   ├── faq/              # FAQ
│   ├── shipping/         # Shipping & returns
│   └── size-guide/       # Size guide
├── components/           # Reusable UI components
│   ├── Navbar.js         # Navigation bar
│   ├── Hero.js           # Hero slider
│   ├── ProductCard.js    # Product card
│   ├── ProductDetail.js  # Full product detail
│   ├── ProductGrid.js    # Product grid with sorting
│   ├── CartDrawer.js     # Slide-out cart
│   ├── SearchModal.js    # Search overlay
│   ├── AuthModal.js      # Login/signup modal
│   ├── Footer.js         # Footer with payment badges
│   ├── WhatsAppButton.js # Floating WhatsApp CTA
│   ├── LiveChat.js       # Live chat widget
│   ├── ReviewsSection.js # Customer reviews
│   ├── TrustBadges.js    # Trust/shipping badges
│   ├── CategoryCards.js  # Category navigation
│   ├── MarqueeBanner.js  # Scrolling announcement bar
│   └── SidebarFilter.js  # Product filters
├── context/              # React Context providers
│   ├── LanguageContext.js # Arabic/English i18n
│   ├── CartContext.js     # Cart state
│   ├── AuthContext.js     # Authentication
│   └── InventoryContext.js# Stock management
└── data/
    ├── products.js       # 20 products with Arabic translations
    └── reviews.js        # 24 customer reviews
```

---

## Deploy on Vercel

The easiest way to deploy is via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MuhammadJunaid-03/ksa-shoes-store)
