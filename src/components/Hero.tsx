// src/components/Hero.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="bg-[var(--freight-bg-dark)] py-24 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="mb-4 inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
          {t.badge}
        </span>
        <h1 className="text-4xl font-black sm:text-6xl">
          {t.title} <span className="freight-gradient">{t.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">{t.subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--freight-accent)] px-6 py-3 text-sm font-bold"
          >
            {t.ctaQuote}
          </Link>
          <Link
            href="/devenir-carrier"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
          >
            {t.ctaCarrier}
          </Link>
          <Link
            href="/suivi"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
          >
            {t.ctaTracking}
          </Link>
        </div>
      </div>
    </section>
  );
}
