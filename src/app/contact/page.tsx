import type { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "Demander une soumission",
  description:
    "Décrivez votre charge, on vous répond rapidement. Dry van, reefer, flatbed, cross-border CA/US.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}
