/**
 * ProfessionalRegister.jsx
 * -------------------------
 * 
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PROFESSIONS = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "AC Technician",
  "Cleaning",
  "Appliance Repair",
];

const EXPERIENCE_LEVELS = [
  "0-1 Years",
  "1-3 Years",
  "3-5 Years",
  "5-10 Years",
  "10+ Years",
];

export default function ProfessionalRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form state — matches Django User/Professional model fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    profession: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Tracks whether the application was submitted successfully, to swap
  // the form out for the "Pending Verification" screen.
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email, and password are required.");
      setLoading(false);
      return;
    }

    if (!formData.profession) {
      setError("Please select your profession.");
      setLoading(false);
      return;
    }

    if (!formData.experience) {
      setError("Please select your experience level.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Try to register
    const result = await register(formData);

    if (result.success) {
      
      setSubmitted(true);
    } else {
      setError(result.message);
    }

    setLoading(false);
  }

  // ========== SUCCESS SCREEN ==========
  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-green-600">✔</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted Successfully
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Your application has been received. Our admin team will verify
              your profile before activating your account.
            </p>

            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Status: Pending Verification
            </div>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== REGISTRATION FORM ==========
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛠</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Become a Service Professional
          </h1>
          <p className="text-gray-600 mt-2">
            Join ServiceLink and start receiving service requests.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rajesh Kumar"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 000-000-0000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, State"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Profession */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Profession <span className="text-red-500">*</span>
              </label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white text-gray-900"
              >
                <option value="" disabled>
                  Select your profession
                </option>
                {PROFESSIONS.map((profession) => (
                  <option key={profession} value={profession}>
                    {profession}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Experience <span className="text-red-500">*</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white text-gray-900"
              >
                <option value="" disabled>
                  Select your experience level
                </option>
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 mt-2"
            >
              {loading ? "Submitting Application..." : "Submit Application"}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}