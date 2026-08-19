// src/lib/form-validation.ts
export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSITIVE_NUMBER_RE = /^[0-9]+(\.[0-9]+)?$/;

function requireFields(
  values: Record<string, string>,
  fields: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    if (!values[field]?.trim()) {
      errors[field] = "required";
    }
  }
  return errors;
}

export type QuoteFormValues = {
  name: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  freightType: string;
  loadType: string;
  dimensions: string;
  materialType: string;
  palletCount: string;
  weight: string;
  date: string;
};

export function validateQuoteForm(values: QuoteFormValues): ValidationResult {
  const errors = requireFields(values, [
    "name",
    "email",
    "phone",
    "origin",
    "destination",
    "freightType",
    "loadType",
    "weight",
    "date",
  ]);
  if (!errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "invalid";
  }
  if (!errors.weight && !POSITIVE_NUMBER_RE.test(values.weight.trim())) {
    errors.weight = "invalid";
  }
  if (values.palletCount.trim() && !/^[0-9]+$/.test(values.palletCount.trim())) {
    errors.palletCount = "invalid";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export type CarrierFormValues = {
  name: string;
  equipment: string;
  zone: string;
  email: string;
  phone: string;
};

export function validateCarrierForm(values: CarrierFormValues): ValidationResult {
  const errors = requireFields(values, ["name", "equipment", "zone", "email", "phone"]);
  if (!errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "invalid";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export type TrackingFormValues = {
  loadNumber: string;
  email: string;
};

export function validateTrackingForm(values: TrackingFormValues): ValidationResult {
  const errors = requireFields(values, ["loadNumber", "email"]);
  if (!errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "invalid";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
