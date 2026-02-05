import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from 'react-hot-toast';  
import MainLayout from "./components/Layout/MainLayout";

import Home from "./pages/Home/Home";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import CategoriesPage from "./pages/Categories/Categories";
import Cart from "./pages/CartPage/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrdersPage from "./pages/Orders/OrdersPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/AuthPage/ResetPasswordPage";
import ContactPage from "./pages/Contact/ContactPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
                fontSize: '14px',
                borderRadius: '10px',
                padding: '16px',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#10B981',
                  color: 'white',
                  borderLeft: '4px solid #059669',
                },
                iconTheme: {
                  primary: 'white',
                  secondary: '#10B981',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: '#EF4444',
                  color: 'white',
                  borderLeft: '4px solid #DC2626',
                },
              },
            }}
          />
          
          <Routes>
            {/* الصفحات مع Layout كامل */}
            <Route element={<MainLayout />}>

              {/* الصفحات الرئيسية */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            
            {/* الصفحات بدون Layout */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* صفحة 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

export default App;