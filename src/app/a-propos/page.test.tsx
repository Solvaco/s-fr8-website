// src/app/a-propos/page.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders the about title and body", () => {
    render(
      <LanguageProvider>
        <AboutPage />
      </LanguageProvider>
    );
    expect(screen.getByText("À propos de Solvaco Freight")).toBeInTheDocument();
    expect(screen.getByText(/famille Solvaco/)).toBeInTheDocument();
  });
});
