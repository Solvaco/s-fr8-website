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
