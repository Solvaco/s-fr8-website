"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
        <h1 className="text-4xl font-semibold leading-none tracking-tighter sm:text-5xl">
          {t.title}
        </h1>
        <div className="border-l-2 border-accent/30 pl-6">
          <p className="max-w-[60ch] text-lg leading-relaxed text-muted">{t.body}</p>
        </div>
      </div>
    </section>
  );
}
