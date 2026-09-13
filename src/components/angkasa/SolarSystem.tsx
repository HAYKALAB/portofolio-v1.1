
"use client";

import { useRef, useEffect, useState } from "react";

const PLANETS = [
  { name: "Merkurius", radius: 30, size: 5, duration: 4, color: "#A8A29E" },
  { name: "Venus", radius: 46, size: 7, duration: 7, color: "#F4C77B" },
  { name: "Bumi", radius: 64, size: 8, duration: 10, color: "#4D8FE0" },
  { name: "Mars", radius: 80, size: 6, duration: 14, color: "#E0724D" },
  { name: "Yupiter", radius: 104, size: 14, duration: 22, color: "#E0B48C" },
  { name: "Saturnus", radius: 132, size: 12, duration: 30, color: "#E8D5A3" },
  { name: "Uranus", radius: 156, size: 9, duration: 38, color: "#9FE0DA" },
  { name: "Neptunus", radius: 176, size: 9, duration: 46, color: "#5C7FE0" },
];

export default function SolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSucked, setIsSucked] = useState(false);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      current.current = { x: rect.left, y: rect.top + window.scrollY };
    }
  }, []);

  useEffect(() => {
    function animate() {
      if (isSucked) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      const blackhole = document.getElementById("blackhole-core");
      if (blackhole) {
        const rect = blackhole.getBoundingClientRect();
        target.current = {
          x: rect.left + rect.width / 2 - 176,
          y: rect.top + window.scrollY + rect.height / 2 - 176,
        };
      }

      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // RESPONSIF: Radius tarikan disesuaikan dengan lebar layar saat ini
      const maxDist = Math.max(window.innerWidth * 0.9, 500); 
      const shrinkDist = maxDist * 0.35; // Pengecilan dimulai pada 35% dari maxDist

      const proximity = Math.max(0, 1 - dist / maxDist);
      
      // Kecepatan disesuaikan agar tidak over-speed di layar kecil
      const speed = 0.0003 + Math.pow(proximity, 3) * 0.025;

      current.current.x += dx * speed;
      current.current.y += dy * speed;

      const closeProximity = Math.max(0, Math.min(1, dist / shrinkDist));
      scale.current = 0.25 + closeProximity * 0.75;

      if (dist < 30) {
        setIsSucked(true);
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) scale(${scale.current})`;
      }

      rafId.current = requestAnimationFrame(animate);
    }

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isSucked]);

  if (isSucked) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-[352px] h-[352px] pointer-events-none z-30 transition-opacity duration-300"
      style={{ willChange: "transform" }}
    >
      {/* Matahari */}
      <div
        className="absolute rounded-full"
        style={{
          width: 20,
          height: 20,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#FBBF24",
          boxShadow: "0 0 24px 6px rgba(251,191,36,0.5)",
        }}
      />

      {/* Orbit tiap planet */}
      {PLANETS.map((planet) => (
        <div
          key={planet.name}
          className="absolute"
          style={{
            width: planet.radius * 2,
            height: planet.radius * 2,
            top: "50%",
            left: "50%",
            marginLeft: -planet.radius,
            marginTop: -planet.radius,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            animation: `orbit-spin ${planet.duration}s linear infinite`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: planet.size,
              height: planet.size,
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: planet.color,
            }}
          />
        </div>
      ))}
    </div>
  );
}