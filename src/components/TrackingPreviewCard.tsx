"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, CircleDashed } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";

function TrackingPreviewCard() {
  const { lang } = useLanguage();
  const statusLabel = lang === "fr" ? "En transit" : "In transit";
  const loadLabel = lang === "fr" ? "Charge" : "Load";

  return (
    <div className="w-full max-w-sm rounded-[1.75rem] border border-line bg-panel p-6 shadow-[0_20px_40px_-15px_rgba(22,32,43,0.12)]">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="font-mono tracking-tight">{loadLabel} · LD-4471</span>
        <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 font-medium text-accent-dark">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-success"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {statusLabel}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-ink">
        <span>Montréal</span>
        <span>Chicago</span>
      </div>

      <div className="relative mt-3 h-px w-full bg-line">
        <div className="absolute inset-y-0 left-0 w-2/3 bg-accent/50" />
        <motion.div
          className="absolute -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white"
          initial={{ left: "0%" }}
          animate={{ left: ["0%", "63%", "63%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Truck size={12} weight="fill" />
        </motion.div>
        <MapPin size={14} weight="fill" className="absolute -top-[7px] left-0 text-accent" />
        <CircleDashed size={14} weight="bold" className="absolute -top-[7px] right-0 text-muted/50" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs">
        <div>
          <div className="text-muted">{lang === "fr" ? "Équipement" : "Equipment"}</div>
          <div className="mt-0.5 font-medium text-ink">Dry Van 53'</div>
        </div>
        <div>
          <div className="text-muted">ETA</div>
          <div className="mt-0.5 font-medium text-ink">
            {lang === "fr" ? "Demain, 14h" : "Tomorrow, 2 PM"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TrackingPreviewCard);
