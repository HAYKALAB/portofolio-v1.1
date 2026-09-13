// components/FadeIn.tsx
"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number; // dalam ms, buat efek stagger antar elemen
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // sekali muncul, nggak perlu diobservasi lagi
        }
      },
      { threshold: 0.15 } // trigger begitu 15% elemen keliatan
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offset = {
    up: "translate-y-8",
    left: "-translate-x-8",
    right: "translate-x-8",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${offset}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}