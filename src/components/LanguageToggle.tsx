"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-line bg-panel p-0.5 text-xs font-semibold">
      <button
        type="button"
        aria-label="FR"
        onClick={() => setLang("fr")}
        className={`rounded-full px-2.5 py-1 transition-all duration-200 active:scale-95 ${
          lang === "fr" ? "bg-ink text-white" : "text-muted hover:text-ink"
        }`}
      >
        FR
      </button>
      <button
        type="button"
        aria-label="EN"
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-all duration-200 active:scale-95 ${
          lang === "en" ? "bg-ink text-white" : "text-muted hover:text-ink"
        }`}
      >
        EN
      </button>
    </div>
  );
}
