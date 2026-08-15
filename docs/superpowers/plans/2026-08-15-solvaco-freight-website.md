# Solvaco Freight Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public, bilingual (FR/EN), 6-page marketing site for Solvaco Freight, with three lead-capture forms (quote, carrier signup, tracking-status request) sent by email via EmailJS.

**Architecture:** Next.js App Router site, one route per page (`/`, `/services`, `/a-propos`, `/devenir-carrier`, `/suivi`, `/contact`), a client-side `LanguageProvider` (React Context + localStorage) driving a single `translations.ts` dictionary, and three forms that share pure validation functions and a single EmailJS send helper. No backend, no database — this repo has zero dependency on `solvaco-website` or `flatbed-broker` (separate repos, code only referenced for pattern consistency, never imported).

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4, `@emailjs/browser` for form delivery, `lucide-react` for icons, Vitest + React Testing Library for tests.

---

## File Structure

```
solvaco-freight-website/
├── .env.example
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── vitest.config.ts
├── vitest.setup.ts
├── public/
│   ├── logo.png                    (copied from solvaco-website/public)
│   └── logo-original.png           (copied from solvaco-website/public)
└── src/
    ├── app/
    │   ├── layout.tsx               (root layout: LanguageProvider, Navbar, Footer)
    │   ├── globals.css              (freight color palette, fonts)
    │   ├── page.tsx                 (Accueil)
    │   ├── services/page.tsx
    │   ├── a-propos/page.tsx
    │   ├── devenir-carrier/page.tsx
    │   ├── suivi/page.tsx
    │   └── contact/page.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── LanguageToggle.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── ServiceCard.tsx
    │   ├── FormStatus.tsx           (shared success/error/idle UI)
    │   ├── QuoteForm.tsx
    │   ├── CarrierForm.tsx
    │   └── TrackingForm.tsx
    └── lib/
        ├── translations.ts          (fr/en dictionary, all page copy)
        ├── language-context.tsx     (LanguageProvider + useLanguage hook)
        ├── form-validation.ts       (pure validators for the 3 forms)
        └── send-email.ts            (EmailJS wrapper, one function per form)
```

Each page is a small Client Component (`"use client"`) that reads `useLanguage()` and renders translated copy — this keeps every page consistent and avoids mixing server/client data flow for a site this size. Root `layout.tsx` stays a Server Component (so `metadata` export still works) and wraps `children` in the client `LanguageProvider`.

---

## Task 0: Scaffold the Next.js project

**Files:**
- Create: whole project skeleton via `create-next-app`
- Modify: `package.json` (add deps), `.gitignore`, `.env.example`

- [ ] **Step 1: Scaffold with create-next-app**

Run from `C:\Users\Perfect8GOD\Documents\Solvaco\07-Dev\solvaco-freight-website` (the empty repo created during brainstorming — it already has `.git/` and `docs/`):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-npm
```

When prompted about the non-empty directory (it contains `docs/` and `.git/`), confirm yes to continue.

- [ ] **Step 2: Install runtime and test dependencies**

```bash
npm install @emailjs/browser lucide-react
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @types/node
```

- [ ] **Step 3: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add the test script**

Edit `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 5: Copy the shared logo assets**

```bash
cp "C:/Users/Perfect8GOD/Documents/Solvaco/07-Dev/solvaco-website/public/logo.png" public/logo.png
cp "C:/Users/Perfect8GOD/Documents/Solvaco/07-Dev/solvaco-website/public/logo-original.png" public/logo-original.png
```

This is a one-time file copy, not a code/runtime dependency — the two repos still share nothing at build or deploy time.

- [ ] **Step 6: Add EmailJS env var placeholders**

Create `.env.example`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE=
NEXT_PUBLIC_EMAILJS_TEMPLATE_CARRIER=
NEXT_PUBLIC_EMAILJS_TEMPLATE_TRACKING=
```

Confirm `.gitignore` (generated by create-next-app) already excludes `.env*.local` — open it and verify the line is present; if not, add it.

- [ ] **Step 7: Verify the scaffold builds**

```bash
npm run build
```

Expected: build succeeds (default Next.js starter page).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind, Vitest, EmailJS"
```

---

## Task 1: Translation dictionary

**Files:**
- Create: `src/lib/translations.ts`
- Test: `src/lib/translations.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/translations.test.ts
import { describe, it, expect } from "vitest";
import { translations } from "./translations";

function keysOf(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) =>
    keysOf(v, prefix ? `${prefix}.${k}` : k)
  );
}

describe("translations", () => {
  it("has matching key structure between fr and en", () => {
    const frKeys = keysOf(translations.fr).sort();
    const enKeys = keysOf(translations.en).sort();
    expect(enKeys).toEqual(frKeys);
  });

  it("has non-empty nav labels for both languages", () => {
    expect(translations.fr.nav.home.length).toBeGreaterThan(0);
    expect(translations.en.nav.home.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- translations
```

Expected: FAIL — `Cannot find module './translations'`.

- [ ] **Step 3: Write the translation dictionary**

