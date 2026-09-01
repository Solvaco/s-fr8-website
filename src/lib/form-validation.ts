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
  originAddress: string;
  originCity: string;
  originProvince: string;
  originPostalCode: string;
  originCountry: string;
  destinationAddress: string;
  destinationCity: string;
  destinationProvince: string;
  destinationPostalCode: string;
  destinationCountry: string;
  freightType: string;
  loadType: string;
  dimensionsLength: string;
  dimensionsWidth: string;
  dimensionsHeight: string;
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
    "originAddress",
    "destinationAddress",
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
  for (const dim of ["dimensionsLength", "dimensionsWidth", "dimensionsHeight"] as const) {
    if (values[dim].trim() && !POSITIVE_NUMBER_RE.test(values[dim].trim())) {
      errors[dim] = "invalid";
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export type CarrierFormValues = {
  name: string;
  company: string;
  equipmentTypeId: string;
  equipmentTypeOther: string;
  zone: string;
  email: string;
  phone: string;
};

export function validateCarrierForm(values: CarrierFormValues): ValidationResult {
  // company et equipmentTypeOther restent optionnels : la compagnie n'est pas
  // toujours pertinente (propriétaire-opérateur) et la précision d'équipement
  // ne doit pas bloquer l'envoi si le transporteur ne la remplit pas.
  const errors = requireFields(values, ["name", "equipmentTypeId", "zone", "email", "phone"]);
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
