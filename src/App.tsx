import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { FlyingImage } from "@/components/FlyingImage";
import { AuthGuardModal } from "@/components/AuthGuardModal";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

import { ScrollToTop } from "@/components/ScrollToTop";

// Páginas secundárias carregam sob demanda para deixar a home mais leve
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Orders = lazy(() => import("@/pages/Orders"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Privacidade = lazy(() => import("@/pages/Privacidade"));
const Trocas = lazy(() => import("@/pages/Trocas"));

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
      <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
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
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/trocas" element={<Trocas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
