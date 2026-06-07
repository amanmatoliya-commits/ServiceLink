/**
 * CLEAN + MODERN HomePage.jsx
 * ------------------------------------------------
 * Urban Company inspired homepage
 * Practical • Modern • Trustworthy • Clean
 */

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

export default function HomePage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services/")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) =>
        console.error("Error fetching services:", error)
      );
  }, []);

  const featuredServices = services.slice(0, 6);

  return (
    <div className="bg-white text-slate-900 overflow-hidden">

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <section className="border-b bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE */}
            <div>

              {/* HEADING */}
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">

                Home services
                <br />

                at your
                <br />

                doorstep

              </h1>

              {/* SUBTEXT */}
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-10">

                Book trusted professionals for electrical repair,
                plumbing, cleaning, AC repair, carpentry and more —
                all from the comfort of your home.

              </p>

              {/* CATEGORY GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">

                {[
                  "Electrician",
                  "Plumbing",
                  "Cleaning",
                  "AC Repair",
                  "Carpentry",
                  "Painting",
                ].map((item) => (

                  <div
                    key={item}
                    className="bg-slate-100 hover:bg-slate-200 transition-all duration-300 rounded-2xl p-5 text-center cursor-pointer"
                  >

                    <div className="text-3xl mb-3">
                      {item === "Electrician" && "⚡"}
                      {item === "Plumbing" && "🔧"}
                      {item === "Cleaning" && "🧼"}
                      {item === "AC Repair" && "❄️"}
                      {item === "Carpentry" && "🪚"}
                      {item === "Painting" && "🎨"}
                    </div>

                    <div className="font-semibold text-sm">
                      {item}
                    </div>

                  </div>

                ))}

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4">

                <Link
                  to="/services"
                  className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold text-white text-center"
                >
                  Explore Services
                </Link>

                <Link
                  to="/register"
                  className="px-8 py-4 rounded-2xl border border-slate-300 hover:bg-slate-100 transition-all duration-300 font-semibold text-center"
                >
                  Get Started
                </Link>

              </div>

            </div>

            {/* RIGHT SIDE IMAGE GRID */}
            <div>

              <div className="grid grid-cols-2 gap-4">

                <img
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop"
                  alt="Cleaning"
                  className="rounded-3xl object-cover h-64 w-full"
                />

                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
                  alt="Massage"
                  className="rounded-3xl object-cover h-64 w-full"
                />

                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop"
                  alt="Repair"
                  className="rounded-3xl object-cover h-64 w-full"
                />

                <img
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1000&auto=format&fit=crop"
                  alt="AC Service"
                  className="rounded-3xl object-cover h-64 w-full"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* STATS SECTION */}
      {/* ================================================= */}

      <section className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {[
              { value: "4.8★", label: "Service Rating" },
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Verified Experts" },
              { value: "24/7", label: "Customer Support" },
            ].map((item) => (

              <div key={item.label}>

                <div className="text-3xl font-bold mb-2">
                  {item.value}
                </div>

                <div className="text-slate-500">
                  {item.label}
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* SERVICES SECTION */}
      {/* ================================================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* TITLE */}
          <div className="mb-16">

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Popular services
            </h2>

            <p className="text-slate-600 text-lg">
              Most booked home services by our customers.
            </p>

          </div>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {featuredServices.map((service) => (

              <div
                key={service.id}
                className="hover:-translate-y-2 transition-all duration-300"
              >

                <ServiceCard service={service} />

              </div>

            ))}

          </div>

          {/* BUTTON */}
          <div className="mt-14 text-center">

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-black transition-all duration-300 font-semibold text-white"
            >
              View All Services →
            </Link>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* TITLE */}
          <div className="text-center mb-20">

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How it works
            </h2>

            <p className="text-slate-600 text-lg">
              Book home services in just a few simple steps.
            </p>

          </div>

          {/* STEPS */}
          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                icon: "🔍",
                title: "Choose a Service",
                desc: "Browse through our verified home services and choose what you need.",
              },
              {
                icon: "📅",
                title: "Book Appointment",
                desc: "Select your preferred date and time for the service.",
              },
              {
                icon: "🏠",
                title: "Get Service Done",
                desc: "Our professional expert arrives at your doorstep.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-slate-50 rounded-3xl p-10"
              >

                <div className="text-5xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* TESTIMONIALS */}
      {/* ================================================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* TITLE */}
          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What customers say
            </h2>

            <p className="text-slate-600 text-lg">
              Trusted by thousands of homeowners.
            </p>

          </div>

          {/* TESTIMONIAL GRID */}
          <div className="grid md:grid-cols-3 gap-8">

            {[
              "Excellent service and very professional workers.",
              "Booking process was smooth and simple.",
              "Affordable pricing with great support.",
            ].map((review, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-8 border"
              >

                <div className="text-yellow-500 text-xl mb-5">
                  ★★★★★
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">
                  {review}
                </p>

                <div className="text-sm text-slate-500">
                  Verified Customer
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section className="py-24 bg-slate-900 text-white">

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to book your service?
          </h2>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">

            Join thousands of homeowners using ServiceLink every day.

          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">

            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold text-white"
            >
              Create Free Account
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300 font-semibold text-white"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}