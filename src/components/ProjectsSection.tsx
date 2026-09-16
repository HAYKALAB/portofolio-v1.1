"use client";

import { motion } from "framer-motion";
import { Hammer, Clock3, MapPinned, CalendarCheck, Heart, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import StarField from "./angkasa/startField";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#070B14] px-4 sm:px-10 md:px-16 py-20 sm:py-28"
    >
      <StarField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_16%_14%,rgba(56,189,248,0.08),transparent_62%),radial-gradient(700px_420px_at_88%_86%,rgba(99,102,241,0.07),transparent_60%)]" />

      <div className="max-w-[1160px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400">FEATURED BUILD — IN PROGRESS</span>
          <span className="h-px flex-1 max-w-[220px] bg-white/10 hidden sm:block" />
        </motion.div>

        <div className="mt-6 max-w-[720px]">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold tracking-[-0.05em] leading-[0.9] text-white text-[clamp(1.9rem,4.2vw,3.05rem)]"
          >
            Satu proyek yang saya kembangkan dengan serius.
            <span className="bg-gradient-to-r from-white via-sky-100 to-slate-400 bg-clip-text text-transparent"> dikembangkan dengan serius.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 text-[14px] leading-relaxed text-slate-400"
          >
            Bukan template. Proyek ini dibangun dari nol. Alur intinya sudah berjalan dan saat ini sedang disempurnakan untuk pengalaman mobile yang lebih baik.
          </motion.p>
        </div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-0">
            {/* left: mock preview */}
            <div className="relative bg-[#0B1220] p-4 sm:p-5">
              {/* window bar */}
              <div className="flex items-center justify-between rounded-t-[16px] border border-white/10 bg-[#070B14] px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/90" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500">FUTSALIN • ADMIN DASHBOARD</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE IN DEV
                </span>
              </div>

              {/* preview body — abstract but human */}
              <div className="rounded-b-[16px] border-x border-b border-white/10 bg-gradient-to-b from-[#0B1220] to-[#070B14] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white">Booking Futsal Platform</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-200">
                    <Hammer size={11} /> IN PROGRESS
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  Admin bisa kelola lokasi & booking tanpa ribet — klik card lokasi → detail, booking punya tab sendiri + detail/edit modal.
                </p>

                {/* mini stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { icon: MapPinned, k: "6", v: "lokasi demo" },
                    { icon: CalendarCheck, k: "3", v: "status booking" },
                    { icon: Heart, k: "fav", v: "love toggle" },
                  ].map((it) => (
                    <div key={it.v} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                      <it.icon size={14} className="text-sky-300" />
                      <div className="mt-1.5 text-[13px] font-semibold text-white">{it.k}</div>
                      <div className="text-[10px] font-mono tracking-wide text-slate-400">{it.v}</div>
                    </div>
                  ))}
                </div>

                {/* fake cards */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/10 bg-[#0B1220] p-3">
                    <div className="h-2 w-16 rounded bg-white/10" />
                    <div className="mt-2 h-2 w-24 rounded bg-white/5" />
                    <div className="mt-3 flex gap-1.5">
                      <span className="h-1.5 w-12 rounded-full bg-sky-400/70" />
                      <span className="h-1.5 w-8 rounded-full bg-white/10" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B1220] p-3">
                    <div className="h-2 w-20 rounded bg-white/10" />
                    <div className="mt-2 h-2 w-16 rounded bg-white/5" />
                    <div className="mt-3 h-6 rounded-full bg-white text-[10px] font-semibold text-black grid place-items-center">Tambah Lokasi</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <Clock3 size={11} /> Update terakhir: dipoles modal & pecah file biar rapi
                </div>
              </div>

              {/* glow */}
              <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[22px] bg-[radial-gradient(600px_260px_at_30%_0%,rgba(56,189,248,0.12),transparent_70%)] blur-[1px]" />
            </div>

            {/* right: details */}
            <div className="p-6 sm:p-7 flex flex-col">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.16em] text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" /> STILL BUILDING — FEEDBACK WELCOME
              </div>

              <h3 className="mt-3 text-[22px] font-display font-bold tracking-tight text-white leading-none">
                FUTSALIN
                <span className="font-normal text-slate-400"> — booking futsal, dibikin proper.</span>
              </h3>

              <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
                Tujuannya agar pengelolaan oleh admin lebih mudah dengan pengalaman mobile yang optimal. Dari kelola lokasi (card bisa di-tap → detail lengkap) sampe booking (tab misah, search, pagination, detail & edit anti jam bentrok).
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {["Next.js 16", "TypeScript", "Tailwind", "NestJS", "PostgreSQL", "TypeORM", "Framer Motion"].map((t) => (
                  <span key={t} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2 text-xs">
                <div className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <span className="text-sky-300">—</span>
                  <span className="text-slate-300">Kelola Lokasi — ketuk kartu untuk melihat detail lengkap seperti foto, deskripsi, jam operasional, dan daftar lapangan.</span>
                </div>
                <div className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <span className="text-sky-300">—</span>
                  <span className="text-slate-300">Kelola Booking — dipisah dalam tab tersendiri, tidak menumpuk di dashboard. Detail dan edit terpisah dengan validasi jadwal.</span>
                </div>
                <div className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <span className="text-sky-300">—</span>
                  <span className="text-slate-300">Fitur favorit di beranda serta halaman detail read-only untuk pengguna. Struktur file dirapikan agar mudah dikelola.</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://github.com/HAYKALAB/booking-futsal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-slate-100 transition-colors"
                >
                  <SiGithub size={16} /> Lihat di GitHub <ArrowUpRight size={14} />
                </a>
                <span className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 text-sm font-medium text-slate-200">
                  Live demo — bentar lagi rilis
                </span>
              </div>

              <p className="mt-3 text-[11px] font-mono tracking-wide text-slate-500">
                Proyek ini masih dalam pengembangan. Masukan dan saran sangat saya hargai.
              </p>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-[11px] font-mono tracking-[0.16em] text-slate-500">
          MAU NGINTIP CODE-NYA? CEK GITHUB DI ATAS — NEXT DEPLOY PAS UDAH MATENG BENER
        </p>
      </div>
    </section>
  );
}
