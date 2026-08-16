// src/components/Hero.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the three CTAs pointing at the right pages", () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );
    expect(screen.getByRole("link", { name: "Demander une soumission" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Devenir Carrier" })).toHaveAttribute("href", "/devenir-carrier");
    expect(screen.getByRole("link", { name: "Suivre une charge" })).toHaveAttribute("href", "/suivi");
  });
});
