"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CtaButton from "./CtaButton";
import ProjectImage from "./ProjectImage";
import type { WorkItem } from "@/lib/cms";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function ProjectDetailView({ project }: { project: WorkItem }) {
  return (
    <section className="pt-40 pb-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.7, ease: EASE }}>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold opacity-80 transition-opacity hover:opacity-100"
          >
            ← All Work
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gold">
            {project.role}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            {project.title}
          </h1>

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
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="relative mt-10 aspect-video w-full overflow-hidden rounded-[2rem] border border-white/10 bg-dark-secondary"
        >
          <ProjectImage
            src={project.image}
            alt={project.title}
            sizes="(max-width: 768px) 100vw, 800px"
            imgClassName="object-cover"
            priority
          />
        </motion.div>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-text-muted"
        >
          {project.description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-12"
        >
          <CtaButton href="/#contact" size="sm">
            Let&apos;s Talk
          </CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
