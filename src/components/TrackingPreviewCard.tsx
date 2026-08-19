"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

function TrackingPreviewCard() {
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-line bg-panel shadow-[0_20px_40px_-15px_rgba(22,32,43,0.12)]">
      <div className="relative h-56 w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/flatbed-highway.jpg"
            alt={lang === "fr" ? "Camion flatbed en route" : "Flatbed truck on the road"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default memo(TrackingPreviewCard);
