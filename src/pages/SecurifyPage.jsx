/**
 * SecurifyPage.jsx
 * ----------------
 * A full-screen cinematic hero section for "securify" —
 * a data-security SaaS landing page.
 *
 * Features:
 * - Looping fullscreen background video
 * - Floating pill-shaped navbar
 * - Giant staggered typography
 * - Stat blocks with diagonal dividers
 * - Bottom gradient overlay
 * - Fully responsive (mobile + desktop)
 *
 * Design: Pure black/white/neutral palette — no colors.
 */

import { useState } from "react";

/* =============================================
   SVG LOGO COMPONENT
   ============================================= */
function SecurifyLogo() {
  return (
    <svg
      viewBox="0 0 256 256"
      className="h-5 w-5"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z" />
      <path d="M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
      <path d="M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z" />
      <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
    </svg>
  );
}

/* =============================================
   NAVBAR COMPONENT
   ============================================= */
function SecurifyNavbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = ["platform", "solutions", "company", "support"];

  return (
    <nav className="absolute z-20 px-6 md:px-10 pt-6 top-0 left-0 right-0">
      <div className="flex items-center justify-between gap-4">
        {/* Left Pill — Logo + Brand */}
        <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3">
          <SecurifyLogo />
          <span className="text-white text-sm font-normal tracking-tight">
            securify
          </span>
        </div>

        {/* Center Pill — Nav Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right — Get Started Button + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
          >
            get started
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden bg-neutral-900/90 backdrop-blur rounded-full p-3"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden mt-3 bg-neutral-900/95 backdrop-blur-lg rounded-2xl p-4 animate-slide-up">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="block text-neutral-300 hover:text-white transition-colors text-sm px-4 py-3 rounded-xl hover:bg-white/5"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* =============================================
   DIAGONAL DIVIDER — decorative line
   ============================================= */
function DiagonalDivider({ rotate = "20deg" }) {
  return (
    <div
      className="hidden md:block h-px w-24 bg-white/40"
      style={{ transform: `rotate(${rotate})` }}
    />
  );
}

/* =============================================
   MAIN SECURIFY PAGE
   ============================================= */
export default function SecurifyPage() {
  return (
    <section className="securify-page relative h-screen w-full overflow-hidden bg-black">
      {/* ==========================================
          BACKGROUND VIDEO
          ========================================== */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />

      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ==========================================
          NAVBAR
          ========================================== */}
      <SecurifyNavbar />

      {/* ==========================================
          FOREGROUND CONTENT
          ========================================== */}
      <div className="relative h-full w-full">
        {/* ---- STAT: Top Right (+65k) ---- */}
        <div className="absolute right-6 md:right-24 top-[14%]">
          <div className="flex items-center gap-3 justify-end">
            <DiagonalDivider rotate="20deg" />
            <span className="text-4xl md:text-5xl font-medium tracking-tight text-white">
              +65k
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right">
            startups use
          </p>
        </div>

        {/* ---- GIANT HEADLINE: "protect" ---- */}
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%]">
          protect
        </h1>

        {/* ---- GIANT HEADLINE: "your" ---- */}
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%]">
          your
        </h1>

        {/* ---- DESCRIPTION PARAGRAPH ---- */}
        <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90">
          we can guarding your data with utmost care, empowering you with
          privacy everywhere
        </p>

        {/* ---- GIANT HEADLINE: "data" ---- */}
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%]">
          data
        </h1>

        {/* ---- STAT: Bottom Left (+1.5b) ---- */}
        <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl font-medium tracking-tight text-white">
              +1.5b
            </span>
            <DiagonalDivider rotate="-20deg" />
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1">
            gb data was protected
          </p>
        </div>

        {/* ---- STAT: Bottom Right (+300k) ---- */}
        <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20">
          <div className="flex items-center gap-3 justify-end">
            <DiagonalDivider rotate="-20deg" />
            <span className="text-4xl md:text-5xl font-medium tracking-tight text-white">
              +300k
            </span>
          </div>
          <p className="text-xs md:text-sm text-white/70 mt-1 text-right">
            downloads
          </p>
        </div>

        {/* ---- BOTTOM GRADIENT OVERLAY ---- */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
      </div>
    </section>
  );
}
