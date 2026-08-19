import type { Metadata } from "next";
import CarrierView from "./CarrierView";

export const metadata: Metadata = {
  title: "Devenir Transporteur",
  description:
    "Roulez avec un partenaire fiable. Remplissez le formulaire pour devenir transporteur partenaire de S-FR8.",
  alternates: { canonical: "/devenir-carrier" },
};

export default function CarrierPage() {
  return <CarrierView />;
}
