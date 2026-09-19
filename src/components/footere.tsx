"use client";

import { motion } from "framer-motion";
import StarField from "./angkasa/startField";
import { useLanguage } from "@/app/data/LanguageContext";

export default function FutureSection() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-[#070B14] pt-16 sm:pt-20">
      <StarField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-10%,rgba(56,189,248,0.10),transparent_62%),radial-gradient(700px_420px_at_50%_115%,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-10 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono tracking-[0.16em] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            {t.future?.tag || "The Journey Continues"}
          </span>
          <h2 className="mt-4 font-display font-bold tracking-[-0.05em] leading-[0.9] text-white text-[clamp(1.7rem,3.6vw,2.7rem)]">
            {t.future?.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-sm leading-relaxed text-slate-400">
            {t.future.description}
          </p>
        </motion.div>

        {/* moon horizon */}
        <div
          className="relative mt-10 sm:mt-14 overflow-hidden rounded-t-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur"
          style={{ height: "clamp(170px, 22vw, 260px)" }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "min(140%, 980px)",
              height: "min(140%, 980px)",
              bottom: "-78%",
              background:
                "radial-gradient(circle at 35% 28%, #CBD5E1 0%, #94A3B8 22%, #64748B 42%, #334155 62%, #0F172A 78%)",
              boxShadow:
                "0 -28px 90px -20px rgba(56,189,248,0.28), inset 0 18px 60px rgba(0,0,0,0.45), inset 0 -10px 30px rgba(255,255,255,0.12)",
            }}
          >
            <div className="absolute rounded-full bg-black/15" style={{ width: 46, height: 46, top: "16%", left: "31%" }} />
            <div className="absolute rounded-full bg-black/10" style={{ width: 62, height: 62, top: "13%", left: "56%" }} />
            <div className="absolute rounded-full bg-black/14" style={{ width: 26, height: 26, top: "23%", left: "46%" }} />
            <div className="absolute rounded-full bg-black/10" style={{ width: 34, height: 34, top: "19%", left: "68%" }} />
            <div
              id="moon-landing-spot"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: "15.5%" }}
            >
              <div className="h-2 w-10 rounded-full bg-sky-400/40 blur-[1.5px]" />
              <div className="mx-auto -mt-1 h-1 w-6 rounded-full bg-white/60 blur-[0.5px]" />
            </div>
          </div>

          {/* subtle stars over horizon */}
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.7)_0.9px,transparent_0.9px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_70%,transparent)]" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 py-6 text-xs">
          <p className="font-mono tracking-wide text-slate-500">
            © {new Date().getFullYear()} Ahmad Al Haykal. {t.future?.rights || "All rights reserved."}
          </p>
          <p className="font-mono tracking-[0.16em] text-slate-500">
            BEKASI • JAKARTA • REMOTE — <span className="text-slate-300">{t.future.builtWith} NEXT.JS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}