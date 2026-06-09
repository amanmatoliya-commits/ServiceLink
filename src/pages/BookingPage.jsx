/**
 * BookingPage.jsx
 * ---------------
 * Booking form for a specific service.
 * URL: /book/:serviceId
 *
 * In the real app, this sends POST to Django: /api/bookings/create/
 * The user must be logged in to book.
 */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BookingPage() {
  const { serviceId } = useParams(); // Get service ID from URL
  const { user, isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // Find the service by ID
  const [service, setService] = useState(null);
const [serviceLoading, setServiceLoading] = useState(true);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/services/")
    .then((res) => res.json())
    .then((data) => {
      const foundService = data.find(
        (s) => s.id === parseInt(serviceId)
      );

      setService(foundService);
    })
    .catch((err) =>
      console.error("Error loading service:", err)
    )
    .finally(() => setServiceLoading(false));
}, [serviceId]);

  // Form state
  const [formData, setFormData] = useState({
    date: "",
    time: "10:00",
    address: user?.address || "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");


if (serviceLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Service...
        </h2>
      </div>
    </div>
  );
}

  // If service not found, show error
  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Service Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The service you're looking for doesn't exist.
          </p>
          <Link
            to="/services"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // If user not logged in, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to sign in before booking a service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle input changes
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle booking submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.date || !formData.address) {
      setError("Date and address are required.");
      setLoading(false);
      return;
    }

    // Check if date is in the future
    if (new Date(formData.date) < new Date().setHours(0,0,0,0)) {
      setError("Please select a future date.");
      setLoading(false);
      return;
    }

  //   // Simulate API delay
  //   await new Promise((resolve) => setTimeout(resolve, 800));

  //   // Create the booking (saved to localStorage)
  //   createBooking({
  //     userId: user.id,
  //     serviceId: service.id,
  //     serviceName: service.name,
  //     serviceCategory: service.category,
  //     servicePrice: service.price,
  //     date: formData.date,
  //     time: formData.time,
  //     address: formData.address,
  //     notes: formData.notes,
  //   });

  //   setSuccess(true);
  //   setLoading(false);
  // }



  const response = await fetch(
  "http://127.0.0.1:8000/api/bookings/create/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user.id,
      service: service.id,
      booking_date: formData.date,
      booking_time: formData.time,
      address: formData.address,
      notes: formData.notes,
    }),
  }
);

const data = await response.json();

if (!response.ok) {
  throw new Error("Booking failed");
}

setSuccess(true);



  // Show success state after booking
  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-2">
            Your <strong>{service.name}</strong> has been booked for{" "}
            <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You can track your booking in the Dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/services"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Book Another
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get minimum date (today) for date picker
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/services"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-6 inline-block"
        >
          ← Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Summary (sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {service.category}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-3 mb-2">
                  {service.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    ₹{service.price}
                    <span className="text-xs text-gray-500 font-normal">
                      /visit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Book This Service
              </h1>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
                  >
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address where service is needed"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Special Instructions (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific details about the work needed..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                  />
                </div>

                {/* Price summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Service charge</span>
                    <span>₹{service.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Visit fee</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-blue-600">₹{service.price}</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-base"
                >
                  {loading ? "Processing..." : `Confirm Booking — ₹${service.price}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
