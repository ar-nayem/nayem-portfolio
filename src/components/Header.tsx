"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import CtaButton from "./CtaButton";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "/projects" },
  { label: "Photography", href: "#photography" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.32, 0.72, 0, 1] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // A real route (e.g. "/blog"), not an in-page section anchor.
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:pt-6">
      <div
        className={`pointer-events-auto relative z-50 mx-auto flex max-w-3xl items-center justify-between gap-6 rounded-full border border-white/10 bg-dark-secondary/70 px-3 py-2 backdrop-blur-xl transition-shadow duration-300 md:px-4 ${
          scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.4)]" : "shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="pl-2 text-lg font-bold tracking-wide text-white"
        >
          Nayem<span className="text-gold">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm text-text-muted transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <CtaButton
            size="sm"
            variant="outline"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
          >
            Let&apos;s Talk
          </CtaButton>
        </div>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-5 bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-transform duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="pointer-events-auto fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-dark-primary/80 backdrop-blur-3xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                className="rounded-full px-4 py-3 text-2xl font-medium text-white transition-colors hover:text-gold"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
