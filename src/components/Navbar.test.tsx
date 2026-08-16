// src/components/Navbar.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("shows French nav labels by default and switches to English on toggle", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
