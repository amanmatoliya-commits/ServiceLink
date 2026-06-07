/**
 * ServiceCard.jsx
 * ---------------
 * A reusable card component for displaying a single service.
 * Used on both the Home page and Services page.
 */

import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {service.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {service.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
          {service.description}
        </p>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium text-gray-700">
              {service.rating}
            </span>
          </div>
          <div className="text-lg font-bold text-blue-600">
            ₹{service.price}
            <span className="text-xs text-gray-500 font-normal">/visit</span>
          </div>
        </div>

        {/* Book Now Button */}
        <Link
          to={`/book/${service.id}`}
          className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
