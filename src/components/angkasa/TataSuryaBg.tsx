"use client";
import { useRef, useEffect, useState } from "react";

const PLANETS = [
  { r: 28, size: 4, dur: 3.2, color: "#A8A29E" },
  { r: 40, size: 5, dur: 5.5, color: "#F4C77B" },
  { r: 54, size: 6, dur: 8, color: "#4D8FE0" },
  { r: 68, size: 5, dur: 12, color: "#E0724D" },
  { r: 88, size: 10, dur: 17, color: "#E0B48C" },
  { r: 108, size: 8, dur: 23, color: "#E8D5A3", ring: true },
  { r: 126, size: 7, dur: 30, color: "#9FE0DA" },
  { r: 142, size: 7, dur: 38, color: "#5C7FE0" },
];

export default function TataSuryaBg() {
  const solarRef = useRef<HTMLDivElement>(null);
  const bhRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const upd = () => setIsMobile(window.innerWidth < 640);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    const solar = solarRef.current;
    const bh = bhRef.current;
    if (!solar || !bh) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let sucked = false;

    function tick() {
      if (!solar || !bh) return;
      if (sucked) return;

      const sRect = solar.getBoundingClientRect();
      const bRect = bh.getBoundingClientRect();
      const sCx = sRect.left + sRect.width / 2;
      const sCy = sRect.top + sRect.height / 2;
      const bCx = bRect.left + bRect.width / 2;
      const bCy = bRect.top + bRect.height / 2;

      const dx = bCx - sCx;
      const dy = bCy - sCy;
      const dist = Math.hypot(dx, dy);

      // kalau udah nempel black hole -> ilang sekali aja, gak diulang
      if (dist < 22) {
        sucked = true;
        solar.style.opacity = "0";
        solar.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) scale(0.02)`;
        bh.style.transform = "scale(1.18)";
        bh.style.filter = "brightness(1.25)";
        return;
      }

      const maxDist = isMobile ? 520 : 720;
      const prox = Math.max(0, 1 - dist / maxDist);
      const speed = 0.0022 + Math.pow(prox, 2) * 0.014;

      posRef.current.x += dx * speed;
      posRef.current.y += dy * speed;

      const shrinkDist = isMobile ? 260 : 380;
      const close = Math.max(0, Math.min(1, dist / shrinkDist));
      const scale = 0.18 + close * 0.82;

      solar.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) scale(${scale})`;
      solar.style.opacity = String(0.55 + close * 0.4);

      const pulse = 1 + prox * 0.1;
      bh.style.transform = `scale(${pulse})`;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* solar - kiri bawah */}
      <div
        ref={solarRef}
        className="absolute will-change-transform"
        style={{
          width: isMobile ? 210 : 290,
          height: isMobile ? 210 : 290,
          left: isMobile ? "6%" : "14%",
          top: isMobile ? "64%" : "60%",
          marginLeft: isMobile ? -105 : -145,
          marginTop: isMobile ? -105 : -145,
          opacity: 0.95,
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 16,
            height: 16,
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle at 30% 30%, #FDE68A, #F59E0B 58%, #78350F)",
            boxShadow: "0 0 18px 5px rgba(251,146,60,0.5)",
          }}
        />
        {PLANETS.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.r * 2,
              height: p.r * 2,
              left: "50%",
              top: "50%",
              marginLeft: -p.r,
              marginTop: -p.r,
              border: "1px solid rgba(255,255,255,0.07)",
              animation: `orbit-spin ${p.dur}s linear infinite`,
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: "50%",
                top: 0,
                transform: "translate(-50%,-50%)",
                background: p.color,
              }}
            >
              {(p as { ring?: boolean }).ring && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-[13px] rounded-full bg-[#E8D5A3]/70 rotate-[-14deg]" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* blackhole - kanan atas biar gak ketutup card */}
      <div
        ref={bhRef}
        className="absolute will-change-transform"
        style={{
          width: isMobile ? 120 : 170,
          height: isMobile ? 120 : 170,
          right: isMobile ? "4%" : "6%",
          top: isMobile ? "7%" : "6%",
          opacity: 0.95,
        }}
      >
        <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/15" />
        <div
          className="absolute inset-0 rounded-full motion-safe:animate-[spin_9s_linear_infinite] opacity-75"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, #60A5FA 68deg, #93C5FD 108deg, transparent 168deg, transparent 360deg)",
            maskImage: "radial-gradient(circle, transparent 34%, black 38%, black 66%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 34%, black 38%, black 66%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-45"
          style={{
            background:
              "conic-gradient(from 180deg, transparent 0deg, #818CF8 48deg, transparent 118deg, transparent 360deg)",
            maskImage: "radial-gradient(circle, transparent 40%, black 44%, black 60%, transparent 64%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 40%, black 44%, black 60%, transparent 64%)",
            animation: "spin-reverse 13s linear infinite",
          }}
        />
        <div className="absolute inset-[33%] rounded-full bg-black shadow-[0_0_40px_10px_rgba(59,130,246,0.32)] border border-white/5" />
      </div>
    </div>
  );
}
