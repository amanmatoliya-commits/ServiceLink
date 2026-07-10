import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ChatBot from "./components/ChatBot";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// NEW IMPORTS
import RegisterChoice from "./pages/RegisterChoice";
import CustomerRegister from "./pages/CustomerRegister";
import ProfessionalRegister from "./pages/ProfessionalRegister";

import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";


export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Registration */}
              <Route path="/register" element={<RegisterChoice />} />
              <Route
                path="/register/customer"
                element={<CustomerRegister />}
              />
              <Route
                path="/register/professional"
                element={<ProfessionalRegister />}
              />

              {/* Protected */}
              <Route path="/book/:serviceId" element={<BookingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold mb-3">
                        404 - Page Not Found
                      </h1>

                      <p className="text-gray-600 mb-6">
                        The page you're looking for doesn't exist.
                      </p>

                      <a
                        href="#/"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
                    </main>

          <Footer />

          <ChatBot />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}