"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const DURATION = 9;

// A single photo can't literally drive forward, so two copies of the same
// shot zoom in together, offset by half a cycle and cross-fading at the
// seam — reads as one continuous advance toward camera instead of a
// breathing in/out loop or an obvious reset snap.
function AdvancingLayer({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: [1, 1.22], opacity: [0, 1, 1, 0] }}
      transition={{
        scale: { duration: DURATION, repeat: Infinity, ease: "linear", delay },
        opacity: { duration: DURATION, repeat: Infinity, times: [0, 0.05, 0.95, 1], ease: "linear", delay },
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
    </motion.div>
  );
}

function TrackingPreviewCard() {
  const { lang } = useLanguage();
  const alt = lang === "fr" ? "Entrepôt logistique avec palettes" : "Logistics warehouse with pallet racking";

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-line bg-panel shadow-[0_20px_40px_-15px_rgba(22,32,43,0.12)]">
      <div className="relative h-56 w-full overflow-hidden">
        <AdvancingLayer src="/images/warehouse-interior.jpg" alt={alt} delay={0} />
        <AdvancingLayer src="/images/warehouse-interior.jpg" alt={alt} delay={DURATION / 2} />
      </div>
    </div>
  );
}

export default memo(TrackingPreviewCard);
