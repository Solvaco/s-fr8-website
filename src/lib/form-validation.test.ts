// src/lib/form-validation.test.ts
import { describe, it, expect } from "vitest";
import { validateQuoteForm, validateCarrierForm, validateTrackingForm } from "./form-validation";

describe("validateQuoteForm", () => {
  const valid = {
    name: "Jean Dupont",
    email: "jean@example.com",
    phone: "5145551234",
    origin: "Montréal",
    destination: "Chicago",
    freightType: "Dry Van",
    weight: "10000",
    date: "2026-09-01",
  };

  it("passes with all required fields filled and a valid email", () => {
    expect(validateQuoteForm(valid)).toEqual({ valid: true, errors: {} });
  });

  it("fails when required fields are empty", () => {
    const result = validateQuoteForm({ ...valid, name: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("fails on an invalid email", () => {
    const result = validateQuoteForm({ ...valid, email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });
});

describe("validateCarrierForm", () => {
  const valid = {
    name: "ABC Trucking",
    equipment: "Reefer",
    zone: "Ontario / Quebec",
    email: "dispatch@abctrucking.com",
    phone: "5145551234",
  };

  it("passes with all required fields filled", () => {
    expect(validateCarrierForm(valid)).toEqual({ valid: true, errors: {} });
  });

  it("fails when email is missing", () => {
    const result = validateCarrierForm({ ...valid, email: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });
});

describe("validateTrackingForm", () => {
  it("passes with a load number and valid email", () => {
    expect(
      validateTrackingForm({ loadNumber: "LD-1234", email: "client@example.com" })
    ).toEqual({ valid: true, errors: {} });
  });

  it("fails when the load number is empty", () => {
    const result = validateTrackingForm({ loadNumber: "", email: "client@example.com" });
    expect(result.valid).toBe(false);
    expect(result.errors.loadNumber).toBeDefined();
  });
});