```ts
// src/lib/translations.ts
export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      carrier: "Devenir Carrier",
      tracking: "Suivi de charge",
      contact: "Contact",
      cta: "Obtenir une soumission",
    },
    hero: {
      badge: "Courtage en Transport · Canada · USA",
      title: "Votre Fret,",
      titleHighlight: "Livré Sans Compromis",
      subtitle:
        "Dry van, reefer, flatbed et cross-border CA/US — Solvaco Freight connecte shippers et carriers avec réactivité et fiabilité.",
      ctaQuote: "Demander une soumission",
      ctaCarrier: "Devenir Carrier",
      ctaTracking: "Suivre une charge",
    },
    services: {
      title: "Nos Services",
      subtitle: "Une couverture complète pour vos besoins de transport.",
      items: [
        {
          title: "Dry Van",
          desc: "Transport de marchandises générales en remorque fermée, partout au Canada et aux États-Unis.",
        },
        {
          title: "Reefer",
          desc: "Transport réfrigéré pour marchandises périssables, température contrôlée de bout en bout.",
        },
        {
          title: "Flatbed",
          desc: "Charges hors-gabarit, matériaux de construction et machinerie sur plateforme ouverte.",
        },
        {
          title: "Cross-border CA/US",
          desc: "Expertise douanière et réseau de carriers des deux côtés de la frontière.",
        },
      ],
    },
    about: {
      title: "À propos de Solvaco Freight",
      body: "Solvaco Freight est la division logistique de la famille Solvaco. Nous mettons en relation shippers et carriers avec la même rigueur et le même souci du service qui font la réputation de Solvaco depuis ses débuts.",
    },
    carrier: {
      title: "Devenir Carrier",
      subtitle: "Roulez avec un partenaire fiable. Remplissez le formulaire pour être contacté.",
      form: {
        name: "Nom / Compagnie",
        equipment: "Type d'équipement",
        zone: "Zone desservie",
        email: "Courriel",
        phone: "Téléphone",
        submit: "Envoyer ma candidature",
        sending: "Envoi en cours...",
      },
    },
    tracking: {
      title: "Suivi de charge",
      subtitle: "Entrez votre numéro de charge, notre équipe vous répond par courriel avec le statut.",
      form: {
        loadNumber: "Numéro de charge",
        email: "Courriel",
        submit: "Demander le statut",
        sending: "Envoi en cours...",
      },
    },
    contact: {
      title: "Demander une soumission",
      subtitle: "Décrivez votre charge, on vous répond rapidement.",
      form: {
        name: "Nom",
        email: "Courriel",
        phone: "Téléphone",
        origin: "Origine",
        destination: "Destination",
        freightType: "Type de charge",
        weight: "Poids (lbs)",
        date: "Date souhaitée",
        submit: "Envoyer la demande",
        sending: "Envoi en cours...",
      },
      info: {
        phone: "Téléphone",
        email: "Courriel",
      },
    },
    formStatus: {
      success: "Votre demande a été envoyée avec succès.",
      errorConfig: "Le formulaire n'est pas encore configuré. Ajoutez les clés EmailJS dans .env.local.",
      errorSend: "L'envoi a échoué. Réessayez ou appelez-nous directement.",
      validationError: "Veuillez remplir tous les champs requis correctement.",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      carrier: "Become a Carrier",
      tracking: "Track a Load",
      contact: "Contact",
      cta: "Get a Quote",
    },
    hero: {
      badge: "Freight Brokerage · Canada · USA",
      title: "Your Freight,",
      titleHighlight: "Delivered Without Compromise",
      subtitle:
        "Dry van, reefer, flatbed and CA/US cross-border — Solvaco Freight connects shippers and carriers with responsiveness and reliability.",
      ctaQuote: "Request a Quote",
      ctaCarrier: "Become a Carrier",
      ctaTracking: "Track a Load",
    },
    services: {
      title: "Our Services",
      subtitle: "Complete coverage for your transportation needs.",
      items: [
        {
          title: "Dry Van",
          desc: "General freight transport in enclosed trailers, across Canada and the United States.",
        },
        {
          title: "Reefer",
          desc: "Refrigerated transport for perishable goods, temperature-controlled end to end.",
        },
        {
          title: "Flatbed",
          desc: "Oversized loads, construction materials and machinery on open platforms.",
        },
        {
          title: "Cross-border CA/US",
          desc: "Customs expertise and a carrier network on both sides of the border.",
        },
      ],
    },
    about: {
      title: "About Solvaco Freight",
      body: "Solvaco Freight is the logistics division of the Solvaco family. We connect shippers and carriers with the same rigor and commitment to service that Solvaco has been known for since day one.",
    },
    carrier: {
      title: "Become a Carrier",
      subtitle: "Drive with a reliable partner. Fill out the form to get contacted.",
      form: {
        name: "Name / Company",
        equipment: "Equipment Type",
        zone: "Service Area",
        email: "Email",
        phone: "Phone",
        submit: "Submit My Application",
        sending: "Sending...",
      },
    },
    tracking: {
      title: "Track a Load",
      subtitle: "Enter your load number, our team will reply by email with the status.",
      form: {
        loadNumber: "Load Number",
        email: "Email",
        submit: "Request Status",
        sending: "Sending...",
      },
    },
    contact: {
      title: "Request a Quote",
      subtitle: "Describe your load, we'll get back to you quickly.",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        origin: "Origin",
        destination: "Destination",
        freightType: "Freight Type",
        weight: "Weight (lbs)",
        date: "Desired Date",
        submit: "Send Request",
        sending: "Sending...",
      },
      info: {
        phone: "Phone",
        email: "Email",
      },
    },
    formStatus: {
      success: "Your request was sent successfully.",
      errorConfig: "The form isn't configured yet. Add the EmailJS keys to .env.local.",
      errorSend: "Delivery failed. Please try again or call us directly.",
      validationError: "Please fill in all required fields correctly.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
} as const;
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- translations
```

Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/translations.ts src/lib/translations.test.ts
git commit -m "feat: add fr/en translation dictionary"
```

---

## Task 2: Language context (provider + persisted toggle)

**Files:**
- Create: `src/lib/language-context.tsx`
- Test: `src/lib/language-context.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/lib/language-context.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./language-context";

