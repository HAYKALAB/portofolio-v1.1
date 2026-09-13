// components/CertificateSection.tsx
"use client";

import Image from "next/image";
import FadeIn from "@/components/animasi/FadeIn";
import { Rocket, ExternalLink } from "lucide-react";
import StarField from "./angkasa/startField";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string; // taruh file gambarnya di /public/certificates/
  verifyUrl?: string; // opsional — link buat verifikasi sertifikat asli
}

// GANTI data di bawah ini sesuai sertifikat lo yang sebenarnya.
// Taruh gambar sertifikatnya di folder: public/certificates/namafile.jpg
const CERTIFICATES: Certificate[] = [
  {
    title: "Nama Sertifikat 1",
    issuer: "Nama Platform (mis. Dicoding)",
    date: "2025",
    image: "/certificates/cert-1.jpg",
    verifyUrl: "#",
  },
  {
    title: "Nama Sertifikat 2",
    issuer: "Nama Platform",
    date: "2025",
    image: "/certificates/cert-2.jpg",
    verifyUrl: "#",
  },
  {
    title: "Nama Sertifikat 3",
    issuer: "Nama Platform",
    date: "2025",
    image: "/certificates/cert-3.jpg",
    verifyUrl: "#",
  },
];

function CertificateCard({ title, issuer, date, image, verifyUrl }: Certificate) {
  return (
    <div className="group relative w-full max-w-sm rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.35)]">
      {/* area gambar sertifikat */}
      <div className="relative w-full aspect-[4/3] bg-slate-800">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
      </div>

      {/* garis putus-putus ala boarding pass */}
      <div className="relative flex items-center px-4">
        <div className="flex-1 border-t border-dashed border-slate-600" />
        <Rocket size={14} className="mx-2 text-blue-400 rotate-90" />
        <div className="flex-1 border-t border-dashed border-slate-600" />
      </div>

      {/* info sertifikat */}
      <div className="p-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{title}</h3>
          <p className="text-slate-400 text-xs mt-1">{issuer}</p>
          <p className="text-slate-500 text-[11px] mt-0.5">{date}</p>
        </div>

        {verifyUrl && (
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Verify
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function CertificateSection() {
  return (
    <section
      id="certificate"
      className="relative min-h-screen flex flex-col items-center justify-center gap-14 px-6 sm:px-10 md:px-16 py-24 bg-[#070B14] overflow-hidden"
    >
      <StarField />
      <FadeIn direction="up" className="text-center max-w-xl">
        <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
          Certificate
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
          Bukti perjalanan belajar
        </h2>
        <p className="text-slate-400 mt-3">
          Beberapa sertifikat yang udah gua kumpulin sepanjang perjalanan ini.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {CERTIFICATES.map((cert, i) => (
          <FadeIn key={cert.title} direction="up" delay={i * 120} className="flex justify-center">
            <CertificateCard {...cert} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}