// src/app/contact/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import QuoteForm from "@/components/QuoteForm";

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{t.title}</h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">{t.subtitle}</p>
      <div className="mt-10">
        <QuoteForm />
      </div>
    </section>
  );
}
