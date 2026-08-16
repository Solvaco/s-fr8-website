// src/components/Footer.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-black/5 bg-[var(--freight-bg-dark)] py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-sm sm:px-6">
        <span className="font-black">Solvaco Freight</span>
        <a href="mailto:info@solvaco.com" className="text-white/70 hover:text-white">
          info@solvaco.com
        </a>
        <a href="tel:5149227848" className="text-white/70 hover:text-white">
          514-922-7848
        </a>
        <span className="mt-2 text-xs text-white/40">
          © {new Date().getFullYear()} Solvaco Freight. {t.rights}
        </span>
      </div>
    </footer>
  );
}
