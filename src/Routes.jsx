import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from 'components/ProtectedRoute';

// Lazy load pages for better initial load time
const NotFound = lazy(() => import('pages/NotFound'));
const ServicesPage = lazy(() => import('pages/services'));
const LoginPage = lazy(() => import('pages/login'));
const ContactPage = lazy(() => import('pages/contact'));
const HomePage = lazy(() => import('pages/home'));
const SignUpPage = lazy(() => import('pages/sign-up'));
const DashboardHome = lazy(() => import('pages/dashboard-home'));
const DashboardLayout = lazy(() => import('pages/dashboard'));
const SelectServicePage = lazy(() => import('pages/dashboard/select-service'));
const BookingsPage = lazy(() => import('pages/dashboard/bookings'));
const BookingDetail = lazy(() => import('pages/dashboard/bookings/BookingDetail'));
const SupportPage = lazy(() => import('pages/dashboard/support'));
const ProfilePage = lazy(() => import('pages/dashboard/profile'));
const AboutPage = lazy(() => import('pages/about'));
const PaymentsPage = lazy(() => import('pages/dashboard/payments'));
const UpcomingPage = lazy(() => import('pages/dashboard/upcoming'));
const NotificationsPage = lazy(() => import('pages/dashboard/notifications'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardHome />} />
              <Route path="services" element={<SelectServicePage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="bookings/:id" element={<BookingDetail />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="upcoming" element={<UpcomingPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>
            {/* keep old path working by redirecting to /dashboard */}
            <Route path="/dashboard-home" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
