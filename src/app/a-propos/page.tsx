// src/app/a-propos/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--freight-text-muted)]">{t.body}</p>
    </section>
  );
}
