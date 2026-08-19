"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Truck } from "@phosphor-icons/react";

function TrackingPreviewCard() {
  return (
    <div className="w-full max-w-sm rounded-[1.75rem] border border-line bg-panel p-6 shadow-[0_20px_40px_-15px_rgba(22,32,43,0.12)]">
      <div className="relative h-40 overflow-hidden rounded-2xl bg-paper">
        <div className="absolute inset-x-0 bottom-0 h-12 bg-ink" />
        <motion.div
          className="absolute bottom-[19px] h-0.5 w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--color-paper) 0px, var(--color-paper) 16px, transparent 16px, transparent 32px)",
          }}
          animate={{ backgroundPositionX: [0, -32] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-3 text-accent drop-shadow-[0_3px_4px_rgba(22,32,43,0.4)]"
          initial={{ left: "-15%" }}
          animate={{ left: "115%", y: [0, -2, 0, -2, 0] }}
          transition={{
            left: { duration: 4, repeat: Infinity, ease: "linear" },
            y: { duration: 0.3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Truck size={40} weight="fill" />
        </motion.div>
      </div>
    </div>
  );
}

export default memo(TrackingPreviewCard);
