"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export default function FAQ() {
  const { lang } = useLanguage();
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
      >
        {t.title}
      </motion.h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-8 divide-y divide-line border-y border-line"
      >
        {t.items.map((item, i) => {
          const open = openIndex === i;
          return (
            <motion.div key={item.q} variants={fadeUp}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-semibold text-ink">{item.q}</span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="shrink-0 text-muted"
                >
                  <CaretDown size={18} weight="bold" />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-[65ch] pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
