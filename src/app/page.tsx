// src/app/page.tsx
"use client";

import Hero from "@/components/Hero";
import ServicesTeaser from "@/components/ServicesTeaser";
import Differentiator from "@/components/Differentiator";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesTeaser />
      <Differentiator />
    </>
  );
}
