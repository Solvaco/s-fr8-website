// src/components/Footer.tsx
"use client";

import { Phone, EnvelopeSimple } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-white/10 bg-dark py-14 text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-4 text-center sm:px-6">
        <span className="text-sm font-semibold tracking-tight">SFR8</span>
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="mailto:info@solvaco.com" className="flex items-center gap-1.5 transition-colors hover:text-white">
            <EnvelopeSimple size={15} weight="regular" />
            info@solvaco.com
          </a>
          <a href="tel:5149227848" className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Phone size={15} weight="regular" />
            514-922-7848
          </a>
        </div>
        <span className="text-xs text-white/30">
          © {new Date().getFullYear()} SFR8. {t.rights}
        </span>
      </div>
    </footer>
  );
}
