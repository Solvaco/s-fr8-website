// src/components/CarrierForm.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateCarrierForm, CarrierFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import FormStatus, { FormStatusState } from "./FormStatus";

const EMPTY: CarrierFormValues = {
  name: "",
  company: "",
  equipmentTypeId: "",
  equipmentTypeOther: "",
  zone: "",
  email: "",
  phone: "",
};

type EquipmentType = { id: string; name: string; is_other: boolean };

const baseInputClass =
  "w-full rounded-xl border bg-panel px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:ring-2";
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
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const shakeControls = useAnimationControls();

  // Même liste que le menu déroulant utilisé côté admin (CRM) pour les
  // transporteurs — gérée dans le CRM, pas dupliquée ici.
  useEffect(() => {
    fetch("/admin/api/equipment-types")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.equipmentTypes) setEquipmentTypes(data.equipmentTypes);
      })
      .catch(() => {});
  }, []);

  const selectedEquipmentType = equipmentTypes.find((eq) => eq.id === values.equipmentTypeId);

  const inputClass = (key: keyof CarrierFormValues) =>
    `${baseInputClass} ${
      invalidFields.has(key)
        ? "border-danger focus:border-danger focus:ring-danger/15"
        : "border-line focus:border-accent focus:ring-accent/15"
    }`;

  const field = (key: keyof CarrierFormValues) => ({
    id: key,
    value: values[key],
    "aria-invalid": invalidFields.has(key) || undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCarrierForm(values);
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
    <motion.form animate={shakeControls} onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelClass}>{t.name}</label>
        <input {...field("name")} id="name" className={inputClass("name")} />
      </div>
      <div>
        <label htmlFor="company" className={labelClass}>{t.company}</label>
        <input {...field("company")} id="company" className={inputClass("company")} />
      </div>
      <div>
        <label htmlFor="equipmentTypeId" className={labelClass}>{t.equipment}</label>
        <select
          {...field("equipmentTypeId")}
          id="equipmentTypeId"
          className={`${inputClass("equipmentTypeId")} cursor-pointer`}
        >
          <option value="" disabled>
            {t.equipmentPlaceholder}
          </option>
          {equipmentTypes.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.name}
            </option>
          ))}
        </select>
      </div>
      {selectedEquipmentType?.is_other && (
        <div>
          <label htmlFor="equipmentTypeOther" className={labelClass}>{t.equipmentOther}</label>
          <input
            {...field("equipmentTypeOther")}
            id="equipmentTypeOther"
            className={inputClass("equipmentTypeOther")}
          />
        </div>
      )}
      <div>
        <label htmlFor="zone" className={labelClass}>{t.zone}</label>
        <input {...field("zone")} id="zone" className={inputClass("zone")} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>{t.email}</label>
        <input {...field("email")} id="email" type="email" className={inputClass("email")} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>{t.phone}</label>
        <input {...field("phone")} id="phone" className={inputClass("phone")} />
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
    </motion.form>
  );
}
