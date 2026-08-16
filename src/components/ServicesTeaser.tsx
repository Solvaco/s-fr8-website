"use client";

import Link from "next/link";
import { Truck, Snowflake, Stack, GlobeHemisphereWest, ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const ICONS = [Truck, Snowflake, Stack, GlobeHemisphereWest];

export default function ServicesTeaser() {
  const { lang } = useLanguage();
  const t = translations[lang].services;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{t.title}</h2>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted">{t.subtitle}</p>
        </div>
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark"
        >
          {t.teaserCta}
          <ArrowRight size={15} weight="bold" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {t.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <div key={item.title} className="rounded-2xl border border-line bg-panel p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon size={20} weight="bold" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
