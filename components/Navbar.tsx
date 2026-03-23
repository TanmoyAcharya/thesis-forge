"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              ⚗️ ThesisForge
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              How It Works
            </a>
            <a
              href="#fields"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Fields
            </a>
            <a
              href="#pricing"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Pricing
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/generate"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
            >
              Start Generating →
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-4 py-4 flex flex-col gap-4">
          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#fields"
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Fields
          </a>
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <Link
            href="/generate"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Start Generating →
          </Link>
        </div>
      )}
    </nav>
  );
}
