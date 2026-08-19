// src/components/QuoteForm.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimationControls } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateQuoteForm, QuoteFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import { type AddressSuggestion } from "@/lib/address-search";
import AddressAutocomplete from "./AddressAutocomplete";
import FormStatus, { FormStatusState } from "./FormStatus";
import type { LatLng } from "./RouteMap";

// Leaflet touches `window` at import time — must never run during SSR.
const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-2xl border border-line bg-panel" />,
});

const EMPTY: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  originAddress: "",
  originCity: "",
  originProvince: "",
  originPostalCode: "",
  originCountry: "",
  destinationAddress: "",
  destinationCity: "",
  destinationProvince: "",
  destinationPostalCode: "",
  destinationCountry: "",
  freightType: "",
  loadType: "",
  dimensionsLength: "",
  dimensionsWidth: "",
  dimensionsHeight: "",
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
  const [originGeo, setOriginGeo] = useState<LatLng | null>(null);
  const [destinationGeo, setDestinationGeo] = useState<LatLng | null>(null);
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

  const handleAddressSelect = (
    prefix: "origin" | "destination",
    setGeo: (geo: LatLng) => void
  ) => (suggestion: AddressSuggestion) => {
    setValues((prev) => ({
      ...prev,
      [`${prefix}Address`]: suggestion.address,
      [`${prefix}City`]: suggestion.city,
      [`${prefix}Province`]: suggestion.province,
      [`${prefix}PostalCode`]: suggestion.postalCode,
      [`${prefix}Country`]: suggestion.country,
    }));
    setGeo({ lat: suggestion.lat, lng: suggestion.lng });
  };

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
      setOriginGeo(null);
      setDestinationGeo(null);
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
          <AddressAutocomplete
            id="originAddress"
            label={t.origin}
            value={values.originAddress}
            invalid={invalidFields.has("originAddress")}
            onChange={(text) => setValues((prev) => ({ ...prev, originAddress: text }))}
            onSelect={handleAddressSelect("origin", setOriginGeo)}
          />
        </div>
        <div>
          <AddressAutocomplete
            id="destinationAddress"
            label={t.destination}
            value={values.destinationAddress}
            invalid={invalidFields.has("destinationAddress")}
            onChange={(text) => setValues((prev) => ({ ...prev, destinationAddress: text }))}
            onSelect={handleAddressSelect("destination", setDestinationGeo)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:col-span-2 sm:grid-cols-4">
          <div>
            <label htmlFor="originCity" className={labelClass}>{t.city}</label>
            <input {...field("originCity")} id="originCity" className={inputClass("originCity")} />
          </div>
          <div>
            <label htmlFor="originProvince" className={labelClass}>{t.province}</label>
            <input {...field("originProvince")} id="originProvince" className={inputClass("originProvince")} />
          </div>
          <div>
            <label htmlFor="originPostalCode" className={labelClass}>{t.postalCode}</label>
            <input {...field("originPostalCode")} id="originPostalCode" className={inputClass("originPostalCode")} />
          </div>
          <div>
            <label htmlFor="originCountry" className={labelClass}>{t.country}</label>
            <input {...field("originCountry")} id="originCountry" className={inputClass("originCountry")} />
          </div>
          <div>
            <label htmlFor="destinationCity" className={labelClass}>{t.city}</label>
            <input {...field("destinationCity")} id="destinationCity" className={inputClass("destinationCity")} />
          </div>
          <div>
            <label htmlFor="destinationProvince" className={labelClass}>{t.province}</label>
            <input
              {...field("destinationProvince")}
              id="destinationProvince"
              className={inputClass("destinationProvince")}
            />
          </div>
          <div>
            <label htmlFor="destinationPostalCode" className={labelClass}>{t.postalCode}</label>
            <input
              {...field("destinationPostalCode")}
              id="destinationPostalCode"
              className={inputClass("destinationPostalCode")}
            />
          </div>
          <div>
            <label htmlFor="destinationCountry" className={labelClass}>{t.country}</label>
            <input
              {...field("destinationCountry")}
              id="destinationCountry"
              className={inputClass("destinationCountry")}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <RouteMap origin={originGeo} destination={destinationGeo} />
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
        <div className="sm:col-span-2">
          <span className={labelClass}>{t.dimensionsTitle}</span>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label htmlFor="dimensionsLength" className="sr-only">{t.dimensionsLength}</label>
              <input
                {...field("dimensionsLength")}
                id="dimensionsLength"
                inputMode="decimal"
                placeholder={t.dimensionsLength}
                className={inputClass("dimensionsLength")}
              />
            </div>
            <span className="shrink-0 text-sm text-muted">×</span>
            <div className="flex-1">
              <label htmlFor="dimensionsWidth" className="sr-only">{t.dimensionsWidth}</label>
              <input
                {...field("dimensionsWidth")}
                id="dimensionsWidth"
                inputMode="decimal"
                placeholder={t.dimensionsWidth}
                className={inputClass("dimensionsWidth")}
              />
            </div>
            <span className="shrink-0 text-sm text-muted">×</span>
            <div className="flex-1">
              <label htmlFor="dimensionsHeight" className="sr-only">{t.dimensionsHeight}</label>
              <input
                {...field("dimensionsHeight")}
                id="dimensionsHeight"
                inputMode="decimal"
                placeholder={t.dimensionsHeight}
                className={inputClass("dimensionsHeight")}
              />
            </div>
          </div>
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
