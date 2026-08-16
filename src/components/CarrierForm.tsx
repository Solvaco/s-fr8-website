// src/components/CarrierForm.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateCarrierForm, CarrierFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import FormStatus, { FormStatusState } from "./FormStatus";

const EMPTY: CarrierFormValues = { name: "", equipment: "", zone: "", email: "", phone: "" };

const inputClass =
  "w-full rounded-xl border border-line bg-panel px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/15";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

export default function CarrierForm() {
  const { lang } = useLanguage();
  const t = translations[lang].carrier.form;
  const status = translations[lang].formStatus;

  const [values, setValues] = useState<CarrierFormValues>(EMPTY);
  const [state, setState] = useState<FormStatusState>("idle");
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>(status.errorSend);

  const field = (key: keyof CarrierFormValues) => ({
    id: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCarrierForm(values);
    if (!result.valid) {
      setValidationMessage(status.validationError);
      setState("idle");
      return;
    }
    setValidationMessage(null);
    setSending(true);
    const sendResult = await sendFormEmail("carrier", { ...values });
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
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelClass}>{t.name}</label>
        <input {...field("name")} id="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="equipment" className={labelClass}>{t.equipment}</label>
        <input {...field("equipment")} id="equipment" className={inputClass} />
      </div>
      <div>
        <label htmlFor="zone" className={labelClass}>{t.zone}</label>
        <input {...field("zone")} id="zone" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>{t.email}</label>
        <input {...field("email")} id="email" type="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>{t.phone}</label>
        <input {...field("phone")} id="phone" className={inputClass} />
      </div>

      <div className="sm:col-span-2">
        {validationMessage && <FormStatus state="error" successText="" errorText={validationMessage} />}
        <FormStatus state={state} successText={status.success} errorText={errorMessage} />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98] disabled:opacity-60 sm:col-span-2"
      >
        {sending ? t.sending : t.submit}
      </button>
    </form>
  );
}
