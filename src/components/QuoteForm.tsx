// src/components/QuoteForm.tsx
"use client";

import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateQuoteForm, QuoteFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import FormStatus, { FormStatusState } from "./FormStatus";

const EMPTY: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  freightType: "",
  loadType: "",
  dimensions: "",
  materialType: "",
  palletCount: "",
  weight: "",
  date: "",
};

const baseInputClass =
  "w-full rounded-xl border bg-panel px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:ring-2";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";
const groupLabelClass = "text-sm font-semibold text-ink";

export default function QuoteForm() {
  const { lang } = useLanguage();
  const t = translations[lang].contact.form;
  const status = translations[lang].formStatus;
  const freightTypeOptions = [
    ...translations[lang].services.items.map((item) => item.title),
    t.freightTypeOther,
  ];

  const [values, setValues] = useState<QuoteFormValues>(EMPTY);
  const [state, setState] = useState<FormStatusState>("idle");
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>(status.errorSend);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const shakeControls = useAnimationControls();

  const inputClass = (key: keyof QuoteFormValues) =>
    `${baseInputClass} ${
      invalidFields.has(key)
        ? "border-danger focus:border-danger focus:ring-danger/15"
        : "border-line focus:border-accent focus:ring-accent/15"
    }`;

  const field = (key: keyof QuoteFormValues) => ({
    id: key,
    value: values[key],
    "aria-invalid": invalidFields.has(key) || undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateQuoteForm(values);
    if (!result.valid) {
      setInvalidFields(new Set(Object.keys(result.errors)));
      setValidationMessage(status.validationError);
      setState("idle");
      shakeControls.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.3, ease: "easeInOut" } });
      return;
    }
    setInvalidFields(new Set());
    setValidationMessage(null);
    setSending(true);
    const sendResult = await sendFormEmail("quote", { ...values });
    setSending(false);
    if (sendResult.status === "sent") {
      setState("success");
      setValues(EMPTY);
    } else {
      setErrorMessage(sendResult.status === "not-configured" ? status.errorConfig : status.errorSend);
      setState("error");
    }
  };

  return (
    <motion.form animate={shakeControls} onSubmit={handleSubmit} noValidate className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <p className={`${groupLabelClass} sm:col-span-2`}>{lang === "fr" ? "Vos coordonnées" : "Your contact info"}</p>
        <div>
          <label htmlFor="name" className={labelClass}>{t.name}</label>
          <input {...field("name")} id="name" className={inputClass("name")} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>{t.email}</label>
          <input {...field("email")} id="email" type="email" className={inputClass("email")} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>{t.phone}</label>
          <input {...field("phone")} id="phone" className={inputClass("phone")} />
        </div>
      </div>

      <div className="grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
        <p className={`${groupLabelClass} sm:col-span-2`}>{lang === "fr" ? "Détails de la charge" : "Shipment details"}</p>
        <div>
          <label htmlFor="freightType" className={labelClass}>{t.freightType}</label>
          <select
            {...field("freightType")}
            id="freightType"
            className={`${inputClass("freightType")} cursor-pointer`}
          >
            <option value="" disabled>
              {t.freightTypePlaceholder}
            </option>
            {freightTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="origin" className={labelClass}>{t.origin}</label>
          <input {...field("origin")} id="origin" className={inputClass("origin")} />
        </div>
        <div>
          <label htmlFor="destination" className={labelClass}>{t.destination}</label>
          <input {...field("destination")} id="destination" className={inputClass("destination")} />
        </div>
        <div>
          <label htmlFor="loadType" className={labelClass}>{t.loadType}</label>
          <select
            {...field("loadType")}
            id="loadType"
            className={`${inputClass("loadType")} cursor-pointer`}
          >
            <option value="" disabled>
              {t.loadTypePlaceholder}
            </option>
            <option value={t.loadTypeFtl}>{t.loadTypeFtl}</option>
            <option value={t.loadTypeLtl}>{t.loadTypeLtl}</option>
          </select>
        </div>
        <div>
          <label htmlFor="dimensions" className={labelClass}>{t.dimensions}</label>
          <input {...field("dimensions")} id="dimensions" className={inputClass("dimensions")} />
        </div>
        <div>
          <label htmlFor="materialType" className={labelClass}>{t.materialType}</label>
          <input {...field("materialType")} id="materialType" className={inputClass("materialType")} />
        </div>
        <div>
          <label htmlFor="palletCount" className={labelClass}>{t.palletCount}</label>
          <input {...field("palletCount")} id="palletCount" className={inputClass("palletCount")} />
        </div>
        <div>
          <label htmlFor="weight" className={labelClass}>{t.weight}</label>
          <input {...field("weight")} id="weight" className={inputClass("weight")} />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>{t.date}</label>
          <input {...field("date")} id="date" type="date" className={inputClass("date")} />
        </div>
      </div>

      {validationMessage && <FormStatus state="error" successText="" errorText={validationMessage} />}
      <FormStatus state={state} successText={status.success} errorText={errorMessage} />

      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] disabled:opacity-60"
      >
        {sending ? t.sending : t.submit}
      </button>
    </motion.form>
  );
}
