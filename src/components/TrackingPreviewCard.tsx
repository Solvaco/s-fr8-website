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
    <div className="w-full max-w-sm rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
      <div className="flex items-center justify-between text-xs text-white/50">
        <span className="font-mono tracking-tight">{loadLabel} · LD-4471</span>
        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-medium text-white/80">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          {statusLabel}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-white">
        <span>Montréal</span>
        <span>Chicago</span>
      </div>

      <div className="relative mt-3 h-px w-full bg-white/15">
        <div className="absolute inset-y-0 left-0 w-2/3 bg-white/50" />
        <motion.div
          className="absolute -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-ink"
          initial={{ left: "0%" }}
          animate={{ left: ["0%", "63%", "63%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Truck size={12} weight="fill" />
        </motion.div>
        <MapPin size={14} weight="fill" className="absolute -top-[7px] left-0 text-white/70" />
        <CircleDashed size={14} weight="bold" className="absolute -top-[7px] right-0 text-white/40" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
        <div>
          <div className="text-white/40">{lang === "fr" ? "Équipement" : "Equipment"}</div>
          <div className="mt-0.5 font-medium text-white">Dry Van 53'</div>
        </div>
        <div>
          <div className="text-white/40">ETA</div>
          <div className="mt-0.5 font-medium text-white">
            {lang === "fr" ? "Demain, 14h" : "Tomorrow, 2 PM"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TrackingPreviewCard);
