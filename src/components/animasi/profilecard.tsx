"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  src?: string;
  alt?: string;
  label?: string;
}

/**
 * Kartu foto dengan tilt halus.
 * - Tilt kecil (maks ±6°) hanya di perangkat dengan mouse (desktop)
 * - Di HP: kartu statis, tanpa animasi apa pun → tidak ada beban
 * - Hanya rotateX/rotateY yang dianimasikan (GPU), tanpa blend mode / rAF loop
 */
export default function ProfileCard3D({
  src = "/images/profile.jpg",
  alt = "Ahmad Al Haykal",
  label = "HAYKAL — ’26",
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    setCanTilt(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 140, damping: 20, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const enabled = canTilt && !reduce;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative w-[72vw] max-w-[260px] aspect-[188/242] sm:w-[200px] sm:h-[258px] sm:aspect-auto sm:max-w-none shrink-0 mx-auto sm:mx-0 [perspective:900px]"
    >
      <motion.div
        className="relative h-full w-full rounded-[18px] border border-white/10 bg-[#0B1220] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-sky-400/10"
        style={enabled ? { rotateX, rotateY, willChange: "transform" } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 640px) 72vw, 200px"
          className="object-cover object-top"
          draggable={false}
        />

        {/* gradient bawah biar label kebaca */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest text-white/80">{label}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        </div>
      </motion.div>
    </div>
  );
}