// src/lib/form-validation.test.ts
import { describe, it, expect } from "vitest";
import { validateQuoteForm, validateCarrierForm, validateTrackingForm } from "./form-validation";

describe("validateQuoteForm", () => {
  const valid = {
    name: "Jean Dupont",
    email: "jean@example.com",
    phone: "5145551234",
    originAddress: "1200 Rue Saint-Antoine O",
    originCity: "Montréal",
    originProvince: "Québec",
    originPostalCode: "H3C 1B1",
    originCountry: "Canada",
    destinationAddress: "233 S Wacker Dr",
    destinationCity: "Chicago",
    destinationProvince: "Illinois",
    destinationPostalCode: "60606",
    destinationCountry: "United States",
    freightType: "Dry Van",
    loadType: "FTL — Chargement complet",
    dimensionsLength: "",
    dimensionsWidth: "",
    dimensionsHeight: "",
    materialType: "",
    palletCount: "",
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

  it("fails on a non-numeric weight", () => {
    const result = validateQuoteForm({ ...valid, weight: "abc" });
    expect(result.valid).toBe(false);
    expect(result.errors.weight).toBeDefined();
  });

  it("fails on a non-numeric pallet count", () => {
    const result = validateQuoteForm({ ...valid, palletCount: "a few" });
    expect(result.valid).toBe(false);
    expect(result.errors.palletCount).toBeDefined();
  });

  it("passes when optional fields (dimensions, material, pallet count) are left blank", () => {
    expect(validateQuoteForm(valid)).toEqual({ valid: true, errors: {} });
  });

  it("fails on a non-numeric dimension", () => {
    const result = validateQuoteForm({ ...valid, dimensionsLength: "long" });
    expect(result.valid).toBe(false);
    expect(result.errors.dimensionsLength).toBeDefined();
  });
});

describe("validateCarrierForm", () => {
  const valid = {
    name: "Jean Routier",
    company: "ABC Trucking",
    equipmentTypeId: "740e1ddc-7fdf-4070-a690-fa859c89cadf",
    equipmentTypeOther: "",
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
