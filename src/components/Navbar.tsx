"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import LanguageToggle from "./LanguageToggle";
import MagneticButton from "./MagneticButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const t = translations[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 transition-[padding] duration-200 ease-out sm:px-6 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-tight text-ink">Solvaco Freight</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/70 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                  isActive
                    ? "text-ink after:w-full"
                    : "hover:text-ink after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
