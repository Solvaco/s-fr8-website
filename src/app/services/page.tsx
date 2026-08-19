import type { Metadata } from "next";
import ServicesView from "./ServicesView";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Dry van, reefer, flatbed, cross-border CA/US, LTL et service spécialisé — une couverture complète pour vos besoins de transport.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesView />;
}
