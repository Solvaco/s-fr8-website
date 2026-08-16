"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";

export type FormStatusState = "idle" | "success" | "error";

export default function FormStatus({
  state,
  successText,
  errorText,
}: {
  state: FormStatusState;
  successText: string;
  errorText: string;
}) {
  return (
    <AnimatePresence mode="wait">
      {state === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-start gap-2.5 rounded-xl border border-success/20 bg-success/8 p-4 text-sm font-medium text-success"
        >
          <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0" />
          <span>{successText}</span>
        </motion.div>
      )}
      {state === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-start gap-2.5 rounded-xl border border-danger/20 bg-danger/8 p-4 text-sm font-medium text-danger"
        >
          <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" />
          <span>{errorText}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
