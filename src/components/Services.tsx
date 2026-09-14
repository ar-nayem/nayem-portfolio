"use client";

import { motion } from "framer-motion";
import CtaButton from "./CtaButton";
import {
  ClipboardText,
  Globe,
  Package,
  ChartLineUp,
  Handshake,
  Wallet,
  type Icon,
} from "@phosphor-icons/react";
import type { ServiceItem } from "@/lib/cms";

// Keys match the fixed allow-list in the dashboard's src/lib/service-icons.ts
// — the two are meant to be kept in sync. An unrecognized key (should never
// happen, since the dashboard's <select> only offers these) falls back to
// ClipboardText rather than crashing the render.
const ICONS: Record<string, Icon> = {
  ClipboardText,
  Globe,
  Package,
  ChartLineUp,
  Handshake,
  Wallet,
};

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Services({ items }: { items: ServiceItem[] }) {
  return (
    <section id="services" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            What I Can Do For You
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {items.map((service, index) => {
            const ServiceIcon = ICONS[service.icon] ?? ClipboardText;
            return (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: EASE }}
                className="flex gap-5 border-t border-dark-border pt-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <ServiceIcon size={22} weight="light" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 rounded-[2rem] border border-gold/20 bg-white/[0.03] p-1.5"
        >
          <div className="flex flex-col items-center justify-between gap-6 rounded-[1.625rem] bg-dark-secondary p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:flex-row">
            <p className="text-center text-text-muted sm:text-left">
              Have a project that needs a steady hand across borders?
            </p>
            <CtaButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let&apos;s Talk
            </CtaButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
