/**
 * DashboardPage.jsx
 * -----------------
 * User dashboard showing:
 * - Profile information
 * - Booking history with status
 * - Quick actions
 *
 * In the real app, data comes from:
 *   GET /api/users/profile/
 *   GET /api/bookings/my-bookings/
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserBookings, cancelBooking } from "../data/bookings";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DashboardPage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" or "profile"
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Load user bookings (simulates API call)
    setTimeout(() => {
      const userBookings = getUserBookings(user.id);
      setBookings(userBookings.sort((a, b) => b.id - a.id)); // Newest first
      setProfileData({
        name: user.name,
        phone: user.phone || "",
        address: user.address || "",
      });
      setLoading(false);
    }, 300);
  }, [isAuthenticated, user, navigate]);

  // Handle booking cancellation
  function handleCancel(bookingId) {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(bookingId);
      // Refresh bookings
      const updated = getUserBookings(user.id);
      setBookings(updated.sort((a, b) => b.id - a.id));
    }
  }

  // Handle profile update
  function handleProfileSave(e) {
    e.preventDefault();
    updateProfile(profileData);
    setEditProfile(false);
  }

  // Status badge color helper
  function getStatusColor(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  if (!isAuthenticated) return null;
  if (loading) return <LoadingSpinner message="Loading your dashboard..." />;

  // Calculate stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const completedBookings = bookings.filter(
    (b) => b.status === "Completed"
  ).length;
  const totalSpent = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + (b.servicePrice || 0), 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-blue-100">
            Manage your bookings and profile from here.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Bookings",
              value: totalBookings,
              icon: "📋",
              color: "bg-blue-50 text-blue-700",
            },
            {
              label: "Pending",
              value: pendingBookings,
              icon: "⏳",
              color: "bg-yellow-50 text-yellow-700",
            },
            {
              label: "Completed",
              value: completedBookings,
              icon: "✅",
              color: "bg-green-50 text-green-700",
            },
            {
              label: "Total Spent",
              value: `$${totalSpent}`,
              icon: "💰",
              color: "bg-purple-50 text-purple-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-4 md:p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${stat.color}`}
                >
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg shadow-sm p-1 mb-6 max-w-xs">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === "bookings"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              activeTab === "profile"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Profile
          </button>
        </div>

        {/* ========== BOOKINGS TAB ========== */}
        {activeTab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              /* No bookings yet */
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Bookings Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't booked any services yet. Start by browsing our
                  services!
                </p>
                <Link
                  to="/services"
                  className="inline-flex px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Services
                </Link>
              </div>
            ) : (
              /* Bookings list */
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-xl shadow-sm p-5 md:p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {booking.serviceName}
                          </h3>
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                          <span>📅 {booking.date}</span>
                          <span>⏰ {booking.time}</span>
                          <span>📍 {booking.address}</span>
                          <span className="font-semibold text-blue-600">
                            💰 ${booking.servicePrice}
                          </span>
                        </div>
                        {booking.notes && (
                          <p className="text-sm text-gray-500 mt-2 italic">
                            Note: {booking.notes}
                          </p>
                        )}
                      </div>

                      {/* Cancel button — only for Pending bookings */}
                      {booking.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========== PROFILE TAB ========== */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Profile Information
              </h2>
              {!editProfile && (
                <button
                  onClick={() => setEditProfile(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editProfile ? (
              /* Edit profile form */
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditProfile(false)}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Display profile */
              <div className="space-y-4">
                <div className="flex items-center space-x-4 pb-4 border-b">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Email
                    </span>
                    <p className="text-sm text-gray-900 mt-1">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </span>
                    <p className="text-sm text-gray-900 mt-1">
                      {user.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      Address
                    </span>
                    <p className="text-sm text-gray-900 mt-1">
                      {user.address || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
