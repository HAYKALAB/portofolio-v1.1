"use client";

import { useState, useRef, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { Globe, Check } from "lucide-react";
import { languages, content } from "@/app/data/bahasa";

import StarField from "@/components/angkasa/startField";
import Blackhole from "@/components/angkasa/Blackhole";
import SolarSystem from "@/components/angkasa/SolarSystem"

export default function HeroSection() {
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const langRef = useRef(null);

  const currentContent = content[selectedLang] || content["en"];

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsOpenLang(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative isolate min-h-screen flex flex-col justify-center gap-5 px-6 sm:px-10 md:px-16 overflow-hidden bg-[#070B14]">
      {/* Background layer — SATU div aja, semua elemen bg digabung di sini */}
      <div className="absolute inset-0 -z-10">
        <StarField />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-blue-600/25 blur-3xl motion-safe:animate-[float1_16s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 w-[24rem] h-[24rem] rounded-full bg-blue-400/15 blur-3xl motion-safe:animate-[float2_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 w-[20rem] h-[20rem] rounded-full bg-blue-700/20 blur-3xl motion-safe:animate-[float1_14s_ease-in-out_infinite_reverse]" />

        <Blackhole />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white">
          {currentContent.title}
        </h1>

        <div className="text-lg sm:text-xl text-slate-400 min-h-[2rem] mt-4">
          <Typewriter
            key={selectedLang}
            options={{
              strings: currentContent.runningText,
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-6">
          <button className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors px-5 py-2.5 rounded-lg text-white font-medium">
            {currentContent.contactBtn}
          </button>

          <button className="border border-slate-700 text-white hover:bg-slate-800 active:bg-slate-700 transition-colors px-5 py-2.5 rounded-lg font-medium">
            {currentContent.seeBtn}
          </button>

          <div className="relative inline-block text-left" ref={langRef}>
            <button
              onClick={() => setIsOpenLang(!isOpenLang)}
              className="border border-slate-700 text-white hover:bg-slate-800 transition-colors px-3 py-2.5 rounded-lg flex items-center gap-2 text-sm"
            >
              <Globe size={16} />
              <span className="uppercase">{selectedLang}</span>
            </button>

            {isOpenLang && (
              <div className="absolute right-0 top-full mt-2 w-44 max-h-56 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg p-1.5 shadow-lg z-50 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setIsOpenLang(false);
                    }}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-sm rounded hover:bg-slate-800 text-white transition-colors"
                  >
                    <span>
                      {lang.flag} {lang.name}
                    </span>
                    {selectedLang === lang.code && (
                      <Check size={14} className="text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    
      <SolarSystem />
    </section>
  );
}