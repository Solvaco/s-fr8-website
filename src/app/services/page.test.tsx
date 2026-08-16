// src/app/services/page.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("renders all four service cards", () => {
    render(
      <LanguageProvider>
        <ServicesPage />
      </LanguageProvider>
    );
    expect(screen.getByText("Dry Van")).toBeInTheDocument();
    expect(screen.getByText("Reefer")).toBeInTheDocument();
    expect(screen.getByText("Flatbed")).toBeInTheDocument();
    expect(screen.getByText("Cross-border CA/US")).toBeInTheDocument();
  });
});
