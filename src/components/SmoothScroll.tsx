"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // smooth scroll buat semua anchor # pakai Lenis, bukan jump langsung
    function onAnchorClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // offset biar gak ketutup navbar (tinggi navbar ~64px)
      const offset = 64;
      lenis.scrollTo(target as HTMLElement, { offset: -offset, duration: 1.2 });
      // update URL tanpa jump
      history.pushState(null, "", href);
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