function Probe() {
  const { lang, setLang } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={() => setLang("en")}>to-en</button>
    </div>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to fr", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("fr");
  });

  it("switches language and persists to localStorage", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText("to-en"));
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(localStorage.getItem("solvaco-freight-lang")).toBe("en");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- language-context
```

Expected: FAIL — `Cannot find module './language-context'`.

- [ ] **Step 3: Write the provider**

```tsx
// src/lib/language-context.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang } from "./translations";

const STORAGE_KEY = "solvaco-freight-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- language-context
```

Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/language-context.tsx src/lib/language-context.test.tsx
git commit -m "feat: add LanguageProvider with localStorage persistence"
```

---

## Task 3: Freight color palette + root layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace globals.css with the freight palette**

```css
/* src/app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

@import "tailwindcss";

:root {
  --freight-primary: #14497a;
  --freight-primary-light: #2e6fb0;
  --freight-accent: #f2994a;
  --freight-accent-2: #2fa84f;
  --freight-bg-dark: #0b1220;
  --freight-bg-light: #f5f7fa;
  --freight-text: #0b1220;
  --freight-text-muted: #5b6b7c;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--freight-bg-light);
  color: var(--freight-text);
  font-family: "Inter", sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Montserrat", sans-serif;
}

.freight-gradient {
  background: linear-gradient(135deg, var(--freight-primary-light), var(--freight-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 2: Write the root layout**

```tsx
// src/app/layout.tsx
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
```

This references `Navbar` and `Footer`, built in Tasks 4–5. `npm run build` will fail until those exist — that's expected here, verified at the end of Task 5.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add freight color palette and root layout"
```

---

## Task 4: Navbar + language toggle

**Files:**
- Create: `src/components/LanguageToggle.tsx`
- Create: `src/components/Navbar.tsx`
- Test: `src/components/Navbar.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Navbar.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("shows French nav labels by default and switches to English on toggle", () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- Navbar
```

Expected: FAIL — `Cannot find module './Navbar'`.

- [ ] **Step 3: Write LanguageToggle**

```tsx
// src/components/LanguageToggle.tsx
"use client";

import { useLanguage } from "@/lib/language-context";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 p-1 text-xs font-semibold">
      <button
        type="button"
        aria-label="FR"
        onClick={() => setLang("fr")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "fr" ? "bg-[var(--freight-primary)] text-white" : "text-[var(--freight-text-muted)]"
        }`}
      >
        FR
      </button>
      <button
        type="button"
        aria-label="EN"
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-[var(--freight-primary)] text-white" : "text-[var(--freight-text-muted)]"
        }`}
      >
        EN
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Write Navbar**

```tsx
// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { lang } = useLanguage();
  const t = translations[lang].nav;

  const links = [
    { href: "/", label: t.home },
    { href: "/services", label: t.services },
    { href: "/a-propos", label: t.about },
    { href: "/devenir-carrier", label: t.carrier },
    { href: "/suivi", label: t.tracking },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Solvaco" width={36} height={36} />
          <span className="font-black tracking-tight">Solvaco Freight</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--freight-primary)]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--freight-accent)] px-4 py-2 text-sm font-bold text-white sm:inline-block"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm run test -- Navbar
```

Expected: PASS (1 test).

- [ ] **Step 6: Commit**

```bash
git add src/components/LanguageToggle.tsx src/components/Navbar.tsx src/components/Navbar.test.tsx
git commit -m "feat: add Navbar with language toggle"
```

---

## Task 5: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Test: `src/components/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Footer.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import Footer from "./Footer";

