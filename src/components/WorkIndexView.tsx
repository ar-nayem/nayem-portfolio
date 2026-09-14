"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProjectImage from "./ProjectImage";
import type { WorkItem } from "@/lib/cms";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function WorkIndexView({ items }: { items: WorkItem[] }) {
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
            All Projects
          </span>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Selected Work
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-muted">
            Project management and international operations work across
            supply chain, vendor coordination, and process design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <motion.div
              key={project.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
            >
              <Link
                href={`/work/${project.slug}`}
                data-cursor="View"
                className="group block rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-gold/30"
              >
                <div className="overflow-hidden rounded-[1.625rem] bg-dark-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-primary">
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      imgClassName="object-cover transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold">
                      {project.role}
                    </p>
                    <h2 className="text-lg font-bold text-white transition-colors group-hover:text-gold">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
