// src/lib/language-context.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./language-context";

function Probe() {
  const { lang, setLang } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={() => setLang("en")}>to-en</button>
    </div>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to fr", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("fr");
  });

  it("switches language and persists to localStorage", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText("to-en"));
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(localStorage.getItem("solvaco-freight-lang")).toBe("en");
  });
});
