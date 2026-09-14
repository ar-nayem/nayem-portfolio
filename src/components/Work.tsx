"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CtaButton from "./CtaButton";
import type { WorkItem } from "@/lib/cms";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Work({ items }: { items: WorkItem[] }) {
  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-gold/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            My Work
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <motion.article
              key={project.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
              className={`group rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-gold/30 ${
                index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="flex h-full flex-col rounded-[1.625rem] bg-dark-secondary p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold">
                  {project.role}
                </p>
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-gold">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-dark-border px-3 py-1 text-xs text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="View"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold opacity-80 transition-opacity group-hover:opacity-100"
                >
                  View Details
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CtaButton href="/work" variant="outline">
            View All Work
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
