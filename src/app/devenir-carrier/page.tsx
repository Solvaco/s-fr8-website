// src/app/devenir-carrier/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import CarrierForm from "@/components/CarrierForm";

export default function CarrierPage() {
  const { lang } = useLanguage();
  const t = translations[lang].carrier;

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-2 text-[var(--freight-text-muted)]">{t.subtitle}</p>
      <div className="mt-10">
        <CarrierForm />
      </div>
    </section>
  );
}
