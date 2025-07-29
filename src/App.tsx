import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { AdminLayout } from './components/Layout/AdminLayout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Dashboard } from './pages/admin/Dashboard';
import { ProductsAdmin } from './pages/admin/ProductsAdmin';
import { OrdersAdmin } from './pages/admin/OrdersAdmin';
import { UsersAdmin } from './pages/admin/UsersAdmin';
import { SalesAdmin } from './pages/admin/SalesAdmin';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<div className="p-8 text-center">About Page Coming Soon</div>} />
            <Route path="/contact" element={<div className="p-8 text-center">Contact Page Coming Soon</div>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/products" element={<AdminLayout><ProductsAdmin /></AdminLayout>} />
            <Route path="/admin/orders" element={<AdminLayout><OrdersAdmin /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UsersAdmin /></AdminLayout>} />
            <Route path="/admin/sales" element={<AdminLayout><SalesAdmin /></AdminLayout>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;