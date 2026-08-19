"use client";

import { motion } from "framer-motion";
import { Truck, Snowflake, Stack, GlobeHemisphereWest } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import ServiceCard from "@/components/ServiceCard";
import PageBanner from "@/components/PageBanner";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import WordReveal from "@/components/WordReveal";

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
        <WordReveal segments={[{ text: t.title }]} />
      </h1>
      <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">{t.subtitle}</p>
      <PageBanner
        src="/images/flatbed-highway.jpg"
        alt={lang === "fr" ? "Camion flatbed sur autoroute" : "Flatbed truck on the highway"}
        className="mt-10"
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-4"
      >
        {t.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div key={item.title} variants={fadeUp} className={SPANS[i]}>
              <ServiceCard
                title={item.title}
                desc={item.desc}
                icon={<Icon size={22} weight="bold" />}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
