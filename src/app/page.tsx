// src/app/page.tsx
import type { Metadata } from "next";
import HomeView from "./HomeView";

export const metadata: Metadata = {
  title: "S-FR8 — Votre fret, livré sans compromis",
  description:
    "Dry van, reefer, flatbed et cross-border CA/US — S-FR8 connecte shippers et transporteurs avec réactivité et fiabilité.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomeView />;
}
