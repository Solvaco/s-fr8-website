"use client";

import Link from "next/link";
import { Lightning, GlobeHemisphereWest, Handshake } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const ICONS = [Lightning, GlobeHemisphereWest, Handshake];

export default function Differentiator() {
  const { lang } = useLanguage();
  const t = translations[lang].differentiator;

  return (
    <section className="border-t border-line bg-panel">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{t.title}</h2>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted">{t.body}</p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark active:scale-[0.98]"
            >
              {t.cta}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {t.points.map((point, i) => {
              const Icon = ICONS[i];
              return (
                <div key={point.title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={20} weight="bold" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
