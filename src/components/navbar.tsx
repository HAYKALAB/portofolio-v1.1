"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Check } from "lucide-react";
import { languages, type LanguageCode } from "@/app/data/bahasa";
import { useLanguage } from "@/app/data/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.study, href: "#study" },
    { label: ((t.nav as unknown) as { projects: string }).projects ?? "Projects", href: "#projects" },
    { label: t.nav.certificate, href: "#certificate" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    function handleScroll() {
      const heroHeight = window.innerHeight * 0.72;
      const y = window.scrollY;
      setShowNavbar(y > heroHeight);
      if (y <= heroHeight) {
        setMobileOpen(false);
        setLangOpen(false);
      }
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        showNavbar
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="mt-3 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-[#070B14]/75 backdrop-blur-xl px-3 sm:px-4 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <a href="#" className="font-mono text-[11px] tracking-[0.16em] text-slate-200">
            AHMAD<span className="text-slate-500">/</span>HAYKAL
          </a>

          <div className="hidden sm:flex items-center gap-1 rounded-full bg-white/[0.06] border border-white/10 p-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
              >
                <Globe size={13} className="text-slate-400" />
                <span className="uppercase tracking-widest text-[11px]">{lang}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-[#0B1220] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  >
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLang(item.code as LanguageCode);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                          lang === item.code
                            ? "bg-white text-black font-semibold"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.name}</span>
                        </span>
                        {lang === item.code && <Check size={12} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-slate-100 transition-colors"
            >
              {t.nav.talkBtn}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="sm:hidden mt-2 rounded-[20px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <p className="px-2 text-[10px] font-mono tracking-[0.16em] text-slate-500">LANGUAGE</p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setLang(item.code as LanguageCode);
                        setMobileOpen(false);
                      }}
                      className={`rounded-full px-2 py-2 text-xs font-medium border transition-colors ${
                        lang === item.code
                          ? "bg-white text-black border-white"
                          : "bg-white/[0.06] text-slate-300 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <span>{item.flag}</span> {item.code.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex h-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black"
                >
                  {t.nav.talkBtn}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
