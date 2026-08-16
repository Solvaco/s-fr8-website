import { describe, it, expect } from "vitest";
import { translations } from "./translations";

function keysOf(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) =>
    keysOf(v, prefix ? `${prefix}.${k}` : k)
  );
}

describe("translations", () => {
  it("has matching key structure between fr and en", () => {
    const frKeys = keysOf(translations.fr).sort();
    const enKeys = keysOf(translations.en).sort();
    expect(enKeys).toEqual(frKeys);
  });

  it("has non-empty nav labels for both languages", () => {
    expect(translations.fr.nav.home.length).toBeGreaterThan(0);
    expect(translations.en.nav.home.length).toBeGreaterThan(0);
  });
});
