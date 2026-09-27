"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contacts", href: "#contacts" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFDFD]/80 backdrop-blur-md border-b border-gray-100/80 transition-colors">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Logo (Gaya LucaDCZ) */}
        <Link href="#home" className="text-xl font-bold tracking-tight hover:opacity-80 transition">
          Portfolio<span className="text-blue-600">.</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Button: Dark/Light Mode Switcher */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-full border border-gray-200/80 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition shadow-sm"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Tombol Hamburger Menu (Untuk Layar HP / Mobile) */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Dropdown Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-gray-100 px-6 py-4 space-y-4 shadow-lg backdrop-blur-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}