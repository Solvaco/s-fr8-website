"use client";

import Hero from "@/components/Hero";
import ServicesTeaser from "@/components/ServicesTeaser";
import Differentiator from "@/components/Differentiator";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/lib/language-context";

export default function HomeView() {
  const { lang } = useLanguage();

  return (
    <>
      <Hero />
      <ServicesTeaser />
      <div className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 md:pb-28">
        <PageBanner
          src="/images/containers-orange.jpg"
          alt={lang === "fr" ? "Conteneurs de fret empilés" : "Stacked freight containers"}
        />
      </div>
      <Differentiator />
    </>
  );
}
