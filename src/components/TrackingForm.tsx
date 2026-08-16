// src/components/TrackingForm.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateTrackingForm, TrackingFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import FormStatus, { FormStatusState } from "./FormStatus";

const EMPTY: TrackingFormValues = { loadNumber: "", email: "" };

export default function TrackingForm() {
  const { lang } = useLanguage();
  const t = translations[lang].tracking.form;
  const status = translations[lang].formStatus;

  const [values, setValues] = useState<TrackingFormValues>(EMPTY);
  const [state, setState] = useState<FormStatusState>("idle");
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const field = (key: keyof TrackingFormValues) => ({
    id: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateTrackingForm(values);
    if (!result.valid) {
      setValidationMessage(status.validationError);
      setState("idle");
      return;
    }
    setValidationMessage(null);
    setSending(true);
    const sendResult = await sendFormEmail("tracking", { ...values });
    setSending(false);
    setState(sendResult.status === "sent" ? "success" : "error");
    if (sendResult.status === "sent") {
      setValues(EMPTY);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label htmlFor="loadNumber">{t.loadNumber}</label>
        <input {...field("loadNumber")} id="loadNumber" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email">{t.email}</label>
        <input {...field("email")} id="email" type="email" className="w-full rounded-lg border border-black/10 px-3 py-2" />
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
