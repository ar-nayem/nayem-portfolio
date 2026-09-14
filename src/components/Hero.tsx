"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CtaButton from "./CtaButton";
import Counter from "./motion/Counter";
import HeroGlobe from "./motion/HeroGlobe";

const EASE = [0.32, 0.72, 0, 1] as const;

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ar-nayem-04b53126b/" },
  { label: "GitHub", href: "https://github.com/ar-nayem" },
  { label: "Facebook", href: "https://www.facebook.com/share/188hce9sPx/" },
  { label: "Instagram", href: "https://www.instagram.com/arnayem3622/" },
];

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(true);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div
          className="animate-float absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="mb-4 inline-block rounded-full border border-gold/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            Project Manager & International Operations
          </span>
          <h1 className="mt-4 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            MD Aminur Rahman{" "}
            <span className="text-gold">Nayem</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-text-muted">
            I plan and run cross-border operations. Vendors, logistics, and
            teams across 12 countries, aligned to one delivery timeline.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Work
            </CtaButton>
            <CtaButton
              variant="outline"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let&apos;s Talk
            </CtaButton>
          </div>

          <div className="mt-10 flex gap-5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted transition-colors hover:text-gold"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute -inset-16">
            <HeroGlobe />
          </div>
          <div className="absolute inset-0 rounded-full border border-gold/30" />
          <div className="absolute inset-6 flex items-center justify-center overflow-hidden rounded-full border-2 border-gold/60 bg-[radial-gradient(circle_at_30%_20%,var(--color-dark-secondary),var(--color-dark-primary))]">
            {photoFailed ? (
              <span
                className="font-sans text-[9rem] font-bold leading-none text-gold/90"
                aria-hidden
              >
                N
              </span>
            ) : (
              <Image
                src="/images/profile.jpg"
                alt="MD Aminur Rahman Nayem"
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover"
                priority
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>

          <div className="absolute -left-6 top-10 rounded-2xl border border-dark-border bg-dark-secondary px-4 py-3 shadow-lg sm:-left-10">
            <Counter value={12} className="text-2xl font-bold text-gold" />
            <p className="text-xs text-text-muted">Countries</p>
          </div>
          <div className="absolute -right-4 bottom-14 rounded-2xl border border-dark-border bg-dark-secondary px-4 py-3 shadow-lg sm:-right-8">
            <Counter value={7} suffix="+" className="text-2xl font-bold text-gold" />
            <p className="text-xs text-text-muted">Years</p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="animate-scroll-pulse flex h-10 w-6 justify-center rounded-full border-2 border-gold/50 pt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}
