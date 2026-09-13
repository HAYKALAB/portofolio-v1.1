// components/StarField.tsx
"use client";

import { useRef, useEffect } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const STAR_COUNT = 180;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3,
      baseOpacity: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // bintang jatuh sesekali
    let shootingStar: {
      x: number; y: number; vx: number; vy: number; life: number;
    } | null = null;

    function maybeSpawnShootingStar() {
      if (!shootingStar && Math.random() < 0.004) {
        shootingStar = {
          x: Math.random() * width * 0.6,
          y: Math.random() * height * 0.3,
          vx: 6 + Math.random() * 4,
          vy: 3 + Math.random() * 2,
          life: 1,
        };
      }
    }

    let frame = 0;
    let rafId: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      frame++;

      for (const star of stars) {
        const twinkle = prefersReducedMotion
          ? star.baseOpacity
          : star.baseOpacity +
            Math.sin(frame * star.twinkleSpeed + star.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, twinkle))})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        maybeSpawnShootingStar();
        if (shootingStar) {
          const s = shootingStar;
          ctx.beginPath();
          const grad = ctx.createLinearGradient(
            s.x, s.y, s.x - s.vx * 8, s.y - s.vy * 8
          );
          grad.addColorStop(0, `rgba(147,197,253,${s.life})`);
          grad.addColorStop(1, "rgba(147,197,253,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
          ctx.stroke();

          s.x += s.vx;
          s.y += s.vy;
          s.life -= 0.02;
          if (s.life <= 0 || s.x > width || s.y > height) shootingStar = null;
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}