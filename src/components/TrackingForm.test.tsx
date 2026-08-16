// src/components/TrackingForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import { sendFormEmail } from "@/lib/send-email";
import TrackingForm from "./TrackingForm";

vi.mock("@/lib/send-email", () => ({
  sendFormEmail: vi.fn(),
}));

describe("TrackingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a validation error when the load number is empty", async () => {
    render(
      <LanguageProvider>
        <TrackingForm />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Demander le statut" }));
    expect(await screen.findByText("Veuillez remplir tous les champs requis correctement.")).toBeInTheDocument();
    expect(sendFormEmail).not.toHaveBeenCalled();
  });

  it("calls sendFormEmail with kind 'tracking' when the form is valid", async () => {
    (sendFormEmail as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: "sent" });
    render(
      <LanguageProvider>
        <TrackingForm />
      </LanguageProvider>
    );
    fireEvent.change(screen.getByLabelText("Numéro de charge"), { target: { value: "LD-1234" } });
    fireEvent.change(screen.getByLabelText("Courriel"), { target: { value: "client@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Demander le statut" }));

    expect(await screen.findByText("Votre demande a été envoyée avec succès.")).toBeInTheDocument();
    expect(sendFormEmail).toHaveBeenCalledWith("tracking", expect.objectContaining({ loadNumber: "LD-1234" }));
  });
});
