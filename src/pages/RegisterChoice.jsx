/**
 * RegisterChoice.jsx
 * -------------------
 * Entry point for new sign-ups. Lets a visitor pick which side of
 * ServiceLink they're joining before the actual registration form.
 *
 * Routes to:
 *   /register/customer
 *   /register/professional
 */

import { useNavigate } from "react-router-dom";
import { User, Wrench, ArrowRight } from "lucide-react";

export default function RegisterChoice() {
  const navigate = useNavigate();

  const choices = [
    {
      key: "customer",
      icon: User,
      title: "Register as Customer",
      description:
        "Book trusted electricians, plumbers, carpenters, AC repair, cleaning and more.",
      button: "Continue as Customer",
      path: "/register/customer",
      accent: "blue",
    },
    {
      key: "professional",
      icon: Wrench,
      title: "Register as Professional",
      description:
        "Provide your services, receive bookings and grow your business through ServiceLink.",
      button: "Continue as Professional",
      path: "/register/professional",
      accent: "indigo",
    },
  ];

  const accentStyles = {
    blue: {
      iconWrap: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      ring: "hover:border-blue-300 hover:shadow-blue-100",
      button:
        "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-600",
    },
    indigo: {
      iconWrap:
        "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
      ring: "hover:border-indigo-300 hover:shadow-indigo-100",
      button:
        "bg-indigo-600 hover:bg-indigo-700 focus-visible:outline-indigo-600",
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Join ServiceLink
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Choose how you want to use ServiceLink.
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {choices.map((choice) => {
            const Icon = choice.icon;
            const styles = accentStyles[choice.accent];

            return (
              <button
                key={choice.key}
                type="button"
                onClick={() => navigate(choice.path)}
                className={`group text-left bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 transition-all duration-200 hover:shadow-lg ${styles.ring} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-200 ${styles.iconWrap}`}
                >
                  <Icon size={28} strokeWidth={2} />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {choice.title}
                </h2>

                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8">
                  {choice.description}
                </p>

                <span
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors duration-200 ${styles.button}`}
                >
                  {choice.button}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}