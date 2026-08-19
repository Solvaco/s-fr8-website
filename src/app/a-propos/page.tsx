import type { Metadata } from "next";
import AboutView from "./AboutView";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "S-FR8 est la division logistique de la famille Solvaco. Découvrez notre approche du courtage en transport.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return <AboutView />;
}
