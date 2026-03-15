import React, { Suspense, lazy } from "react";
import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const PublicLayout = lazy(() => import("@/components/PublicLayout"));
const Home = lazy(() => import("@/pages/Home"));
const StoryPage = lazy(() => import("@/pages/StoryPage"));
const BooksPage = lazy(() => import("@/pages/BooksPage"));
const ActivitiesPage = lazy(() => import("@/pages/ActivitiesPage"));
const ParentsPage = lazy(() => import("@/pages/ParentsPage"));
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const EventsPage = lazy(() => import("@/pages/EventsPage"));
const EventDetailPage = lazy(() => import("@/pages/EventDetailPage"));
const EventCheckoutPage = lazy(() => import("@/pages/EventCheckoutPage"));
const AboutAuthorPage = lazy(() => import("@/pages/AboutAuthorPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const SupportCenterLayout = lazy(() => import("@/components/SupportCenterLayout"));
const SupportArticlePage = lazy(() => import("@/pages/SupportArticlePage"));
const PortalLoginPage = lazy(() => import("@/pages/PortalLoginPage"));
const PortalDashboardPage = lazy(() => import("@/pages/PortalDashboardPage"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#ffffff_0%,#fef9f3_100%)] px-6 text-center">
    <div className="rounded-[2rem] border border-amber-100 bg-white px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
        Loading
      </p>
      <h2
        className="mt-4 text-4xl font-bold leading-none text-[#7c2d12] sm:text-5xl"
        style={{ fontFamily: "'ADVENTURES', sans-serif" }}
      >
        Opening the next page
      </h2>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/parents" element={<ParentsPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ProductDetailPage />} />
              <Route path="/checkout/:slug" element={<CheckoutPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:slug" element={<EventDetailPage />} />
              <Route
                path="/events/:slug/checkout"
                element={<EventCheckoutPage />}
              />
              <Route path="/about-author" element={<AboutAuthorPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            <Route path="/help" element={<SupportCenterLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path=":slug" element={<SupportArticlePage />} />
              <Route path="*" element={<Navigate to="overview" replace />} />
            </Route>
            <Route path="/portal/login" element={<PortalLoginPage />} />
            <Route path="/portal" element={<PortalDashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
