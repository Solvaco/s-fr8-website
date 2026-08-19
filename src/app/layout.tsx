import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Courtage en transport CA/US`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/images/flatbed-highway.jpg", width: 6000, height: 3992 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/flatbed-highway.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-icon.png`,
  description: SITE_DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@solvaco.com",
    telephone: "+1-514-922-7848",
    contactType: "customer service",
    areaServed: ["CA", "US"],
  },
  areaServed: [
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United States" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de courtage en transport",
    itemListElement: [
      "Dry Van",
      "Reefer",
      "Flatbed",
      "Cross-border CA/US",
      "LTL",
      "Service spécialisé",
    ].map((serviceName) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: serviceName },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionConfig reducedMotion="user">
          <LanguageProvider>
            <Navbar />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </LanguageProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
