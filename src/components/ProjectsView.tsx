"use client";

import { motion } from "framer-motion";
import type { Repo } from "@/lib/cms";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const CATEGORY_LABELS: Record<string, string> = {
  marketplace: "Marketplace",
  saas: "SaaS",
  personal: "Personal tool",
  education: "Education",
  infra: "Infrastructure",
  site: "Site",
};

export default function ProjectsView({ items }: { items: Repo[] }) {
  return (
    <section className="pt-40 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16"
        >
          <span className="mb-3 inline-block rounded-full border border-gold/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            Code
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Every Shipped Repo
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-muted">
            Marketplaces, SaaS platforms, and personal tools — built end to
            end, deployed on my own infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((repo, index) => (
            <motion.div
              key={repo.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
              className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-gold/30"
            >
              <div className="flex h-full flex-col rounded-[1.625rem] bg-dark-secondary p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {CATEGORY_LABELS[repo.category] ?? repo.category}
                  </p>
                  {repo.status === "superseded" && (
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-text-muted">
                      Superseded
                    </span>
                  )}
                </div>

                <h2 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-gold">
                  {repo.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {repo.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {repo.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-dark-border px-3 py-1 text-xs text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="View"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gold opacity-80 transition-opacity hover:opacity-100"
                  >
                    GitHub
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                  {repo.liveUrl && (
                    <a
                      href={repo.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="View"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
                    >
                      Live site
                      <span className="transition-transform group-hover:translate-x-1">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
