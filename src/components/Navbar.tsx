"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import LanguageToggle from "./LanguageToggle";
import MagneticButton from "./MagneticButton";
import MobileMenu from "./MobileMenu";

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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md relative">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Solvaco" width={32} height={32} className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-tight text-ink">Solvaco Freight</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/70 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <div className="hidden sm:block">
            <MagneticButton
              href="/contact"
              className="inline-block rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              {t.cta}
            </MagneticButton>
          </div>
          <MobileMenu links={links} cta={{ href: "/contact", label: t.cta }} />
        </div>
      </div>
    </header>
  );
}
