"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import MagneticButton from "./MagneticButton";
import TrackingPreviewCard from "./TrackingPreviewCard";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      <div className="pointer-events-none absolute inset-0 grain opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[3fr_2fr] md:py-28 lg:gap-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            {t.title} <span className="text-accent">{t.titleHighlight}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted">
            {t.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark active:scale-[0.98]"
            >
              {t.ctaQuote}
              <ArrowUpRight size={16} weight="bold" />
            </MagneticButton>
            <Link
              href="/devenir-carrier"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink/85 transition-colors hover:border-ink/30 hover:bg-ink/5 active:scale-[0.98]"
            >
              {t.ctaCarrier}
            </Link>
            <Link
              href="/suivi"
              className="text-sm font-semibold text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
            >
              {t.ctaTracking}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <TrackingPreviewCard />
        </motion.div>
      </div>
    </section>
  );
}
