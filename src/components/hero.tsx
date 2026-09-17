"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ArrowRight, Code2, ChevronDown, Globe, Check } from "lucide-react";
import { useLanguage } from "@/app/data/LanguageContext";
import { languages, type LanguageCode } from "@/app/data/bahasa";
import StarField from "@/components/angkasa/startField";
import TataSuryaBg from "@/components/angkasa/TataSuryaBg";

export default function HeroSection() {
  const { lang, setLang, t } = useLanguage();
  const [isOpenLang, setIsOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // spotlight follows cursor — desktop only, very cheap
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlightLeft = useMotionTemplate`${sx}%`;
  const spotlightTop = useMotionTemplate`${sy}%`;

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mx.set(x);
      my.set(y);
    }
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, [mx, my]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsOpenLang(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] flex flex-col overflow-hidden bg-[#070B14]">
      {/* bg */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <StarField />
        <div className="absolute inset-0 opacity-[0.18] overflow-hidden bg-[radial-gradient(600px_400px_at_80%_70%,rgba(56,189,248,0.12),transparent_70%)]" />
        <TataSuryaBg />
        {/* musea-like soft radials */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_18%_-10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(800px_500px_at_92%_8%,rgba(99,102,241,0.14),transparent_62%),radial-gradient(700px_500px_at_50%_110%,rgba(14,165,233,0.08),transparent_60%)]" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14]/0 via-[#070B14]/0 to-[#070B14]" />
      </div>

      {/* spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 hidden md:block h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.38] blur-[1px]"
        style={{
          left: spotlightLeft,
          top: spotlightTop,
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.22), rgba(56,189,248,0.0) 68%)",
        }}
      />

      {/* header */}
      <div className="flex items-center justify-between w-full px-4 sm:px-10 md:px-16 pt-6 z-10">
        <div className="font-mono text-[11px] sm:text-xs tracking-[0.16em] text-slate-400">
          AHMAD<span className="text-slate-600">/</span>HAYKAL
        </div>
        <span className="hidden sm:inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] text-slate-500 border border-white/10 rounded-full px-3 py-1.5 bg-white/[0.04] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          AVAILABLE FOR WORK ’26
        </span>
        <span className="sm:hidden text-[10px] font-mono tracking-widest text-slate-500">PORTFOLIO ’26</span>
      </div>

      {/* main */}
      <div className="flex-1 flex items-center px-4 sm:px-10 md:px-16 max-w-[100vw] overflow-hidden">
        <div className="w-full max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-6 items-center py-10 sm:py-14">
          {/* left: typo besar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur px-3 py-1.5 text-[11px] text-slate-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              {t.hero.title}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-[700] tracking-[-0.05em] leading-[0.84] text-white break-words"
            >
              <span className="block text-[clamp(2.2rem,9vw,6.2rem)]">AHMAD</span>
              <span className="block text-[clamp(2.2rem,9vw,6.2rem)] bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                AL HAYKAL
              </span>
              <span className="block mt-3 text-[clamp(1.05rem,2.2vw,1.55rem)] font-body font-[400] tracking-[-0.02em] leading-[1.1] text-slate-300/90">
                Siswa Rekayasa Perangkat Lunak — belajar otodidak menuju Full-stack Developer. Saat ini fokus di Frontend, sudah mencoba Backend juga.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="flex items-center gap-2 text-[13px] sm:text-[15px] text-slate-400 min-h-[2.2rem]"
            >
              <span className="hidden sm:inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300">
                <Code2 size={14} />
              </span>
              <span className="flex-1">
                <Typewriter
                  key={lang}
                  options={{
                    strings: t.hero.runningText,
                    autoStart: true,
                    loop: true,
                    delay: 34,
                    deleteSpeed: 22,
                  }}
                />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              <a
                href="#contact"
                className="inline-flex h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white text-black px-6 text-[13px] font-semibold hover:bg-slate-100 transition-colors"
              >
                {t.hero.contactBtn} <ArrowRight size={15} />
              </a>
              <a
                href="#about"
                className="inline-flex h-[44px] w-full sm:w-auto items-center justify-center rounded-full border border-white/12 bg-white/[0.06] backdrop-blur text-slate-100 px-6 text-[13px] font-medium hover:bg-white/[0.09] transition-colors"
              >
                {t.hero.seeBtn} — explore
              </a>

              <div className="relative sm:ml-1 w-full sm:w-auto" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setIsOpenLang(!isOpenLang)}
                  className="w-full sm:w-auto h-[44px] px-4 rounded-full border border-white/10 bg-[#0B1220]/70 backdrop-blur text-slate-200 text-[13px] font-medium flex items-center justify-between sm:justify-start gap-2 hover:bg-white/[0.06] transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Globe size={14} className="text-slate-400" />
                    <span className="uppercase tracking-widest text-[11px]">{lang}</span>
                  </span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${isOpenLang ? "rotate-180" : ""}`} />
                </button>
                {isOpenLang && (
                  <div className="absolute left-0 sm:left-0 top-full mt-2 w-full sm:w-48 max-h-64 overflow-auto bg-[#0B1220] border border-white/10 rounded-2xl p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50">
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLang(item.code as LanguageCode);
                          setIsOpenLang(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors ${
                          lang === item.code ? "bg-white text-black font-semibold" : "hover:bg-white/10 text-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.name}</span>
                        </span>
                        {lang === item.code && <Check size={13} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
              className="pt-5 mt-2 border-t border-white/[0.08]"
            >
              <p className="text-[10px] font-mono tracking-[0.18em] text-slate-500 mb-2.5">TEKNOLOGI UTAMA</p>
              <div className="flex flex-wrap gap-2">
                {["Next.js • TypeScript", "React • Tailwind", "NestJS • PostgreSQL", "Framer Motion"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-slate-200 backdrop-blur"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* right: editorial card — anti-AI, human, asymmetric */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:pl-6"
          >
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-[1px] overflow-hidden">
              <div className="rounded-[26px] bg-[#0B1220]/70 p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.18em] text-slate-400">PROYEK — 2026</span>
                  <span className="text-[10px] font-mono text-slate-500">ID • BEKASI</span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { k: "1", v: "featured\nbuild" },
                    { k: "4", v: "certificates" },
                    { k: "2026→", v: "building\nsince 2026" },
                  ].map((it) => (
                    <div key={it.k} className="rounded-2xl bg-white/[0.05] border border-white/10 p-4">
                      <div className="text-[22px] font-display font-bold tracking-tight text-white leading-none">{it.k}</div>
                      <div className="text-[11px] leading-[1.2] text-slate-400 whitespace-pre-line mt-1.5">{it.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#070B14]/60 p-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> SEDANG DIKEMBANGKAN
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-200">
                    Platform booking futsal dengan dashboard yang efisien, pengecekan jadwal real-time, dan pengalaman mobile yang optimal.
                    <span className="text-slate-400"> Next up: polish & deploy.</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Next.js", "NestJS", "PostgreSQL", "Tailwind"].map((t) => (
                      <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-white text-black font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>© AHMAD AL HAYKAL</span>
                  <span className="hidden sm:inline">SCROLL KUY ↓</span>
                </div>
              </div>
            </div>

            {/* soft glow behind card */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(600px_320px_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)] blur-[1px]" />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 pb-6 z-10">
        <span className="text-[9px] tracking-[0.22em] font-mono text-slate-500">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={14} className="text-slate-500" />
        </motion.div>
      </div>
    </section>
  );
}
