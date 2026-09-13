// components/AboutSection.tsx
"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import FadeIn from "@/components/animasi/FadeIn";
import StarField from "./angkasa/startField";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const MY_LOCATION = {
  lat: -6.2,
  lng: 106.8,
  label: "Indonesia",
};

export default function AboutSection() {
  const globeRef = useRef<any>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [mounted, setMounted] = useState(false);
  const [hasFlown, setHasFlown] = useState(false);

  useEffect(() => {
    setMounted(true);

    function handleResize() {
      const size = Math.min(window.innerWidth * 0.4, 460);
      setDimensions({ width: size, height: size });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // set up kamera awal: view "jauh" begitu globe pertama render
  useEffect(() => {
    if (!mounted || !globeRef.current) return;
    globeRef.current.controls().enableZoom = false;
    globeRef.current.controls().autoRotate = false; // biar nggak numpuk sama animasi terbang

    // posisi awal: agak jauh, ngarah ke titik netral (bukan Indonesia)
    globeRef.current.pointOfView({ lat: 10, lng: -40, altitude: 3.2 }, 0);
  }, [mounted]);

  // deteksi kapan globe-nya masuk viewport -> baru mulai "terbang" ke Indonesia
  useEffect(() => {
    const el = globeWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFlown && globeRef.current) {
          setHasFlown(true);

          // animasi terbang ke Indonesia, durasi 2.5 detik
          globeRef.current.pointOfView(
            { lat: MY_LOCATION.lat, lng: MY_LOCATION.lng, altitude: 1.8 },
            2500
          );

          // begitu animasi terbang kelar, baru nyalain auto-rotate pelan
          setTimeout(() => {
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = true;
              globeRef.current.controls().autoRotateSpeed = 0.4;
            }
          }, 2600);

          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasFlown]);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 sm:px-10 md:px-16 py-20 bg-[#070B14] overflow-hidden">
      <StarField />
      <FadeIn direction="left" className="max-w-md">
        <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
          About Me
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
          Ngoding dari Indonesia,
          <br /> buat siapa aja di dunia.
        </h2>
        <p className="text-slate-400 mt-4 leading-relaxed">
          Full Stack Developer Enthusiast yang berbasis di Indonesia,
          terbiasa kerja dengan React, Node.js, dan ekosistem JavaScript
          modern buat bangun aplikasi web dari ujung ke ujung.
        </p>
      </FadeIn>

      <FadeIn direction="right" delay={200}>
        <div
          ref={globeWrapperRef}
          className="relative"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          {mounted && (
            <Globe
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              atmosphereColor="#3B82F6"
              atmosphereAltitude={0.2}
              htmlElementsData={[MY_LOCATION]}
              htmlLatitude="lat"
              htmlLongitude="lng"
              htmlElement={() => {
                const el = document.createElement("div");
                el.innerHTML = `
                  <div style="position:relative; width:16px; height:16px;">
                    <div style="
                      position:absolute; inset:0;
                      background:#60A5FA; border-radius:50%;
                      box-shadow:0 0 12px 4px rgba(96,165,250,0.8);
                    "></div>
                    <div style="
                      position:absolute; inset:0;
                      background:#60A5FA; border-radius:50%;
                      animation: pin-pulse 2s ease-out infinite;
                    "></div>
                  </div>
                `;
                return el;
              }}
            />
          )}
        </div>
      </FadeIn>
    </section>
  );
}