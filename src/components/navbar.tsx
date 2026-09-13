// components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Study", href: "#study" },
  { label: "Certificate", href: "#certificate" },
  { label: "Contact Me", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      ref={menuRef}
      className={`sticky top-0 z-50 px-6 sm:px-10 md:px-16 py-4 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#070B14]/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold tracking-tight text-lg">
          Portfolio<span className="text-blue-400">.</span>
        </span>

        <div className="hidden sm:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden sm:inline-flex items-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Let&apos;s Talk
        </a>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          className="sm:hidden text-white p-1"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 pb-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors text-sm font-medium px-3 py-2.5 rounded-lg"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-lg"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </nav>
  );
}