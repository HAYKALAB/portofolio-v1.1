"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Mail, Send, Clock, MapPin } from "lucide-react";
import StarField from "./angkasa/startField";
import { useLanguage } from "@/app/data/LanguageContext";

const SOCIALS = [
  { label: "GitHub", icon: SiGithub, href: "https://github.com/HAYKALAB" },
  { label: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com/in/ahmad-al-haykal-19952b3b6" },
  { label: "Instagram", icon: SiInstagram, href: "https://instagram.com/ahmadalhaykal" },
  { label: "Email", icon: Mail, href: "mailto:ahmadalhaykal94@gmail.com" },
];

export default function ContactSection() {
  const { t } = useLanguage();
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
      className="relative overflow-hidden bg-[#070B14] px-4 sm:px-10 md:px-16 py-20 sm:py-28"
    >
      <StarField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_12%,rgba(56,189,248,0.08),transparent_62%),radial-gradient(700px_420px_at_92%_88%,rgba(99,102,241,0.07),transparent_60%)]" />

      <div className="max-w-[1160px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400">04 — {t.contact.tag.toUpperCase()}</span>
          <span className="h-px flex-1 max-w-[220px] bg-white/10 hidden sm:block" />
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
          {/* left: editorial info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold tracking-[-0.05em] leading-[0.9] text-white text-[clamp(1.9rem,4.2vw,3.1rem)]"
            >
              {t.contact.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-3 text-[14px] leading-relaxed text-slate-400 max-w-[520px]"
            >
              {t.contact.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="mt-7 grid grid-cols-2 gap-3 max-w-[420px]"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-400">
                  <Clock size={12} /> {t.contact.responseLabel}
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{t.contact.responseTitle}</p>
                <p className="text-xs text-slate-400">{t.contact.responseDesc}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-400">
                  <MapPin size={12} /> {t.contact.locationLabel}
                </div>
                <p className="mt-2 text-sm font-semibold text-white">Bekasi, ID</p>
                <p className="text-xs text-slate-400">{t.contact.locationDesc}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/15 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
              <span className="inline-flex items-center rounded-full bg-white px-4 text-xs font-semibold text-black">
                ahmadalhaykal94@gmail.com
              </span>
            </motion.div>
          </div>

          {/* right: form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[22px] border border-white/10 bg-[#0B1220]/70 backdrop-blur p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-mono tracking-[0.16em] text-slate-400">{t.contact.formTitle}</p>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)] animate-pulse" />
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono tracking-widest text-slate-400">{t.contact.nameLabel}</span>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    className="h-[44px] rounded-full border border-white/10 bg-[#070B14] px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20 focus:bg-[#0B1220] transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono tracking-widest text-slate-400">{t.contact.emailLabel}</span>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    className="h-[44px] rounded-full border border-white/10 bg-[#070B14] px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20 focus:bg-[#0B1220] transition-colors"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono tracking-widest text-slate-400">{t.contact.messageLabel}</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.contact.messagePlaceholder}
                  className="min-h-[128px] rounded-[18px] border border-white/10 bg-[#070B14] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20 focus:bg-[#0B1220] transition-colors resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-slate-100 disabled:opacity-50 transition-colors"
              >
                {loading ? t.contact.sendingBtn : t.contact.sendBtn}
                <Send size={15} />
              </button>

              {status === "success" && (
                <p className="text-xs text-emerald-400 text-center font-mono">{t.contact.successMessage}</p>
              )}
              {status === "error" && (
                <p className="text-xs text-rose-400 text-center font-mono">{t.contact.errorMessage}</p>
              )}
              <p className="text-center text-[11px] font-mono tracking-wide text-slate-500">
                {t.contact.commitment}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}