/**
 * services.js
 * -----------
 * This file acts as our "database" for services.
 * In the real app, this data would come from the Django backend API.
 * Each service mirrors the Django Service model:
 *   - id, name, description, price, category, image, rating, workers
 */

const services = [
  {
    id: 1,
    name: "Electrical Repair",
    description:
      "Professional electrical repair and installation services. We handle wiring, switches, outlets, circuit breakers, and complete electrical inspections for your home.",
    price: 49,
    category: "Electrician",
    image:
      "https://images.pexels.com/photos/7285965/pexels-photo-7285965.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.8,
    workers: ["Mike Johnson", "Sarah Lee"],
  },
  {
    id: 2,
    name: "Plumbing Services",
    description:
      "Expert plumbing for leaks, pipe fitting, drain cleaning, faucet repair, water heater installation, and bathroom renovations. Fast and reliable service.",
    price: 59,
    category: "Plumber",
    image:
      "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.7,
    workers: ["David Chen", "Emma Wilson"],
  },
  {
    id: 3,
    name: "Carpentry Work",
    description:
      "Custom carpentry and woodworking services including furniture repair, cabinet installation, door fitting, shelving, and deck construction.",
    price: 65,
    category: "Carpenter",
    image:
      "https://images.pexels.com/photos/5974413/pexels-photo-5974413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.9,
    workers: ["James Brown", "Alex Turner"],
  },
  {
    id: 4,
    name: "Home Cleaning",
    description:
      "Thorough deep cleaning services for your entire home. Includes kitchen, bathrooms, bedrooms, living areas, and optional window cleaning.",
    price: 39,
    category: "Cleaner",
    image:
      "https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.6,
    workers: ["Lisa Park", "Maria Garcia"],
  },
  {
    id: 5,
    name: "AC Repair & Service",
    description:
      "Complete air conditioning repair, maintenance, and installation. We service all brands including split AC, window AC, and central air systems.",
    price: 55,
    category: "AC Repair",
    image:
      "https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.7,
    workers: ["Robert Kim", "Tom Harris"],
  },
  {
    id: 6,
    name: "Painting Services",
    description:
      "Interior and exterior painting for homes and offices. We use premium paints and professional techniques for a flawless finish every time.",
    price: 45,
    category: "Painter",
    image:
      "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    rating: 4.5,
    workers: ["Chris Evans", "Nina Patel"],
  },
];

export default services;
