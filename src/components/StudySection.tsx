// components/StudySection.tsx
"use client";

import FadeIn from "@/components/animasi/FadeIn";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import StarField from "./angkasa/startField";

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
  duration: number; // detik per orbit — makin kecil makin cepet
  radius: number; // px
}

interface Cluster {
  title: string;
  accentColor: string;
  skills: Skill[];
}

const CLUSTERS: Cluster[] = [
  {
    title: "Frontend",
    accentColor: "#60A5FA",
    skills: [
      { name: "HTML", icon: SiHtml5, color: "#E34F26", duration: 10, radius: 55 },
      { name: "CSS", icon: SiCss, color: "#1572B6", duration: 14, radius: 80 },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", duration: 18, radius: 105 },
      { name: "React", icon: SiReact, color: "#61DAFB", duration: 22, radius: 130 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", duration: 26, radius: 155 },
    ],
  },
  {
    title: "Backend",
    accentColor: "#818CF8",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", duration: 12, radius: 65 },
      { name: "Express.js", icon: SiExpress, color: "#E2E8F0", duration: 18, radius: 100 },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", duration: 24, radius: 135 },
    ],
  },
  {
    title: "Tools & Design",
    accentColor: "#93C5FD",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", duration: 12, radius: 65 },
      { name: "GitHub", icon: SiGithub, color: "#E2E8F0", duration: 18, radius: 100 },
      { name: "Figma", icon: SiFigma, color: "#F24E1E", duration: 24, radius: 135 },
    ],
  },
];

function OrbitCluster({ title, accentColor, skills }: Cluster) {
  const size = Math.max(...skills.map((s) => s.radius)) * 2 + 60;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* orbit ring guide (garis lingkaran tipis) */}
        {skills.map((skill) => (
          <div
            key={`ring-${skill.name}`}
            className="absolute rounded-full border border-slate-700/40 pointer-events-none"
            style={{
              width: skill.radius * 2,
              height: skill.radius * 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* pusat cluster */}
        <div
          className="absolute rounded-full flex items-center justify-center text-center px-2 z-10"
          style={{
            width: 64,
            height: 64,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${accentColor}33, transparent 70%)`,
            border: `1px solid ${accentColor}66`,
            boxShadow: `0 0 20px 2px ${accentColor}33`,
          }}
        >
          <span className="text-white text-xs font-semibold leading-tight">
            {title}
          </span>
        </div>

        {/* planet-planet skill */}
        {skills.map((skill) => {
          const Icon = skill.icon;
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
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-125 z-20"
                  style={{
                    background: "#0F172A",
                    border: `1.5px solid ${skill.color}`,
                    boxShadow: `0 0 10px 1px ${skill.color}55`,
                  }}
                >
                  <Icon size={16} color={skill.color} />
                </div>

                {/* tooltip nama skill */}
                <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
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
  return (
    <section
      id="study"
      className="relative min-h-screen flex flex-col items-center justify-center gap-14 px-6 sm:px-10 md:px-16 py-24 bg-[#070B14] overflow-hidden"
    >
      <StarField  />
      <FadeIn direction="up" className="text-center max-w-xl">
        <span className="text-blue-400 text-sm font-medium tracking-wide uppercase">
          Study
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
          Teknologi yang gua kuasai
        </h2>
        <p className="text-slate-400 mt-3">
          Tiap skill jadi planetnya sendiri — arahin cursor buat lihat namanya.
        </p>
      </FadeIn>

      <div className="flex flex-wrap items-start justify-center gap-16 sm:gap-20">
        {CLUSTERS.map((cluster, i) => (
          <FadeIn key={cluster.title} direction="up" delay={i * 150}>
            <OrbitCluster {...cluster} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}