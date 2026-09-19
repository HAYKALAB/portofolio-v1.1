"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/app/data/LanguageContext";

const SECTION_ORDER = ["hero", "about", "study", "projects", "certificate", "contact", "future"] as const;

type SectionId = (typeof SECTION_ORDER)[number];

const INTRO_COUNT = 3;

const TYPE_SPEED = 28;
const READ_PAUSE = 2200;

type TextKey = `intro:${number}` | SectionId;

export default function RocketGuide() {
  const { t } = useLanguage();

  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketSvgRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<SectionId>("hero");
  const activeRef = useRef<SectionId>("hero");

  const [textKey, setTextKey] = useState<TextKey>("intro:0");
  const [typed, setTyped] = useState<string>("");
  const [showBubble, setShowBubble] = useState<boolean>(true);
  const [typingDone, setTypingDone] = useState<boolean>(false);

  const introTexts = [t.rocket.guide.hero, t.rocket.intro1, t.rocket.intro2];
  const targetText = textKey.startsWith("intro:")
    ? introTexts[Number(textKey.slice(6))]
    : t.rocket.guide[textKey as SectionId];

  const [introIndex, setIntroIndex] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  const phaseRef = useRef<"TALKING" | "FLYING" | "LANDING" | "LANDED">("TALKING");
  const [phase, setPhase] = useState<"TALKING" | "FLYING" | "LANDING" | "LANDED">("TALKING");
  const current = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const rafId = useRef<number | null>(null);
  const moonTarget = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    function initPosition() {
      current.current.x = window.innerWidth / 2 - 24;
      if (phaseRef.current === "TALKING" || current.current.y < window.innerHeight) {
        current.current.y = window.innerHeight * 0.42;
      }
      const el = document.getElementById("moon-landing-spot");
      if (el) {
        const rect = el.getBoundingClientRect();
        moonTarget.current = {
          x: rect.left + window.scrollX + rect.width / 2 - 24,
          y: rect.top + window.scrollY + rect.height / 2 - 24,
        };
      }
    }
    initPosition();
    window.addEventListener("resize", initPosition);
    return () => window.removeEventListener("resize", initPosition);
  }, []);

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
    const timer = setTimeout(computeMoonTarget, 400);
    window.addEventListener("resize", computeMoonTarget);
    window.addEventListener("load", computeMoonTarget);
    let scrollT: number | null = null;
    function onScroll() {
      if (scrollT) return;
      scrollT = window.setTimeout(() => {
        computeMoonTarget();
        scrollT = null;
      }, 300) as unknown as number;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computeMoonTarget);
      window.removeEventListener("load", computeMoonTarget);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let observer: IntersectionObserver | null = null;

    function setup() {
      if (observer) observer.disconnect();
      const els: Record<string, Element | null> = {};
      SECTION_ORDER.forEach((id) => {
        if (id === "hero") els[id] = document.querySelector("section");
        else els[id] = document.getElementById(id);
      });
      const isMobileView = window.innerWidth < 640;
      observer = new IntersectionObserver(
        (entries) => {
          let best: { id: SectionId; ratio: number } | null = null;
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const raw = (e.target as HTMLElement).id || "hero";
            const id = (SECTION_ORDER as readonly string[]).includes(raw) ? (raw as SectionId) : "hero";
            const ratio = e.intersectionRatio;
            if (!best || ratio > best.ratio) best = { id, ratio };
          }
          if (best && best.id !== activeRef.current) {
            activeRef.current = best.id;
            setActive(best.id);
            if (phaseRef.current !== "TALKING") {
              setTextKey(best.id);
              setShowBubble(true);
            }
          }
        },
        {
          threshold: isMobileView ? [0.08, 0.15, 0.3] : [0.22, 0.5],
          rootMargin: isMobileView ? "-5% 0px -30% 0px" : "-12% 0px -42% 0px",
        }
      );
      Object.values(els).forEach((el) => el && observer!.observe(el));
    }

    setup();
    let resizeT: number | null = null;
    function onResize() {
      if (resizeT) return;
      resizeT = window.setTimeout(() => {
        setup();
        resizeT = null;
      }, 250) as unknown as number;
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (observer) observer.disconnect();
    };
  }, [mounted]);

  useEffect(() => {
    if (phase !== "TALKING") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTextKey(`intro:${introIndex}`);
    setShowBubble(true);
  }, [phase, introIndex]);

  useEffect(() => {
    if (phase !== "TALKING" || !showBubble || !typingDone) return;

    const timer = setTimeout(() => {
      if (introIndex < INTRO_COUNT - 1) {
        setShowBubble(false);
        setTypingDone(false);
        setTimeout(() => {
          setIntroIndex((i) => i + 1);
        }, 220);
      } else {
        setShowBubble(false);
        setTypingDone(false);
        setTimeout(() => {
          phaseRef.current = "FLYING";
          setPhase("FLYING");
          setIntroDone(true);
          setTextKey(activeRef.current);
          setShowBubble(true);
          targetAngle.current = 180;
        }, 300);
      }
    }, READ_PAUSE);

    return () => clearTimeout(timer);
  }, [phase, showBubble, typingDone, introIndex]);

  useEffect(() => {
    let i = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTyped("");
    setTypingDone(false);
    if (!showBubble) return;
    const text = targetText;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setTypingDone(true);
      }
    }, TYPE_SPEED);
    return () => window.clearInterval(id);
  }, [targetText, showBubble]);

  useEffect(() => {
    function animate() {
      if (phaseRef.current === "FLYING") {
        const SPEED = 1.55;

        if (moonTarget.current) {
          const dx = moonTarget.current.x - current.current.x;
          const dy = moonTarget.current.y - current.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist > SPEED) {
            current.current.x += (dx / dist) * SPEED;
            current.current.y += (dy / dist) * SPEED;
          } else {
            current.current.x = moonTarget.current.x;
            current.current.y = moonTarget.current.y;
            targetAngle.current = 360;
            phaseRef.current = "LANDING";
            setPhase("LANDING");
          }
        } else {
          current.current.y += SPEED;
        }

        if (angle.current < 180) {
          angle.current += (180 - angle.current) * 0.08;
          if (180 - angle.current < 0.5) angle.current = 180;
        }
      } else if (phaseRef.current === "LANDING") {
        const diff = targetAngle.current - angle.current;
        if (Math.abs(diff) > 0.5) angle.current += diff * 0.08;
        else {
          angle.current = 0;
          phaseRef.current = "LANDED";
          setPhase("LANDED");
          setTextKey("future");
          setShowBubble(true);
        }
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      if (rocketSvgRef.current) {
        rocketSvgRef.current.style.transform = `rotate(${angle.current}deg)`;
      }

      const maxH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      if (current.current.y < maxH + 400) {
        rafId.current = requestAnimationFrame(animate);
      }
    }

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!mounted) return null;

  const landed = phase === "LANDED";

  const content = (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 z-40 flex flex-col items-center pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <div className="absolute bottom-full mb-2 flex w-[300px] max-w-[90vw] sm:max-w-[86vw] flex-col items-center pointer-events-auto">
        <div
          className="relative w-full rounded-[14px] border bg-[#0B1220]/95 backdrop-blur-xl px-3.5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition-all duration-300"
          style={{
            opacity: showBubble ? 1 : 0,
            transform: showBubble ? "translateY(0)" : "translateY(6px)",
            borderColor: landed ? "rgba(56,189,248,0.35)" : "rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono tracking-[0.16em] text-sky-300">
              {introDone ? t.rocket.labels[active] : `${t.rocket.introLabel} ${introIndex + 1}/${INTRO_COUNT}`}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {SECTION_ORDER.indexOf(active) + 1}/{SECTION_ORDER.length}
            </span>
          </div>

          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-100 min-h-[2.2em]">
            {typed}
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-sky-300 animate-pulse" />
          </p>

          <div
            className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 rotate-45 -mt-1 border-r border-b bg-[#0B1220]"
            style={{ borderColor: landed ? "rgba(56,189,248,0.35)" : "rgba(255,255,255,0.12)" }}
          />
        </div>

        {introDone && !landed && (
          <span className="mt-1 hidden sm:block text-[10px] font-mono tracking-widest text-slate-500/80">
            {t.rocket.hint}
          </span>
        )}
      </div>

      <div
        ref={rocketSvgRef}
        className={`flex h-16 w-16 items-center justify-center ${landed ? "motion-safe:animate-[landBounce_0.5s_ease-out]" : ""}`}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 48 48" className="h-12 w-12 overflow-visible">
          <ellipse
            cx="24"
            cy="42"
            rx="4"
            ry="6"
            fill="#60A5FA"
            opacity={landed ? 0 : 0.7}
            className={landed ? "" : "motion-safe:animate-[flicker_0.15s_ease-in-out_infinite]"}
          />
          <path d="M24 2C30 10 32 20 32 28C32 32 28 35 24 36C20 35 16 32 16 28C16 20 18 10 24 2Z" fill="#E2E8F0" />
          <circle cx="24" cy="18" r="4" fill="#3B82F6" />
          <path d="M16 26L8 34L16 32Z" fill="#3B82F6" />
          <path d="M32 26L40 34L32 32Z" fill="#3B82F6" />
        </svg>
      </div>

      {phase === "TALKING" && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 motion-safe:animate-[bounceDown_1.4s_ease-in-out_infinite]">
          <path d="M2 5L8 11L14 5" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );

  return createPortal(content, document.body);
}