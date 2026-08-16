"use client";

import { Truck, Snowflake, Stack, GlobeHemisphereWest } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import ServiceCard from "@/components/ServiceCard";
import PageBanner from "@/components/PageBanner";

const ICONS = [Truck, Snowflake, Stack, GlobeHemisphereWest];
const SPANS = [
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-4",
];

export default function ServicesPage() {
  const { lang } = useLanguage();
  const t = translations[lang].services;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28">
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {t.title}
      </h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">{t.subtitle}</p>
      <PageBanner
        src="/images/flatbed-highway.jpg"
        alt={lang === "fr" ? "Camion flatbed sur autoroute" : "Flatbed truck on the highway"}
        className="mt-10"
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-4">
        {t.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <ServiceCard
              key={item.title}
              title={item.title}
              desc={item.desc}
              className={SPANS[i]}
              icon={<Icon size={22} weight="bold" />}
            />
          );
        })}
      </div>
    </section>
  );
}
