// src/components/QuoteForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import { sendFormEmail } from "@/lib/send-email";
import QuoteForm from "./QuoteForm";

vi.mock("@/lib/send-email", () => ({
  sendFormEmail: vi.fn(),
}));

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("Nom"), { target: { value: "Jean Dupont" } });
  fireEvent.change(screen.getByLabelText("Courriel"), { target: { value: "jean@example.com" } });
  fireEvent.change(screen.getByLabelText("Téléphone"), { target: { value: "5145551234" } });
  fireEvent.change(screen.getByLabelText("Origine"), { target: { value: "Montréal" } });
  fireEvent.change(screen.getByLabelText("Destination"), { target: { value: "Chicago" } });
  fireEvent.change(screen.getByLabelText("Type de charge"), { target: { value: "Dry Van" } });
  fireEvent.change(screen.getByLabelText("Poids (lbs)"), { target: { value: "10000" } });
  fireEvent.change(screen.getByLabelText("Date souhaitée"), { target: { value: "2026-09-01" } });
}

describe("QuoteForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a validation error and does not call sendFormEmail when required fields are empty", async () => {
    render(
      <LanguageProvider>
        <QuoteForm />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Envoyer la demande" }));

    expect(await screen.findByText("Veuillez remplir tous les champs requis correctement.")).toBeInTheDocument();
    expect(sendFormEmail).not.toHaveBeenCalled();
  });

  it("calls sendFormEmail and shows success when the form is valid", async () => {
    (sendFormEmail as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: "sent" });
    render(
      <LanguageProvider>
        <QuoteForm />
      </LanguageProvider>
    );
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Envoyer la demande" }));

    expect(await screen.findByText("Votre demande a été envoyée avec succès.")).toBeInTheDocument();
    expect(sendFormEmail).toHaveBeenCalledWith("quote", expect.objectContaining({ name: "Jean Dupont" }));
  });
});
