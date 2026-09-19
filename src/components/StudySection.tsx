"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import StarField from "./angkasa/startField";
import { useLanguage } from "@/app/data/LanguageContext";

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  duration: number;
  radius: number;
}

interface Cluster {
  title: string;
  accentColor: string;
  skills: Skill[];
}

const CLUSTERS: Cluster[] = [
  {
    title: "Frontend",
    accentColor: "#38BDF8",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26", duration: 12, radius: 46 },
      { name: "CSS3", icon: SiCss, color: "#1572B6", duration: 16, radius: 70 },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", duration: 20, radius: 94 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", duration: 24, radius: 118 },
      { name: "React", icon: SiReact, color: "#61DAFB", duration: 28, radius: 142 },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", duration: 32, radius: 166 },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8", duration: 36, radius: 188 },
    ],
  },
  {
    title: "Backend",
    accentColor: "#818CF8",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", duration: 14, radius: 56 },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E", duration: 19, radius: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", duration: 24, radius: 120 },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", duration: 29, radius: 152 },
    ],
  },
  {
    title: "Tools & Design",
    accentColor: "#22D3EE",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", duration: 14, radius: 58 },
      { name: "GitHub", icon: SiGithub, color: "#E2E8F0", duration: 20, radius: 94 },
      { name: "Figma", icon: SiFigma, color: "#F24E1E", duration: 26, radius: 130 },
    ],
  },
];

function useIsMobile() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const f = () => setW(window.innerWidth);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return w;
}

function OrbitCluster({ title, accentColor, skills }: Cluster) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const vw = useIsMobile();
  const factor = vw < 380 ? 0.58 : vw < 420 ? 0.68 : vw < 640 ? 0.82 : 1;
  const adjSkills = skills.map((s) => ({ ...s, radius: Math.round(s.radius * factor) }));
  const maxRadius = Math.max(...adjSkills.map((s) => s.radius));
  const size = Math.min(maxRadius * 2 + 40, Math.max(280, vw - 32));

  const toggleSkill = (name: string) => {
    setActiveSkill((prev) => (prev === name ? null : name));
  };

  return (
    <div className="flex flex-col items-center">
      {/* header chip */}
      <div
        className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-mono tracking-[0.16em]"
        style={{ borderColor: `${accentColor}30`, background: `${accentColor}10`, color: accentColor }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} />
        {title.toUpperCase()}
      </div>

      <div
        className="relative max-w-[100%] mx-auto"
        style={{ width: size, height: size, maxWidth: "calc(100vw - 32px)" }}
      >
        {/* rings */}
        {adjSkills.map((skill) => (
          <div
            key={`ring-${skill.name}`}
            className="absolute rounded-full border border-white/[0.06] pointer-events-none"
            style={{
              width: skill.radius * 2,
              height: skill.radius * 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* core */}
        <div
          className="absolute rounded-full flex items-center justify-center text-center z-10 bg-[#0B1220] border shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          style={{
            width: 64,
            height: 64,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: `${accentColor}55`,
            boxShadow: `0 0 28px ${accentColor}22`,
          }}
        >
          <span className="text-white text-[10px] font-semibold tracking-[0.14em] uppercase leading-none px-2">
            {title}
          </span>
        </div>

        {/* planets */}
        {adjSkills.map((skill) => {
          const Icon = skill.icon;
          const isActive = activeSkill === skill.name;
          return (
            <div
              key={skill.name}
              className="absolute pointer-events-none"
              style={{
                width: skill.radius * 2,
                height: skill.radius * 2,
                top: "50%",
                left: "50%",
                marginLeft: -skill.radius,
                marginTop: -skill.radius,
                animation: `orbit-spin ${skill.duration}s linear infinite`,
              }}
            >
              <div
                className="absolute group pointer-events-auto"
                style={{
                  top: 0,
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: `counter-spin ${skill.duration}s linear infinite`,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleSkill(skill.name)}
                  aria-label={skill.name}
                  className="w-9 h-9 rounded-full bg-[#0B1220] border border-white/10 flex items-center justify-center transition-all active:scale-95 hover:scale-110 hover:border-white/20 shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                  style={{
                    borderColor: isActive ? skill.color : undefined,
                    boxShadow: isActive ? `0 0 16px ${skill.color}55` : undefined,
                  }}
                >
                  <Icon size={16} color={skill.color} />
                </button>
                <div
                  className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#0B1220] border border-white/10 text-[11px] text-slate-200 whitespace-nowrap pointer-events-none z-30 transition-opacity duration-150 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {skill.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StudySection() {
  const { t } = useLanguage();

  return (
    <section
      id="study"
      className="relative overflow-hidden bg-[#070B14] px-4 sm:px-10 md:px-16 py-20 sm:py-28"
    >
      <StarField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_8%,rgba(56,189,248,0.09),transparent_60%),radial-gradient(700px_420px_at_88%_92%,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="max-w-[1160px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400">02 — {t.study.tag.toUpperCase()}</span>
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
            {t.study?.title || "Teknologi yang Saya Kuasai"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 text-[14px] leading-relaxed text-slate-400 max-w-[560px]"
          >
            {t.study?.description || "Tiap skill jadi planetnya sendiri — arahkan kursor untuk melihat namanya."}
          </motion.p>
        </div>

        <div className="mt-10 sm:mt-12 flex flex-wrap items-start justify-center lg:justify-between gap-10 sm:gap-8">
          {CLUSTERS.map((cluster, i) => (
            <motion.div
              key={cluster.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="origin-top"
            >
              <OrbitCluster {...cluster} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-[11px] font-mono tracking-[0.16em] text-slate-500"
        >
          {t.study.hint}
        </motion.p>
      </div>
    </section>
  );
}