"use client";

import { PhoneCall, Lightning, GlobeHemisphereWest } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import PageBanner from "@/components/PageBanner";

const ICONS = [PhoneCall, Lightning, GlobeHemisphereWest];

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {t.title}
        </h1>
        <div className="border-l-2 border-accent/30 pl-6">
          <p className="max-w-[60ch] text-lg leading-relaxed text-muted">{t.body}</p>
        </div>
      </div>

      <PageBanner
        src="/images/warehouse-interior.jpg"
        alt={lang === "fr" ? "Intérieur d'un entrepôt logistique" : "Inside a logistics warehouse"}
        className="mt-16"
      />

      <div className="mt-16 border-t border-line pt-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t.valuesTitle}</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {t.values.map((value, i) => {
            const Icon = ICONS[i];
            return (
              <div key={value.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={20} weight="bold" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{value.title}</h3>
                <p className="mt-1.5 max-w-[38ch] text-sm leading-relaxed text-muted">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-16 border-t border-line pt-8 text-sm text-muted">
        {t.closing.split("info@solvaco.com").map((part, i, arr) =>
          i === arr.length - 1 ? (
            part
          ) : (
            <span key={i}>
              {part}
              <a href="mailto:info@solvaco.com" className="text-accent hover:text-accent-dark">
                info@solvaco.com
              </a>
            </span>
          )
        )}
      </p>
    </section>
  );
}