describe("Footer", () => {
  it("shows the contact email and phone", () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(screen.getByText("info@solvaco.com")).toBeInTheDocument();
    expect(screen.getByText("514-922-7848")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- Footer
```

Expected: FAIL — `Cannot find module './Footer'`.

- [ ] **Step 3: Write Footer**

```tsx
// src/components/Footer.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-black/5 bg-[var(--freight-bg-dark)] py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-sm sm:px-6">
        <span className="font-black">Solvaco Freight</span>
        <a href="mailto:info@solvaco.com" className="text-white/70 hover:text-white">
          info@solvaco.com
        </a>
        <a href="tel:5149227848" className="text-white/70 hover:text-white">
          514-922-7848
        </a>
        <span className="mt-2 text-xs text-white/40">
          © {new Date().getFullYear()} Solvaco Freight. {t.rights}
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- Footer
```

Expected: PASS (1 test).

- [ ] **Step 5: Verify the app builds now that layout, Navbar and Footer all exist**

```bash
npm run build
```

Expected: build succeeds (pages still using the default Next starter content on `/` are fine at this point — replaced in Task 6).

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "feat: add Footer"
```

---

## Task 6: Accueil (home page) with Hero

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Hero.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the three CTAs pointing at the right pages", () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );
    expect(screen.getByRole("link", { name: "Demander une soumission" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Devenir Carrier" })).toHaveAttribute("href", "/devenir-carrier");
    expect(screen.getByRole("link", { name: "Suivre une charge" })).toHaveAttribute("href", "/suivi");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- Hero
```

Expected: FAIL — `Cannot find module './Hero'`.

- [ ] **Step 3: Write Hero**

```tsx
// src/components/Hero.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="bg-[var(--freight-bg-dark)] py-24 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="mb-4 inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
          {t.badge}
        </span>
        <h1 className="text-4xl font-black sm:text-6xl">
          {t.title} <span className="freight-gradient">{t.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">{t.subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--freight-accent)] px-6 py-3 text-sm font-bold"
          >
            {t.ctaQuote}
          </Link>
          <Link
            href="/devenir-carrier"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
          >
            {t.ctaCarrier}
          </Link>
          <Link
            href="/suivi"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
          >
            {t.ctaTracking}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- Hero
```

Expected: PASS (1 test).

- [ ] **Step 5: Wire Hero into the home page**

```tsx
// src/app/page.tsx
"use client";

import Hero from "@/components/Hero";

export default function HomePage() {
  return <Hero />;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx src/app/page.tsx
git commit -m "feat: add home page with Hero"
```

---

## Task 7: Services page

**Files:**
- Create: `src/components/ServiceCard.tsx`
- Create: `src/app/services/page.tsx`
- Test: `src/app/services/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/services/page.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("renders all four service cards", () => {
    render(
      <LanguageProvider>
        <ServicesPage />
      </LanguageProvider>
    );
    expect(screen.getByText("Dry Van")).toBeInTheDocument();
    expect(screen.getByText("Reefer")).toBeInTheDocument();
    expect(screen.getByText("Flatbed")).toBeInTheDocument();
    expect(screen.getByText("Cross-border CA/US")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- services/page
```

Expected: FAIL — `Cannot find module './page'`.

- [ ] **Step 3: Write ServiceCard**

```tsx
// src/components/ServiceCard.tsx
export default function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[var(--freight-primary)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--freight-text-muted)]">{desc}</p>
    </div>
  );
}
```

- [ ] **Step 4: Write the Services page**

```tsx
// src/app/services/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  const { lang } = useLanguage();
  const t = translations[lang].services;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-2 text-[var(--freight-text-muted)]">{t.subtitle}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {t.items.map((item) => (
          <ServiceCard key={item.title} title={item.title} desc={item.desc} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm run test -- services/page
```

Expected: PASS (1 test).

- [ ] **Step 6: Commit**

```bash
git add src/components/ServiceCard.tsx src/app/services/
git commit -m "feat: add Services page"
```

---

## Task 8: À propos page

**Files:**
- Create: `src/app/a-propos/page.tsx`
- Test: `src/app/a-propos/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/a-propos/page.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders the about title and body", () => {
    render(
      <LanguageProvider>
        <AboutPage />
      </LanguageProvider>
    );
    expect(screen.getByText("À propos de Solvaco Freight")).toBeInTheDocument();
    expect(screen.getByText(/famille Solvaco/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- a-propos/page
```

Expected: FAIL — `Cannot find module './page'`.

- [ ] **Step 3: Write the About page**

```tsx
// src/app/a-propos/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--freight-text-muted)]">{t.body}</p>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- a-propos/page
```

Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/app/a-propos/
git commit -m "feat: add About page"
```

---

## Task 9: Form validation (pure functions, shared by all three forms)

**Files:**
- Create: `src/lib/form-validation.ts`
- Test: `src/lib/form-validation.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/form-validation.test.ts
import { describe, it, expect } from "vitest";
import { validateQuoteForm, validateCarrierForm, validateTrackingForm } from "./form-validation";

describe("validateQuoteForm", () => {
  const valid = {
    name: "Jean Dupont",
    email: "jean@example.com",
    phone: "5145551234",
    origin: "Montréal",
    destination: "Chicago",
    freightType: "Dry Van",
    weight: "10000",
    date: "2026-09-01",
  };

  it("passes with all required fields filled and a valid email", () => {
    expect(validateQuoteForm(valid)).toEqual({ valid: true, errors: {} });
  });

  it("fails when required fields are empty", () => {
    const result = validateQuoteForm({ ...valid, name: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("fails on an invalid email", () => {
    const result = validateQuoteForm({ ...valid, email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });
});

describe("validateCarrierForm", () => {
  const valid = {
    name: "ABC Trucking",
    equipment: "Reefer",
    zone: "Ontario / Quebec",
    email: "dispatch@abctrucking.com",
    phone: "5145551234",
  };

  it("passes with all required fields filled", () => {
    expect(validateCarrierForm(valid)).toEqual({ valid: true, errors: {} });
  });

  it("fails when email is missing", () => {
    const result = validateCarrierForm({ ...valid, email: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });
});

describe("validateTrackingForm", () => {
  it("passes with a load number and valid email", () => {
    expect(
      validateTrackingForm({ loadNumber: "LD-1234", email: "client@example.com" })
    ).toEqual({ valid: true, errors: {} });
  });

  it("fails when the load number is empty", () => {
    const result = validateTrackingForm({ loadNumber: "", email: "client@example.com" });
    expect(result.valid).toBe(false);
    expect(result.errors.loadNumber).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- form-validation
```

Expected: FAIL — `Cannot find module './form-validation'`.

- [ ] **Step 3: Write the validators**

```ts
// src/lib/form-validation.ts
export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireFields(
  values: Record<string, string>,
  fields: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    if (!values[field]?.trim()) {
      errors[field] = "required";
    }
  }
  return errors;
}

export type QuoteFormValues = {
  name: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  freightType: string;
  weight: string;
  date: string;
};

export function validateQuoteForm(values: QuoteFormValues): ValidationResult {
  const errors = requireFields(values, [
    "name",
    "email",
    "phone",
    "origin",
    "destination",
    "freightType",
    "weight",
    "date",
  ]);
  if (!errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "invalid";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export type CarrierFormValues = {
  name: string;
  equipment: string;
  zone: string;
  email: string;
  phone: string;
};

export function validateCarrierForm(values: CarrierFormValues): ValidationResult {
  const errors = requireFields(values, ["name", "equipment", "zone", "email", "phone"]);
  if (!errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "invalid";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export type TrackingFormValues = {
  loadNumber: string;
  email: string;
};

export function validateTrackingForm(values: TrackingFormValues): ValidationResult {
  const errors = requireFields(values, ["loadNumber", "email"]);
  if (!errors.email && !EMAIL_RE.test(values.email)) {
    errors.email = "invalid";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- form-validation
```

Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/form-validation.ts src/lib/form-validation.test.ts
git commit -m "feat: add pure validators for quote, carrier and tracking forms"
```

---

## Task 10: EmailJS send helper

**Files:**
- Create: `src/lib/send-email.ts`
- Test: `src/lib/send-email.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/send-email.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import emailjs from "@emailjs/browser";
import { sendFormEmail } from "./send-email";

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn() },
}));

describe("sendFormEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "service_1");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "pub_1");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE", "tmpl_quote");
  });

  it("returns a 'not-configured' result when env vars are missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "");
    const result = await sendFormEmail("quote", { name: "Jean" });
    expect(result).toEqual({ status: "not-configured" });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("calls emailjs.send with the right template id and returns 'sent'", async () => {
    (emailjs.send as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: 200 });
    const result = await sendFormEmail("quote", { name: "Jean" });
    expect(result).toEqual({ status: "sent" });
    expect(emailjs.send).toHaveBeenCalledWith(
      "service_1",
      "tmpl_quote",
      { name: "Jean" },
      { publicKey: "pub_1" }
    );
  });

  it("returns 'error' when emailjs.send rejects", async () => {
    (emailjs.send as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("network"));
    const result = await sendFormEmail("quote", { name: "Jean" });
    expect(result).toEqual({ status: "error" });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- send-email
```

Expected: FAIL — `Cannot find module './send-email'`.

- [ ] **Step 3: Write the send helper**

```ts
// src/lib/send-email.ts
import emailjs from "@emailjs/browser";

export type FormKind = "quote" | "carrier" | "tracking";

export type SendResult = { status: "sent" } | { status: "error" } | { status: "not-configured" };

const TEMPLATE_ENV_KEY: Record<FormKind, string> = {
  quote: "NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE",
  carrier: "NEXT_PUBLIC_EMAILJS_TEMPLATE_CARRIER",
  tracking: "NEXT_PUBLIC_EMAILJS_TEMPLATE_TRACKING",
};

export async function sendFormEmail(
  kind: FormKind,
  templateParams: Record<string, string>
): Promise<SendResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const templateId = process.env[TEMPLATE_ENV_KEY[kind]];

  if (!serviceId || !publicKey || !templateId) {
    return { status: "not-configured" };
  }

  try {
    await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    return { status: "sent" };
  } catch {
    return { status: "error" };
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- send-email
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/send-email.ts src/lib/send-email.test.ts
git commit -m "feat: add EmailJS send helper shared by all forms"
```

---

## Task 11: Shared FormStatus component

**Files:**
- Create: `src/components/FormStatus.tsx`
- Test: `src/components/FormStatus.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/FormStatus.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormStatus from "./FormStatus";

describe("FormStatus", () => {
  it("renders nothing when state is idle", () => {
    const { container } = render(<FormStatus state="idle" successText="ok" errorText="err" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the success message when state is success", () => {
    render(<FormStatus state="success" successText="Sent!" errorText="err" />);
    expect(screen.getByText("Sent!")).toBeInTheDocument();
  });

  it("renders the error message when state is error", () => {
    render(<FormStatus state="error" successText="ok" errorText="Failed!" />);
    expect(screen.getByText("Failed!")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- FormStatus
```

Expected: FAIL — `Cannot find module './FormStatus'`.

- [ ] **Step 3: Write FormStatus**

```tsx
// src/components/FormStatus.tsx
export type FormStatusState = "idle" | "success" | "error";

export default function FormStatus({
  state,
  successText,
  errorText,
}: {
  state: FormStatusState;
  successText: string;
  errorText: string;
}) {
  if (state === "idle") return null;

  if (state === "success") {
    return (
      <div className="rounded-xl border border-[var(--freight-accent-2)]/30 bg-[var(--freight-accent-2)]/10 p-4 text-sm font-medium text-[var(--freight-accent-2)]">
        {successText}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-medium text-red-500">
      {errorText}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- FormStatus
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/FormStatus.tsx src/components/FormStatus.test.tsx
git commit -m "feat: add shared FormStatus success/error component"
```

---

## Task 12: Quote form + Contact page

**Files:**
- Create: `src/components/QuoteForm.tsx`
- Create: `src/app/contact/page.tsx`
- Test: `src/components/QuoteForm.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/QuoteForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import { sendFormEmail } from "@/lib/send-email";
import QuoteForm from "./QuoteForm";

vi.mock("@/lib/send-email", () => ({
  sendFormEmail: vi.fn(),
}));

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("Nom"), { target: { value: "Jean Dupont" } });
  fireEvent.change(screen.getByLabelText("Courriel"), { target: { value: "jean@example.com" } });
  fireEvent.change(screen.getByLabelText("Téléphone"), { target: { value: "5145551234" } });
  fireEvent.change(screen.getByLabelText("Origine"), { target: { value: "Montréal" } });
  fireEvent.change(screen.getByLabelText("Destination"), { target: { value: "Chicago" } });
  fireEvent.change(screen.getByLabelText("Type de charge"), { target: { value: "Dry Van" } });
  fireEvent.change(screen.getByLabelText("Poids (lbs)"), { target: { value: "10000" } });
  fireEvent.change(screen.getByLabelText("Date souhaitée"), { target: { value: "2026-09-01" } });
}

describe("QuoteForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a validation error and does not call sendFormEmail when required fields are empty", async () => {
    render(
      <LanguageProvider>
        <QuoteForm />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Envoyer la demande" }));

    expect(await screen.findByText("Veuillez remplir tous les champs requis correctement.")).toBeInTheDocument();
    expect(sendFormEmail).not.toHaveBeenCalled();
  });

  it("calls sendFormEmail and shows success when the form is valid", async () => {
    (sendFormEmail as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: "sent" });
    render(
      <LanguageProvider>
        <QuoteForm />
      </LanguageProvider>
    );
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Envoyer la demande" }));

    expect(await screen.findByText("Votre demande a été envoyée avec succès.")).toBeInTheDocument();
    expect(sendFormEmail).toHaveBeenCalledWith("quote", expect.objectContaining({ name: "Jean Dupont" }));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- QuoteForm
```

Expected: FAIL — `Cannot find module './QuoteForm'`.

- [ ] **Step 3: Write QuoteForm**

```tsx
// src/components/QuoteForm.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateQuoteForm, QuoteFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import FormStatus, { FormStatusState } from "./FormStatus";

const EMPTY: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  freightType: "",
  weight: "",
  date: "",
};

export default function QuoteForm() {
  const { lang } = useLanguage();
  const t = translations[lang].contact.form;
  const status = translations[lang].formStatus;

  const [values, setValues] = useState<QuoteFormValues>(EMPTY);
  const [state, setState] = useState<FormStatusState>("idle");
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const field = (key: keyof QuoteFormValues) => ({
    id: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateQuoteForm(values);
    if (!result.valid) {
      setValidationMessage(status.validationError);
      setState("idle");
      return;
    }
    setValidationMessage(null);
    setSending(true);
    const sendResult = await sendFormEmail("quote", { ...values });
    setSending(false);
    setState(sendResult.status === "sent" ? "success" : "error");
    if (sendResult.status === "sent") {
      setValues(EMPTY);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label htmlFor="name">{t.name}</label>
        <input {...field("name")} id="name" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email">{t.email}</label>
        <input {...field("email")} id="email" type="email" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="phone">{t.phone}</label>
        <input {...field("phone")} id="phone" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="origin">{t.origin}</label>
        <input {...field("origin")} id="origin" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="destination">{t.destination}</label>
        <input {...field("destination")} id="destination" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="freightType">{t.freightType}</label>
        <input {...field("freightType")} id="freightType" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="weight">{t.weight}</label>
        <input {...field("weight")} id="weight" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="date">{t.date}</label>
        <input {...field("date")} id="date" type="date" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>

      {validationMessage && <FormStatus state="error" successText="" errorText={validationMessage} />}
      <FormStatus state={state} successText={status.success} errorText={status.errorSend} />

      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-[var(--freight-accent)] px-6 py-3 font-bold text-white disabled:opacity-70"
      >
        {sending ? t.sending : t.submit}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- QuoteForm
```

Expected: PASS (2 tests).

- [ ] **Step 5: Write the Contact page**

```tsx
// src/app/contact/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import QuoteForm from "@/components/QuoteForm";

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-2 text-[var(--freight-text-muted)]">{t.subtitle}</p>
      <div className="mt-10">
        <QuoteForm />
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Verify the full build still passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/QuoteForm.tsx src/components/QuoteForm.test.tsx src/app/contact/
git commit -m "feat: add quote form and Contact page"
```

---

## Task 13: Carrier form + Devenir Carrier page

**Files:**
- Create: `src/components/CarrierForm.tsx`
- Create: `src/app/devenir-carrier/page.tsx`
- Test: `src/components/CarrierForm.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- CarrierForm
```

Expected: FAIL — `Cannot find module './CarrierForm'`.

- [ ] **Step 3: Write CarrierForm**

```tsx
// src/components/CarrierForm.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateCarrierForm, CarrierFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import FormStatus, { FormStatusState } from "./FormStatus";

const EMPTY: CarrierFormValues = { name: "", equipment: "", zone: "", email: "", phone: "" };

export default function CarrierForm() {
  const { lang } = useLanguage();
  const t = translations[lang].carrier.form;
  const status = translations[lang].formStatus;

  const [values, setValues] = useState<CarrierFormValues>(EMPTY);
  const [state, setState] = useState<FormStatusState>("idle");
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const field = (key: keyof CarrierFormValues) => ({
    id: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCarrierForm(values);
    if (!result.valid) {
      setValidationMessage(status.validationError);
      setState("idle");
      return;
    }
    setValidationMessage(null);
    setSending(true);
    const sendResult = await sendFormEmail("carrier", { ...values });
    setSending(false);
    setState(sendResult.status === "sent" ? "success" : "error");
    if (sendResult.status === "sent") {
      setValues(EMPTY);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label htmlFor="name">{t.name}</label>
        <input {...field("name")} id="name" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="equipment">{t.equipment}</label>
        <input {...field("equipment")} id="equipment" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="zone">{t.zone}</label>
        <input {...field("zone")} id="zone" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email">{t.email}</label>
        <input {...field("email")} id="email" type="email" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="phone">{t.phone}</label>
        <input {...field("phone")} id="phone" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>

      {validationMessage && <FormStatus state="error" successText="" errorText={validationMessage} />}
      <FormStatus state={state} successText={status.success} errorText={status.errorSend} />

      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-[var(--freight-accent)] px-6 py-3 font-bold text-white disabled:opacity-70"
      >
        {sending ? t.sending : t.submit}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- CarrierForm
```

Expected: PASS (2 tests).

- [ ] **Step 5: Write the Devenir Carrier page**

```tsx
// src/app/devenir-carrier/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import CarrierForm from "@/components/CarrierForm";

export default function CarrierPage() {
  const { lang } = useLanguage();
  const t = translations[lang].carrier;

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-2 text-[var(--freight-text-muted)]">{t.subtitle}</p>
      <div className="mt-10">
        <CarrierForm />
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/CarrierForm.tsx src/components/CarrierForm.test.tsx src/app/devenir-carrier/
git commit -m "feat: add carrier signup form and Devenir Carrier page"
```

---

## Task 14: Tracking form + Suivi page

**Files:**
- Create: `src/components/TrackingForm.tsx`
- Create: `src/app/suivi/page.tsx`
- Test: `src/components/TrackingForm.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/TrackingForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/language-context";
import { sendFormEmail } from "@/lib/send-email";
import TrackingForm from "./TrackingForm";

vi.mock("@/lib/send-email", () => ({
  sendFormEmail: vi.fn(),
}));

describe("TrackingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a validation error when the load number is empty", async () => {
    render(
      <LanguageProvider>
        <TrackingForm />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Demander le statut" }));
    expect(await screen.findByText("Veuillez remplir tous les champs requis correctement.")).toBeInTheDocument();
    expect(sendFormEmail).not.toHaveBeenCalled();
  });

  it("calls sendFormEmail with kind 'tracking' when the form is valid", async () => {
    (sendFormEmail as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: "sent" });
    render(
      <LanguageProvider>
        <TrackingForm />
      </LanguageProvider>
    );
    fireEvent.change(screen.getByLabelText("Numéro de charge"), { target: { value: "LD-1234" } });
    fireEvent.change(screen.getByLabelText("Courriel"), { target: { value: "client@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Demander le statut" }));

    expect(await screen.findByText("Votre demande a été envoyée avec succès.")).toBeInTheDocument();
    expect(sendFormEmail).toHaveBeenCalledWith("tracking", expect.objectContaining({ loadNumber: "LD-1234" }));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- TrackingForm
```

Expected: FAIL — `Cannot find module './TrackingForm'`.

- [ ] **Step 3: Write TrackingForm**

```tsx
// src/components/TrackingForm.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { validateTrackingForm, TrackingFormValues } from "@/lib/form-validation";
import { sendFormEmail } from "@/lib/send-email";
import FormStatus, { FormStatusState } from "./FormStatus";

const EMPTY: TrackingFormValues = { loadNumber: "", email: "" };

export default function TrackingForm() {
  const { lang } = useLanguage();
  const t = translations[lang].tracking.form;
  const status = translations[lang].formStatus;

  const [values, setValues] = useState<TrackingFormValues>(EMPTY);
  const [state, setState] = useState<FormStatusState>("idle");
  const [sending, setSending] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const field = (key: keyof TrackingFormValues) => ({
    id: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateTrackingForm(values);
    if (!result.valid) {
      setValidationMessage(status.validationError);
      setState("idle");
      return;
    }
    setValidationMessage(null);
    setSending(true);
    const sendResult = await sendFormEmail("tracking", { ...values });
    setSending(false);
    setState(sendResult.status === "sent" ? "success" : "error");
    if (sendResult.status === "sent") {
      setValues(EMPTY);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label htmlFor="loadNumber">{t.loadNumber}</label>
        <input {...field("loadNumber")} id="loadNumber" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email">{t.email}</label>
        <input {...field("email")} id="email" type="email" className="w-full rounded-lg border border-black/10 px-3 py-2" />
      </div>

      {validationMessage && <FormStatus state="error" successText="" errorText={validationMessage} />}
      <FormStatus state={state} successText={status.success} errorText={status.errorSend} />

      <button
        type="submit"
        disabled={sending}
        className="rounded-full bg-[var(--freight-accent)] px-6 py-3 font-bold text-white disabled:opacity-70"
      >
        {sending ? t.sending : t.submit}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- TrackingForm
```

Expected: PASS (2 tests).

- [ ] **Step 5: Write the Suivi page**

```tsx
// src/app/suivi/page.tsx
"use client";

import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import TrackingForm from "@/components/TrackingForm";

export default function TrackingPage() {
  const { lang } = useLanguage();
  const t = translations[lang].tracking;

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-black">{t.title}</h1>
      <p className="mt-2 text-[var(--freight-text-muted)]">{t.subtitle}</p>
      <div className="mt-10">
        <TrackingForm />
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Full test suite + build check**

```bash
npm run test
npm run build
```

Expected: all tests pass, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/TrackingForm.tsx src/components/TrackingForm.test.tsx src/app/suivi/
git commit -m "feat: add tracking-status form and Suivi page"
```

---

## Task 15: EmailJS setup docs

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write setup instructions**

```md
# Solvaco Freight — Website

Bilingual (FR/EN) marketing site for Solvaco Freight. Next.js + TypeScript + Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Email delivery (EmailJS)

The three forms (quote, carrier signup, tracking) send through [EmailJS](https://www.emailjs.com/), client-side, no backend.

1. Create an EmailJS account and an Email Service — note the **Service ID**.
2. Create three Email Templates (quote, carrier, tracking) — note each **Template ID**.
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_CARRIER`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_TRACKING`

Until these are set, submitting any form shows a "not configured" error instead of silently failing.

## Testing

```bash
npm run test
```

## Scope

Separate repo from `solvaco-website` (construction site) and `flatbed-broker` (internal ops/TMS) — no shared code, no shared deploy, no live connection between them. See `docs/superpowers/specs/2026-08-15-solvaco-freight-website-design.md`.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add setup and EmailJS configuration instructions"
```

---

## Task 16: Manual QA pass

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Walk through the checklist in a browser at `http://localhost:3000`**

- [ ] Accueil loads, all 3 hero CTAs navigate to the right pages
- [ ] Services shows all 4 service cards
- [ ] À propos loads with FR/EN body text
- [ ] Devenir Carrier form: submitting empty shows validation error; filled form (with `.env.local` EmailJS keys configured) sends and shows success
- [ ] Suivi form: same validation/success behavior
- [ ] Contact/Quote form: same validation/success behavior
- [ ] Language toggle switches every page's text FR ↔ EN and persists across a page reload
- [ ] Responsive check at 375px (mobile) and 1440px (desktop) widths — nav collapses sensibly, forms remain usable
- [ ] `npm run build` still succeeds after any fixes made during this pass

- [ ] **Step 3: If any bugs were fixed during QA, commit them**

```bash
git add -A
git commit -m "fix: address issues found during manual QA pass"
```

---

## Self-Review Notes

- **Spec coverage:** all 6 pages (Task 6–8, 12–14), 3 forms with validation + email delivery + success/error states (Tasks 9–14), bilingual FR/EN with toggle (Tasks 1–2, 4), reused logo (Task 0 Step 5), more colorful palette than the construction site (Task 3), tracking as a status-request email form with explicitly no TMS connection (Task 14), separate repo/no shared code (Task 0, stated throughout) are all covered.
- **Placeholder scan:** no TBDs — the one open item from the spec (exact palette hex values) is resolved concretely in Task 3 rather than left as a placeholder.
- **Type consistency:** `QuoteFormValues`, `CarrierFormValues`, `TrackingFormValues` defined once in `form-validation.ts` and reused identically in `send-email.test.ts` mocks and the matching form components; `FormStatusState` defined once in `FormStatus.tsx` and imported everywhere it's used.
