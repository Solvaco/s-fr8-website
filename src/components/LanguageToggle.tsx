// src/components/LanguageToggle.tsx
"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 p-1 text-xs font-semibold">
      <button
        type="button"
        aria-label="FR"
        onClick={() => setLang("fr")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "fr" ? "bg-[var(--freight-primary)] text-white" : "text-[var(--freight-text-muted)]"
        }`}
      >
        FR
      </button>
      <button
        type="button"
        aria-label="EN"
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-[var(--freight-primary)] text-white" : "text-[var(--freight-text-muted)]"
        }`}
      >
        EN
      </button>
    </div>
  );
}
