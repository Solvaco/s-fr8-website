// src/app/suivi/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import TrackingForm from "@/components/TrackingForm";
import PageBanner from "@/components/PageBanner";
import WordReveal from "@/components/WordReveal";

export default function TrackingPage() {
  const { lang } = useLanguage();
  const t = translations[lang].tracking;

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        <WordReveal segments={[{ text: t.title }]} />
      </h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">{t.subtitle}</p>
      <PageBanner
        src="/images/truck-mountains-bw.jpg"
        alt={lang === "fr" ? "Camion sur route de montagne" : "Truck on a mountain road"}
        className="mt-10"
      />
      <div className="mt-10">
        <TrackingForm />
      </div>
    </section>
  );
}
