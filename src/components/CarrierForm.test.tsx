// src/components/CarrierForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import { sendFormEmail } from "@/lib/send-email";
import CarrierForm from "./CarrierForm";

vi.mock("@/lib/send-email", () => ({
  sendFormEmail: vi.fn(),
}));

const EQUIPMENT_TYPES = [
  { id: "dry-van-id", name: "Dry Van", is_other: false },
  { id: "reefer-id", name: "Reefer", is_other: false },
  { id: "other-id", name: "Autre / à préciser", is_other: true },
];

describe("CarrierForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ equipmentTypes: EQUIPMENT_TYPES }),
      })
    );
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
    await waitFor(() => expect(screen.getByText("Reefer")).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText("Nom"), { target: { value: "Jean Routier" } });
    fireEvent.change(screen.getByLabelText("Compagnie"), { target: { value: "ABC Trucking" } });
    fireEvent.change(screen.getByLabelText("Type d'équipement"), { target: { value: "reefer-id" } });
    fireEvent.change(screen.getByLabelText("Zone desservie"), { target: { value: "QC/ON" } });
    fireEvent.change(screen.getByLabelText("Courriel"), { target: { value: "dispatch@abc.com" } });
    fireEvent.change(screen.getByLabelText("Téléphone"), { target: { value: "5145551234" } });
    fireEvent.click(screen.getByRole("button", { name: "Envoyer ma candidature" }));

    expect(await screen.findByText("Votre demande a été envoyée avec succès.")).toBeInTheDocument();
    expect(sendFormEmail).toHaveBeenCalledWith(
      "carrier",
      expect.objectContaining({ name: "Jean Routier", company: "ABC Trucking", equipmentTypeId: "reefer-id" })
    );
  });

  it("shows the specify field when 'Autre' is selected", async () => {
    render(
      <LanguageProvider>
        <CarrierForm />
      </LanguageProvider>
    );
    await waitFor(() => expect(screen.getByText("Autre / à préciser")).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText("Type d'équipement"), { target: { value: "other-id" } });
    expect(await screen.findByLabelText("Précisez")).toBeInTheDocument();
  });
});
