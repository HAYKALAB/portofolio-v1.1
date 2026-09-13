
"use client";

import FadeIn from "@/components/animasi/FadeIn";
import StarField from "./angkasa/startField";

export default function FutureSection() {
  return (
    <footer
      id="future"
      className="relative flex flex-col items-center bg-[#070B14] overflow-hidden pt-20"
    >
      <StarField />
      <FadeIn direction="up" className="text-center z-10 px-6">
        <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
          The Journey Continues
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
          Sampai ketemu di misi berikutnya 🚀
        </h2>
      </FadeIn>

      {/* area langit tempat bulan nongol */}
      <div
        className="relative w-full mt-16"
        style={
          {
            "--moon-h": "clamp(160px, 22vw, 260px)",
            height: "var(--moon-h)",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "calc(var(--moon-h) * 3)",
            height: "calc(var(--moon-h) * 3)",
            bottom: "calc(var(--moon-h) * -2)",
            background:
              "radial-gradient(circle at 35% 30%, #94A3B8, #475569 55%, #1E293B 100%)",
            boxShadow:
              "0 -25px 90px -20px rgba(96,165,250,0.35), inset 0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* kawah-kawah dekoratif */}
          <div className="absolute rounded-full bg-black/20" style={{ width: 36, height: 36, top: "18%", left: "32%" }} />
          <div className="absolute rounded-full bg-black/15" style={{ width: 52, height: 52, top: "14%", left: "56%" }} />
          <div className="absolute rounded-full bg-black/20" style={{ width: 22, height: 22, top: "24%", left: "46%" }} />

          {/* titik pendaratan — target yang dikejar roket */}
          <div
            id="moon-landing-spot"
            className="absolute"
            style={{ top: "15%", left: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="w-10 h-2 rounded-full bg-blue-400/40 blur-[2px]" />
          </div>
        </div>
      </div>

      <p className="relative z-10 text-slate-500 text-xs pb-8 pt-6">
        © {new Date().getFullYear()} Ahmad Al Haykal. All rights reserved.
      </p>
    </footer>
  );
}

