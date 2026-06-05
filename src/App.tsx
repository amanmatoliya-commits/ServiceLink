/**
 * App.tsx (Entry Point)
 * ---------------------
 * The root component of Urban Home Services.
 *
 * This sets up:
 * 1. React Router for page navigation
 * 2. AuthProvider for user authentication state
 * 3. Layout with Navbar and Footer
 * 4. All page routes
 *
 * ARCHITECTURE NOTE:
 * In the full-stack version, this React frontend communicates with
 * the Django backend via REST API calls (fetch/axios).
 * Here we simulate the backend with localStorage for demonstration.
 */

import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";



export default function App() {
  return (
    // AuthProvider wraps everything so any component can access user state
    <AuthProvider>
      {/* HashRouter works with static file hosting (no server-side routing needed) */}
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Navbar - shown on every page */}
          <Navbar />

          {/* Main content area - grows to fill space between nav and footer */}
          <main className="flex-1">
            <Routes>
              {/* Public pages - anyone can access */}
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected pages - requires login (handled inside component) */}
              <Route path="/book/:serviceId" element={<BookingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* 404 - Not Found */}
              <Route
                path="*"
                element={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl mb-4"></div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Page Not Found
                      </h1>
                      <p className="text-gray-600 mb-6">
                        The page you're looking for doesn't exist.
                      </p>
                      <a
                        href="#/"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer - shown on every page */}
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
