import { useState, useMemo, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch services from Django API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services/")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) =>
        console.error("Error fetching services:", error)
      );
  }, []);

  const categories = [
    "All",
    ...new Set(services.map((service) => service.category)),
  ];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" ||
        service.category === selectedCategory;

      const matchesSearch =
        service.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        service.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Our Services
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Browse our complete range of home services.
            Every professional is background-checked and highly rated.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <div className="flex-1">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filteredServices.length} service
          {filteredServices.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" &&
            ` in "${selectedCategory}"`}
        </p>

        {/* Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No services found
            </h3>

            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>

            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}