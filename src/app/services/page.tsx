// src/app/services/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  const { lang } = useLanguage();
  const t = translations[lang].services;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-2 text-[var(--freight-text-muted)]">{t.subtitle}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {t.items.map((item) => (
          <ServiceCard key={item.title} title={item.title} desc={item.desc} />
        ))}
      </div>
    </section>
  );
}
