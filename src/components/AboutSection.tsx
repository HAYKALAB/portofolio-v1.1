"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StarField from "./angkasa/startField";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { useLanguage } from "@/app/data/LanguageContext";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const MY_LOCATION = {
  lat: -6.2,
  lng: 106.8,
  label: "Indonesia",
};

export default function AboutSection() {
  const { t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 360, height: 360 });
  const [mounted, setMounted] = useState(false);
  const [hasFlown, setHasFlown] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    function handleResize() {
      const calculatedSize = Math.min(window.innerWidth - 32, 440);
      const w = window.innerWidth;
      const minSize = w < 380 ? 280 : 300;
      const finalSize = Math.max(minSize, calculatedSize);
      setDimensions({ width: finalSize, height: finalSize });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mounted || !globeRef.current) return;
    try {
      globeRef.current.controls().enableZoom = false;
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView({ lat: 10, lng: -40, altitude: 3.2 }, 0);
    } catch (err) {
      console.warn("Globe initial camera setup skipped:", err);
    }
  }, [mounted]);

  useEffect(() => {
    const el = globeWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFlown && globeRef.current) {
          setHasFlown(true);
          try {
            globeRef.current.pointOfView(
              { lat: MY_LOCATION.lat, lng: MY_LOCATION.lng, altitude: 1.75 },
              2200
            );
            setTimeout(() => {
              if (globeRef.current) {
                globeRef.current.controls().autoRotate = true;
                globeRef.current.controls().autoRotateSpeed = 0.35;
              }
            }, 2400);
          } catch (e) {
            console.warn("Globe animation failed:", e);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasFlown]);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#070B14] px-4 sm:px-10 md:px-16 py-20 sm:py-28"
    >
      <StarField />
      {/* soft editorial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_12%_20%,rgba(56,189,248,0.09),transparent_60%),radial-gradient(700px_400px_at_90%_80%,rgba(99,102,241,0.07),transparent_60%)]" />

      <div className="max-w-[1160px] mx-auto relative z-10">
        {/* section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400">
            01 — ABOUT
          </span>
          <span className="h-px flex-1 max-w-[220px] bg-white/10 hidden sm:block" />
        </motion.div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-10 items-center">
          {/* left */}
          <div className="space-y-7">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold tracking-[-0.05em] leading-[0.9] text-white whitespace-pre-line text-[clamp(1.9rem,4.5vw,3.2rem)]"
            >
              {t.about?.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="text-[14px] sm:text-[15px] leading-relaxed text-slate-400 max-w-[560px]"
            >
              {t.about?.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="flex flex-wrap gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-slate-200">
                Bekasi, Indonesia
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-slate-200">
                Software Engineering
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-black px-3.5 py-2 text-xs font-semibold">
                Terbuka untuk magang & freelance
              </span>
            </motion.div>

            {/* photo card — responsif HP */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
            >
              <div className="relative w-[72vw] max-w-[260px] aspect-[188/242] sm:w-[188px] sm:h-[242px] sm:aspect-auto sm:max-w-none rounded-[18px] overflow-hidden border border-white/10 bg-[#0B1220] shadow-[0_20px_60px_rgba(0,0,0,0.45)] shrink-0 mx-auto sm:mx-0">
                <Image
                  src="/images/profile.jpg"
                  alt="Ahmad Al Haykal"
                  fill
                  priority
                  sizes="(max-width: 640px) 72vw, 188px"
                  className="object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.9)_0.8px,transparent_0.8px)] [background-size:14px_14px]" />
                <div className="absolute bottom-0 inset-x-0 h-[42%] bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-white/80">HAYKAL — ’26</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </div>
              </div>

              <div className="w-full sm:max-w-[260px] pt-1 text-center sm:text-left">
                <p className="text-xs leading-relaxed text-slate-400">
                  Saya senang memperhatikan detail hingga produk terasa matang dan nyaman digunakan.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {["Detail-oriented", "Fast learner", "Team player"].map((x) => (
                    <span key={x} className="text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* right: globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center lg:items-end"
          >
            <div
              ref={globeWrapperRef}
              className="relative flex items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur p-2 sm:p-3 max-w-[calc(100vw-32px)] overflow-hidden"
              style={{ width: dimensions.width, height: dimensions.height }}
            >
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(600px_320px_at_50%_18%,rgba(56,189,248,0.16),transparent_70%)] blur-[1px]" />
              {mounted && (
                <WebGLErrorBoundary>
                  <Globe
                    ref={globeRef}
                    width={dimensions.width - 14}
                    height={dimensions.height - 14}
                    backgroundColor="rgba(0,0,0,0)"
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    atmosphereColor="#38BDF8"
                    atmosphereAltitude={0.18}
                    htmlElementsData={[MY_LOCATION]}
                    htmlLat="lat"
                    htmlLng="lng"
                    htmlElement={() => {
                      const el = document.createElement("div");
                      el.innerHTML = `
                      <div style="position:relative; width:14px; height:14px;">
                        <div style="
                          position:absolute; inset:0;
                          background:#38BDF8; border-radius:50%;
                        "></div>
                        <div style="
                          position:absolute; inset:-4px;
                          border:1px solid #38BDF8; border-radius:50%;
                          animation: pin-pulse 2s ease-out infinite;
                        "></div>
                      </div>
                    `;
                      return el;
                    }}
                  />
                </WebGLErrorBoundary>
              )}
            </div>
            <p className="mt-3 text-[11px] font-mono tracking-widest text-slate-500 text-center lg:text-right">
              BEKASI — 6.2°S 106.8°E • BUILDING FOR THE WORLD
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
