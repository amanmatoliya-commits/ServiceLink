/**
 * bookings.js
 * -----------
 * This simulates the Django Booking model.
 * In the real app, bookings are stored in SQLite via Django ORM.
 *
 * We use localStorage to persist bookings in the browser.
 * Each booking has: id, userId, serviceId, serviceName, date, time, status, address, notes
 */

// Key used in localStorage
const STORAGE_KEY = "urban_home_bookings";

/**
 * Get all bookings from localStorage
 */
export function getAllBookings() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Get bookings for a specific user
 */
export function getUserBookings(userId) {
  const bookings = getAllBookings();
  return bookings.filter((b) => b.userId === userId);
}

/**
 * Create a new booking
 * Returns the created booking object
 */
export function createBooking(bookingData) {
  const bookings = getAllBookings();

  // Generate a simple unique ID
  const newBooking = {
    id: Date.now(),
    ...bookingData,
    status: "Pending", // New bookings start as "Pending"
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

  return newBooking;
}

/**
 * Cancel a booking by ID
 */
export function cancelBooking(bookingId) {
  const bookings = getAllBookings();
  const updated = bookings.map((b) =>
    b.id === bookingId ? { ...b, status: "Cancelled" } : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
