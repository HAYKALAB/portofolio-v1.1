"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ExternalLink, Eye, X } from "lucide-react";
import StarField from "./angkasa/startField";
import { useLanguage } from "@/app/data/LanguageContext";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl?: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: "cert-frontend-pemula",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "26 Mei 2026",
    image: "/certificates/belajar-frontend-pemula.webp",
    verifyUrl: "https://dicoding.com/certificates/JMZVO8RM3XN9",
  },
  {
    id: "cert-js-dasar",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    date: "16 Mei 2026",
    image: "/certificates/belajar-java-script-dasar.webp",
    verifyUrl: "https://dicoding.com/certificates/MRZMWOMGKPYQ",
  },
  {
    id: "cert-web-dasar",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "02 Mei 2026",
    image: "/certificates/belajar-dasar-pemrograman-web.webp",
    verifyUrl: "https://dicoding.com/certificates/JMZVOEY43XN9",
  },
  {
    id: "cert-financial-literacy",
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding Indonesia",
    date: "06 Januari 2026",
    image: "/certificates/introduce-financial.webp",
    verifyUrl: "https://dicoding.com/certificates/6RPN7RMY9X2M",
  },
];

function CertificateCard({
  cert,
  onPreview,
  previewText = "Lihat Detail",
  verifyText = "Verify",
}: {
  cert: Certificate;
  onPreview: (cert: Certificate) => void;
  previewText?: string;
  verifyText?: string;
}) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] backdrop-blur transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <div>
        <button
          type="button"
          onClick={() => onPreview(cert)}
          className="relative block w-full aspect-[4/3] overflow-hidden bg-[#0B1220] text-left"
        >
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, 400px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B14]/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 group-hover:bg-black/35 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
              <Eye size={14} /> {previewText}
            </span>
          </div>
        </button>
        <div className="relative flex items-center px-4 -mt-2">
          <div className="flex-1 border-t border-dashed border-white/15" />
          <Rocket size={13} className="mx-2 text-sky-300/80 rotate-90" />
          <div className="flex-1 border-t border-dashed border-white/15" />
        </div>
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-[13px] leading-snug line-clamp-2">{cert.title}</h3>
          <p className="text-slate-400 text-xs mt-1">{cert.issuer}</p>
          <p className="text-slate-500 text-[11px] mt-0.5 font-mono">{cert.date}</p>
        </div>
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black hover:bg-slate-100 transition-colors"
          >
            {verifyText}
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function CertificateSection() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section
      id="certificate"
      className="relative overflow-hidden bg-[#070B14] px-4 sm:px-10 md:px-16 py-20 sm:py-28"
    >
      <StarField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_12%,rgba(56,189,248,0.08),transparent_60%),radial-gradient(700px_420px_at_10%_88%,rgba(99,102,241,0.07),transparent_60%)]" />

      <div className="max-w-[1160px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400">03 — {t.certificate.tag.toUpperCase()}</span>
          <span className="h-px flex-1 max-w-[220px] bg-white/10 hidden sm:block" />
        </motion.div>

        <div className="mt-6 max-w-[620px]">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold tracking-[-0.05em] leading-[0.9] text-white text-[clamp(1.9rem,4.2vw,3.05rem)]"
          >
            {t.certificate?.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 text-[14px] leading-relaxed text-slate-400"
          >
            {t.certificate?.description}
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CertificateCard
                cert={cert}
                onPreview={setSelectedCert}
                previewText={t.certificate?.previewText}
                verifyText={t.certificate?.verifyText}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[20px] border border-white/10 bg-[#0B1220] p-3 sm:p-5"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute right-3 top-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-slate-100 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="relative w-full h-[58vh] sm:h-[66vh] overflow-hidden rounded-[14px] bg-[#070B14]">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  priority
                  className="object-contain p-2 sm:p-3"
                  sizes="900px"
                />
              </div>

              <div className="mt-4 px-1 text-center">
                <h3 className="text-white font-semibold text-sm sm:text-[15px]">{selectedCert.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  {selectedCert.issuer} • {selectedCert.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}