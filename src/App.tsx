import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { FlyingImage } from "@/components/FlyingImage";
import { AuthGuardModal } from "@/components/AuthGuardModal";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

import { ScrollToTop } from "@/components/ScrollToTop";

export default function App() {
  const { initialize } = useAuthStore();
  const { isAuthModalOpen, closeAuthModal } = useCartStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <ScrollToTop />
      <CartDrawer />
      <ProductModal />
      <FlyingImage />
      <AuthGuardModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
