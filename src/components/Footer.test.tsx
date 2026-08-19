// src/components/Footer.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import Footer from "./Footer";

describe("Footer", () => {
  it("shows the contact email and phone", () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(screen.getByText("info@s-fr8.com")).toBeInTheDocument();
    expect(screen.getByText("514-475-8557")).toBeInTheDocument();
  });
});
