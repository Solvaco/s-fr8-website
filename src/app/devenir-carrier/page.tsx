// src/app/devenir-carrier/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import CarrierForm from "@/components/CarrierForm";
import PageBanner from "@/components/PageBanner";

export default function CarrierPage() {
  const { lang } = useLanguage();
  const t = translations[lang].carrier;

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{t.title}</h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">{t.subtitle}</p>
      <PageBanner
        src="/images/trailer-sunset.jpg"
        alt={lang === "fr" ? "Remorque sur la route au coucher du soleil" : "Trailer on the road at sunset"}
        className="mt-10"
      />
      <div className="mt-10">
        <CarrierForm />
      </div>
    </section>
  );
}
