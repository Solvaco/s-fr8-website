// src/components/TrackingForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateTrackingForm, TrackingFormValues } from "@/lib/form-validation";
import FormStatus from "./FormStatus";

const EMPTY: TrackingFormValues = { loadNumber: "", email: "" };

const baseInputClass =
  "w-full rounded-xl border bg-panel px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

// Le statut vient du CRM S-FR8 (www.s-fr8.com/admin, même domaine via la
// réécriture de next.config.ts) : il vérifie le n° de charge + le courriel du
// client et ne renvoie que l'étape, le trajet et la date de ramassage.
const TRACKING_API = "/admin/api/public/tracking";

type TrackingResult = {
  reference: string;
  stepIndex: number;
  origin: string;
  destination: string;
  pickupDate: string | null;
};

type Outcome =
  | { kind: "none" }
  | { kind: "found"; result: TrackingResult }
  | { kind: "message"; text: string };

export default function TrackingForm() {
  const { lang } = useLanguage();
  const t = translations[lang].tracking.form;
  const r = translations[lang].tracking.result;
  const status = translations[lang].formStatus;

  const [values, setValues] = useState<TrackingFormValues>(EMPTY);
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [outcome, setOutcome] = useState<Outcome>({ kind: "none" });
  const shakeControls = useAnimationControls();

  const inputClass = (key: keyof TrackingFormValues) =>
    `${baseInputClass} ${
      invalidFields.has(key)
        ? "border-danger focus:border-danger focus:ring-danger/15"
        : "border-line focus:border-accent focus:ring-accent/15"
    }`;

  const field = (key: keyof TrackingFormValues) => ({
    id: key,
    value: values[key],
    "aria-invalid": invalidFields.has(key) || undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateTrackingForm(values);
    if (!result.valid) {
      setInvalidFields(new Set(Object.keys(result.errors)));
      setValidationMessage(status.validationError);
      setOutcome({ kind: "none" });
      shakeControls.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.3, ease: "easeInOut" } });
      return;
    }
    setInvalidFields(new Set());
    setValidationMessage(null);
    setOutcome({ kind: "none" }); // on n'affiche jamais l'ancien résultat avec la nouvelle recherche
    setSending(true);
    try {
      const response = await fetch(TRACKING_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loadNumber: values.loadNumber.trim(), email: values.email.trim() }),
      });
      if (response.status === 429) {
        setOutcome({ kind: "message", text: r.tooMany });
      } else if (!response.ok) {
        setOutcome({ kind: "message", text: r.error });
      } else {
        const data = await response.json();
        setOutcome(data.found ? { kind: "found", result: data } : { kind: "message", text: r.notFound });
      }
    } catch {
      setOutcome({ kind: "message", text: r.error });
    } finally {
      setSending(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(`${iso.slice(0, 10)}T00:00:00`).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="grid gap-8">
      <motion.form animate={shakeControls} onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="loadNumber" className={labelClass}>{t.loadNumber}</label>
          <input {...field("loadNumber")} id="loadNumber" className={inputClass("loadNumber")} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>{t.email}</label>
          <input {...field("email")} id="email" type="email" className={inputClass("email")} />
        </div>

        <div className="sm:col-span-2">
          {validationMessage && <FormStatus state="error" successText="" errorText={validationMessage} />}
          <FormStatus
            state={outcome.kind === "message" ? "error" : "idle"}
            successText=""
            errorText={outcome.kind === "message" ? outcome.text : ""}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] disabled:opacity-60 sm:col-span-2"
        >
          {sending ? t.sending : t.submit}
        </button>
      </motion.form>

      <AnimatePresence mode="wait">
        {outcome.kind === "found" && (
          <motion.div
            key={outcome.result.reference}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="rounded-2xl border border-line bg-panel p-6 sm:p-8"
            aria-live="polite"
          >
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {r.load} {outcome.result.reference}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {outcome.result.origin} → {outcome.result.destination}
              {outcome.result.pickupDate && (
                <>
                  {" · "}
                  {r.pickup} {formatDate(outcome.result.pickupDate)}
                </>
              )}
            </p>

            <ol className="mt-6 grid gap-4">
              {r.steps.map((label, i) => {
                const done = i <= outcome.result.stepIndex;
                const current = i === outcome.result.stepIndex;
                return (
                  <li key={label} className="flex items-center gap-3">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        done ? "border-accent bg-accent text-white" : "border-line text-muted"
                      }`}
                    >
                      {done ? <Check size={14} weight="bold" /> : i + 1}
                    </span>
                    <span className={`text-sm ${current ? "font-semibold text-ink" : done ? "text-ink" : "text-muted"}`}>
                      {label}
                      {current && <span className="ml-2 text-xs font-medium text-accent">· {r.current}</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
