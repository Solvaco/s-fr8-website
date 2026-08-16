import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Solvaco Freight",
  description: "Courtage en transport — Dry van, reefer, flatbed, cross-border CA/US.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
