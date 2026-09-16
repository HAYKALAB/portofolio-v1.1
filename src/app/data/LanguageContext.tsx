"use client";

import React, { createContext, useContext, useState } from "react";
import { content, LanguageCode } from "@/app/data/bahasa"; // sesuaikan path file dictionary kamu

// 1. Definisi Tipe Data (TypeScript Interface)
interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: typeof content["id"];
}

// 2. Membuat React Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 3. Provider Component (Bungkus aplikasi di layout.tsx)
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>("id"); // Bahasa default: Indonesia

  const value = {
    lang,
    setLang,
    t: content[lang] || content.id, // Otomatis ambil teks sesuai kode bahasa yang aktif
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 4. Custom Hook untuk Dipakai di Komponen Lain (Navbar, Hero, dll)
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}