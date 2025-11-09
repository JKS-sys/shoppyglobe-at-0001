# 🌐 ShoppyGlobe E-commerce Application

A modern, responsive e-commerce web application built with React, Redux, and React Router. ShoppyGlobe provides a seamless shopping experience with product browsing, cart management, and secure checkout.

![ShoppyGlobe Screenshot](https://github.com/JKS-sys/shoppyglobe-at-0001/blob/main/public/Screenshot%202025-11-09%20at%2012.19.12.png)

## 🚀 Live Demo

**Deployed URL:** [https://shoppyglobe-at-0001.vercel.app/](https://shoppyglobe-at-0001.vercel.app/)

## 📋 Project Overview

ShoppyGlobe is a full-featured e-commerce platform that demonstrates modern React development practices including state management with Redux, routing, API integration, and responsive design.

### ✨ Key Features

- **🌐 Product Catalog** - Browse products with search and filtering
- **📱 Responsive Design** - Optimized for all devices
- **🛒 Shopping Cart** - Add, remove, and manage items with quantity controls
- **🔍 Product Search** - Real-time product search functionality
- **📄 Product Details** - Detailed product pages with image galleries
- **💳 Secure Checkout** - Complete checkout process with form validation
- **🎯 State Management** - Centralized state with Redux
- **⚡ Performance Optimized** - Lazy loading and code splitting

## 🛠️ Technology Stack

### Frontend

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **CSS3** - Custom responsive styling
- **Vite** - Build tool and development server

### APIs & Data

- **DummyJSON** - Product data API
- **React Context** - Additional state management

### Deployment

- **Vercel** - Production deployment

## 📦 Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/JKS-sys/shoppyglobe-at-0001.git
   cd shoppyglobe-at-0001
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
shoppyglobe/
├── public/
│   └── ShoppyGlobe.png      # Favicon and app icon
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── ProductList.jsx  # Product grid
│   │   ├── ProductItem.jsx  # Individual product card
│   │   ├── CartItem.jsx     # Cart item component
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── ProductDetail.jsx # Product details
│   │   ├── Cart.jsx         # Shopping cart
│   │   ├── Checkout.jsx     # Checkout process
│   │   └── NotFound.jsx     # 404 page
│   ├── store/               # Redux store
│   │   ├── index.js         # Store configuration
│   │   └── cartSlice.js     # Cart state management
│   ├── hooks/               # Custom React hooks
│   │   └── useProducts.js   # Product data fetching
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── App.css              # Global styles
├── package.json
└── vite.config.js
```

## 🔧 Key Components

### State Management (Redux)

- **Cart Management** - Add, remove, update quantities
- **Search Functionality** - Global product search
- **Persistent State** - Maintains cart across sessions

### Routing (React Router)

- **Home** (`/`) - Product listing
- **Product Detail** (`/product/:id`) - Individual product pages
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Order placement
- **404 Handling** - Custom not found page

### API Integration

- **Product Data** - Fetched from DummyJSON API
- **Error Handling** - Graceful API error management
- **Loading States** - User feedback during data fetching

## 🎨 Features in Detail

### Product Browsing

- Grid layout with product cards
- Search and filter functionality
- Category-based organization
- Responsive image loading

### Shopping Cart

- Add/remove products
- Quantity adjustments
- Real-time price calculations
- Persistent cart state

### Checkout Process

- Multi-step form validation
- Order summary
- Secure payment simulation
- Order confirmation

### User Experience

- Loading spinners and skeleton screens
- Error boundaries and fallback UI
- Responsive navigation
- Mobile-first design

## 📱 Responsive Design

ShoppyGlobe is built with a mobile-first approach and features:

- **Flexible Grid System** - Adapts to all screen sizes
- **Touch-Friendly Interfaces** - Optimized for mobile devices
- **Readable Typography** - Scalable font sizes
- **Optimized Images** - Lazy loading and responsive images

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy-loaded components
- **Image Optimization** - Lazy loading and modern formats
- **Efficient Re-renders** - Optimized React component structure
- **Bundle Optimization** - Minimal production builds

## 🔒 Code Quality

- **ESLint** - Code linting and formatting
- **Component Modularity** - Reusable and maintainable components
- **Prop Validation** - Type checking and validation
- **Error Handling** - Comprehensive error boundaries

## 🌐 Deployment

The application is deployed on **Vercel** with:

- **Automatic Deployments** - On every git push
- **HTTPS** - Secure connections
- **CDN** - Global content delivery
- **Environment Variables** - Secure configuration

## 👨‍💻 Author

**Jagadeesh Kumar S**

- GitHub: [@JKS-sys](https://github.com/JKS-sys)
- Project Repository: [https://github.com/JKS-sys/shoppyglobe-at-0001](https://github.com/JKS-sys/shoppyglobe-at-0001)

## 📄 License

This project is created for educational purposes as part of a React development assignment.

## 🔮 Future Enhancements

- User authentication and profiles
- Product reviews and ratings
- Wishlist functionality
- Order history
- Payment gateway integration
- Admin dashboard
- Real-time inventory management

## 🤝 Contributing

While this is a personal project, feedback and suggestions are welcome! Feel free to open issues or submit pull requests.

---

**Built with ❤️ using React and modern web technologies**
