/**
 * Header.jsx
 * ----------
 * Top navigation bar with logo, nav links, and a responsive mobile menu.
 */

import { useState } from "react";
import { Search, Menu, X, Zap } from "lucide-react";

const Header = () => {
  // Track whether the mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Home", "Products", "About"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Zap size={16} className="text-white" />
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 bg-violet-500 rounded-lg blur-md opacity-40 -z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              SmartSearch
            </span>
          </div>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-200">
              <Search size={14} />
              Start Searching
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 border-t border-white/10 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
