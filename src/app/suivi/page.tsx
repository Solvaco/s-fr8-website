import type { Metadata } from "next";
import TrackingView from "./TrackingView";

export const metadata: Metadata = {
  title: "Suivi de charge",
  description: "Entrez votre numéro de charge pour suivre l'état de votre envoi.",
  alternates: { canonical: "/suivi" },
};

export default function TrackingPage() {
  return <TrackingView />;
}
