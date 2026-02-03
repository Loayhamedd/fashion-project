// src/App.jsx - النسخة النهائية المؤكدة
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import MainLayout from "./components/Layout/MainLayout";

// الصفحات الرئيسية - تأكد من المسارات الصحيحة
import Home from "./pages/Home/Home";
import ProductsPage from "./pages/Products/ProductsPage"; // صفحة المنتجات الرئيسية
// import AllChairsPage from "./pages/AllChairs/AllChairsPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage"; // صفحة تفاصيل منتج
import CategoriesPage from "./pages/Categories/Categories";
import Cart from "./pages/CartPage/CartPage";
import Checkout from "./pages/Checkout/Checkout";

// الصفحات الجديدة
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrdersPage from "./pages/Orders/OrdersPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";

// صفحات المصادقة
import AuthPage from "./pages/AuthPage/AuthPage";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/AuthPage/ResetPasswordPage";

// صفحة 404
import NotFound from "./pages/NotFound";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* الصفحات مع Layout كامل */}
            <Route element={<MainLayout />}>
              {/* الصفحات الرئيسية */}
              <Route path="/" element={<Home />} />
              
              {/* صفحة المنتجات الرئيسية - تعرض جميع المنتجات */}
              <Route path="/products" element={<ProductsPage />} />
              
              {/* صفحة الكراسي فقط */}
              {/* <Route path="/chairs" element={<AllChairsPage />} /> */}
              
              {/* صفحة تفاصيل منتج معين */}
              <Route path="/product/:id" element={<ProductDetailPage />} />
              
              {/* صفحة الفئات */}
              <Route path="/categories" element={<CategoriesPage />} />
              
              {/* صفحات التسوق والدفع */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              
              {/* صفحات حساب المستخدم */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
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