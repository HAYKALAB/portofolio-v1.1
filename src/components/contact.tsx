"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import FadeIn from "@/components/animasi/FadeIn";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Mail, Send } from "lucide-react";
import StarField from "./angkasa/startField";

const SOCIALS = [
  { label: "GitHub", icon: SiGithub, href: "https://github.com/username" },
  { label: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com/in/username" },
  { label: "Instagram", icon: SiInstagram, href: "https://instagram.com/username" },
  { label: "Email", icon: Mail, href: "mailto:ahmadalhaykal94@gmail.com" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      await emailjs.send(
        "service_1g7j91v",   
        "template_rrawmcp",  
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "XTty9gGJaF_LLo5Tp" 
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center gap-14 px-6 sm:px-10 md:px-16 py-24 bg-[#070B14] overflow-hidden"
    >
      <StarField />
      <FadeIn direction="up" className="text-center max-w-xl">
        <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
          Contact
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
          Kirim transmisi ke gua
        </h2>
        <p className="text-slate-400 mt-3">
          Ada proyek, kolaborasi, atau cuma mau say hi? Isi form di bawah.
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={150} className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-700/60 bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-medium text-slate-400">
              Nama
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Nama lo"
              className="bg-slate-800/60 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-slate-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="email@lo.com"
              className="bg-slate-800/60 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-medium text-slate-400">
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Ceritain proyek atau ide lo..."
              className="bg-slate-800/60 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 transition-colors text-white text-sm font-medium px-5 py-3 rounded-lg"
          >
            {loading ? "Mengirim..." : "Kirim Pesan"}
            <Send size={16} />
          </button>

          {status === "success" && (
            <p className="text-xs text-green-400 text-center mt-1">
              Pesan berhasil terkirim!
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400 text-center mt-1">
              Gagal mengirim pesan. Coba lagi nanti.
            </p>
          )}
        </form>
      </FadeIn>

      <FadeIn direction="up" delay={300} className="flex items-center gap-5">
        {SOCIALS.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={social.label}
              className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/60 hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)] transition-all duration-200"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </FadeIn>
    </section>
  );
}