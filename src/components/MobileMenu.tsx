"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { staggerContainer, fadeUp } from "@/lib/motion-variants";

type NavLink = { href: string; label: string };

export default function MobileMenu({ links, cta }: { links: NavLink[]; cta: { href: string; label: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink"
      >
        {open ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-line bg-paper shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 px-4 py-4"
            >
              {links.map((link) => (
                <motion.div key={link.href} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-panel"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeUp} className="pt-2">
                <Link
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  {cta.label}
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
