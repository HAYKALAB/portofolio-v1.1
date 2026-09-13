// components/RocketGuide.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const INTRO_MESSAGES = ["hello bro 👋", "follow me", "let's goo"];
const OUTRO_MESSAGES = ["Mission accomplished! 🚀", "We have landed safely!", "Enjoy exploring!"];

export default function RocketGuide() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketSvgRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<"ARRIVING" | "TALKING" | "FLYING" | "LANDING" | "LANDED">("ARRIVING");
  const phaseRef = useRef<"ARRIVING" | "TALKING" | "FLYING" | "LANDING" | "LANDED">("ARRIVING");

  const [introIndex, setIntroIndex] = useState(0);
  const [outroIndex, setOutroIndex] = useState(0);
  
  const [showIntroBubble, setShowIntroBubble] = useState(false);
  const [showOutroBubble, setShowOutroBubble] = useState(false);

  const current = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const rafId = useRef<number | null>(null);

  const moonTarget = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => setMounted(true), []);

  // Set posisi awal di tengah layar
  useEffect(() => {
    function initPosition() {
      current.current.x = window.innerWidth / 2 - 24;
      if (phaseRef.current === "ARRIVING") {
        current.current.y = window.innerHeight * 0.4;
      }
    }
    initPosition();
    window.addEventListener("resize", initPosition);
    return () => window.removeEventListener("resize", initPosition);
  }, []);

  // Hitung posisi pasti titik pendaratan bulan (X & Y)
  useEffect(() => {
    function computeMoonTarget() {
      const el = document.getElementById("moon-landing-spot");
      if (el) {
        const rect = el.getBoundingClientRect();
        moonTarget.current = {
          x: rect.left + window.scrollX + rect.width / 2 - 24,
          y: rect.top + window.scrollY + rect.height / 2 - 24,
        };
      }
    }

    const timer = setTimeout(computeMoonTarget, 300);
    window.addEventListener("resize", computeMoonTarget);
    window.addEventListener("load", computeMoonTarget);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computeMoonTarget);
      window.removeEventListener("load", computeMoonTarget);
    };
  }, []);

  // Delay awal di Hero
  useEffect(() => {
    const startTalkingTimer = setTimeout(() => {
      phaseRef.current = "TALKING";
      setPhase("TALKING");
    }, 600);

    return () => clearTimeout(startTalkingTimer);
  }, []);

  // 1. Cycle Dialog Intro
  useEffect(() => {
    if (phase !== "TALKING") return;

    setShowIntroBubble(true);

    const timer = setTimeout(() => {
      if (introIndex < INTRO_MESSAGES.length - 1) {
        setShowIntroBubble(false);
        setTimeout(() => {
          setIntroIndex((i) => i + 1);
          setShowIntroBubble(true);
        }, 300);
      } else {
        setShowIntroBubble(false);
        targetAngle.current = 180; 
        phaseRef.current = "FLYING";
        setPhase("FLYING");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [phase, introIndex]);

  // 2. Cycle Dialog Outro (Setelah Mendarat)
  useEffect(() => {
    if (phase !== "LANDED") return;

    const delayTimer = setTimeout(() => {
      setShowOutroBubble(true);

      const outroInterval = setInterval(() => {
        setOutroIndex((prev) => {
          if (prev < OUTRO_MESSAGES.length - 1) {
            return prev + 1;
          } else {
            clearInterval(outroInterval);
            setTimeout(() => setShowOutroBubble(false), 2500);
            return prev;
          }
        });
      }, 2200);

      return () => clearInterval(outroInterval);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [phase]);

  // Loop Utama Animasi
  useEffect(() => {
    function animate() {
      // FASE TERBANG
      if (phaseRef.current === "FLYING") {
        const SPEED = 1.5;

        if (moonTarget.current) {
          const dx = moonTarget.current.x - current.current.x;
          const dy = moonTarget.current.y - current.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Geser posisi X & Y menuju target bulan
          if (dist > SPEED) {
            current.current.x += (dx / dist) * SPEED;
            current.current.y += (dy / dist) * SPEED;
          } else {
            // TERKUNCI PERSIS DI TITIK TARGET (TIDAK AKAN GESER LAGI)
            current.current.x = moonTarget.current.x;
            current.current.y = moonTarget.current.y;
            targetAngle.current = 360; // Muter searah jarum jam untuk mendarat tegak
            phaseRef.current = "LANDING";
            setPhase("LANDING");
          }
        } else {
          current.current.y += SPEED;
        }

        // Putar badan ke 180 deg saat meluncur turun
        if (angle.current < 180) {
          angle.current += (180 - angle.current) * 0.08;
          if (180 - angle.current < 0.5) angle.current = 180;
        }
      } 
      // FASE PENDARATAN (POSISI X & Y DIAM KUNCI TERKUNCI)
      else if (phaseRef.current === "LANDING") {
        const diff = targetAngle.current - angle.current;

        if (Math.abs(diff) > 0.5) {
          angle.current += diff * 0.08;
        } else {
          angle.current = 0; // Kunci sudut tegak murni
          phaseRef.current = "LANDED";
          setPhase("LANDED");
        }
      }

      // Apply transform ke DOM
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      if (rocketSvgRef.current) {
        rocketSvgRef.current.style.transform = `rotate(${angle.current}deg)`;
      }

      const maxScrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      if (current.current.y < maxScrollHeight + 300) {
        rafId.current = requestAnimationFrame(animate);
      }
    }

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!mounted) return null;

  const content = (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 z-40 flex flex-col items-center pointer-events-none"
      style={{ willChange: "transform" }}
    >
      {/* Container Balon Dialog Dibuat Absolute Supaya Tidak Mendorong Posisi SVG Roket */}
      <div className="absolute bottom-full mb-2 flex flex-col items-center pointer-events-auto">
        {phase === "TALKING" && (
          <div
            className="relative px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs whitespace-nowrap transition-all duration-300"
            style={{
              opacity: showIntroBubble ? 1 : 0,
              transform: showIntroBubble ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {INTRO_MESSAGES[introIndex]}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
          </div>
        )}

        {phase === "LANDED" && (
          <div
            className="relative px-3 py-1.5 rounded-lg bg-indigo-950 border border-indigo-500/50 text-indigo-100 text-xs font-medium whitespace-nowrap transition-all duration-500 shadow-lg shadow-indigo-500/10"
            style={{
              opacity: showOutroBubble ? 1 : 0,
              transform: showOutroBubble ? "translateY(0)" : "translateY(6px)",
            }}
          >
            {OUTRO_MESSAGES[outroIndex]}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-indigo-950 border-r border-b border-indigo-500/50 rotate-45 -mt-1" />
          </div>
        )}
      </div>

      {/* SVG Roket */}
      <div 
        ref={rocketSvgRef} 
        className={`w-20 h-20 flex items-center justify-center transition-transform ${
          phase === "LANDED" ? "motion-safe:animate-[landBounce_0.5s_ease-out]" : ""
        }`}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 48 48" className="w-12 h-12 overflow-visible">
          <ellipse
            cx="24"
            cy="42"
            rx="4"
            ry="6"
            fill="#60A5FA"
            className={
              phase === "LANDED" ? "" : "motion-safe:animate-[flicker_0.15s_ease-in-out_infinite]"
            }
            opacity={phase === "LANDED" ? 0 : 0.6}
          />
          <path
            d="M24 2C30 10 32 20 32 28C32 32 28 35 24 36C20 35 16 32 16 28C16 20 18 10 24 2Z"
            fill="#E2E8F0"
          />
          <circle cx="24" cy="18" r="4" fill="#3B82F6" />
          <path d="M16 26L8 34L16 32Z" fill="#3B82F6" />
          <path d="M32 26L40 34L32 32Z" fill="#3B82F6" />
        </svg>
      </div>

      {/* Indikator Panah Bawah */}
      {phase === "TALKING" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="mt-1 motion-safe:animate-[bounceDown_1.4s_ease-in-out_infinite]"
        >
          <path
            d="M2 5L8 11L14 5"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );

  return createPortal(content, document.body);
}