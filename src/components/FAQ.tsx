"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import type { FaqItem } from "@/lib/cms";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-gold/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            FAQ
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="divide-y divide-dark-border border-t border-b border-dark-border"
        >
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-start gap-4 py-6 text-left"
                >
                  <span className="pt-0.5 font-mono text-sm text-gold/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-semibold text-white sm:text-lg">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-0.5 shrink-0 text-gold"
                  >
                    <Plus size={18} weight="bold" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-9 pr-8 text-sm leading-relaxed text-text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
