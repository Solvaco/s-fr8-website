// src/components/CarrierForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import { sendFormEmail } from "@/lib/send-email";
import CarrierForm from "./CarrierForm";

vi.mock("@/lib/send-email", () => ({
  sendFormEmail: vi.fn(),
}));

describe("CarrierForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a validation error when required fields are empty", async () => {
    render(
      <LanguageProvider>
        <CarrierForm />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Envoyer ma candidature" }));
    expect(await screen.findByText("Veuillez remplir tous les champs requis correctement.")).toBeInTheDocument();
    expect(sendFormEmail).not.toHaveBeenCalled();
  });

  it("calls sendFormEmail with kind 'carrier' when the form is valid", async () => {
    (sendFormEmail as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: "sent" });
    render(
      <LanguageProvider>
        <CarrierForm />
      </LanguageProvider>
    );
    fireEvent.change(screen.getByLabelText("Nom / Compagnie"), { target: { value: "ABC Trucking" } });
    fireEvent.change(screen.getByLabelText("Type d'équipement"), { target: { value: "Reefer" } });
    fireEvent.change(screen.getByLabelText("Zone desservie"), { target: { value: "QC/ON" } });
    fireEvent.change(screen.getByLabelText("Courriel"), { target: { value: "dispatch@abc.com" } });
    fireEvent.change(screen.getByLabelText("Téléphone"), { target: { value: "5145551234" } });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer ma candidature" }));

    expect(await screen.findByText("Votre demande a été envoyée avec succès.")).toBeInTheDocument();
    expect(sendFormEmail).toHaveBeenCalledWith("carrier", expect.objectContaining({ name: "ABC Trucking" }));
  });
});
