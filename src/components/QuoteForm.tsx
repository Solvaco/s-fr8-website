// src/components/QuoteForm.tsx
"use client";

import { useState } from "react";
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
  weight: "",
  date: "",
};

export default function QuoteForm() {
  const { lang } = useLanguage();
  const t = translations[lang].contact.form;
  const status = translations[lang].formStatus;

  const [values, setValues] = useState<QuoteFormValues>(EMPTY);
  const [state, setState] = useState<FormStatusState>("idle");
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const field = (key: keyof QuoteFormValues) => ({
    id: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateQuoteForm(values);
    if (!result.valid) {
      setValidationMessage(status.validationError);
      setState("idle");
      return;
    }
    setValidationMessage(null);
    setSending(true);
    const sendResult = await sendFormEmail("quote", { ...values });
    setSending(false);
    setState(sendResult.status === "sent" ? "success" : "error");
    if (sendResult.status === "sent") {
      setValues(EMPTY);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label htmlFor="name">{t.name}</label>
        <input {...field("name")} id="name" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email">{t.email}</label>
        <input {...field("email")} id="email" type="email" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="phone">{t.phone}</label>
        <input {...field("phone")} id="phone" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="origin">{t.origin}</label>
        <input {...field("origin")} id="origin" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="destination">{t.destination}</label>
        <input {...field("destination")} id="destination" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="freightType">{t.freightType}</label>
        <input {...field("freightType")} id="freightType" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="weight">{t.weight}</label>
        <input {...field("weight")} id="weight" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="date">{t.date}</label>
        <input {...field("date")} id="date" type="date" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>

      {validationMessage && <FormStatus state="error" successText="" errorText={validationMessage} />}
      <FormStatus state={state} successText={status.success} errorText={status.errorSend} />

      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-[var(--freight-accent)] px-6 py-3 font-bold text-white disabled:opacity-70"
      >
        {sending ? t.sending : t.submit}
      </button>
    </form>
  );
}
