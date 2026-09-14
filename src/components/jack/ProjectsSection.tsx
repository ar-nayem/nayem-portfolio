"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";
import LiveProjectButton from "./LiveProjectButton";
import type { WorkItem } from "@/lib/cms";

function ProjectCard({
  project,
  index,
  total,
}: {
  project: WorkItem;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={ref}
      className="sticky top-24 h-[85vh] md:top-32"
      style={{ marginTop: index * 28 }}
    >
      <motion.div
        style={{ scale }}
        className="flex h-full flex-col gap-6 rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                {project.role}
              </span>
              <span className="text-lg font-medium uppercase text-[#D7E2EA] md:text-2xl">
                {project.title}
              </span>
            </div>
          </div>
          <LiveProjectButton href={`/work/${project.slug}`} />
        </div>

        <div className="flex flex-1 gap-3">
          <div className="flex w-[40%] flex-col gap-3">
            <div
              className="flex w-full flex-col items-center justify-center gap-1 rounded-[40px] border border-[#D7E2EA]/15 bg-gradient-to-br from-[#151515] to-[#0C0C0C] px-4 text-center sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50">
                Role
              </span>
              <span className="text-sm font-medium text-[#D7E2EA] sm:text-base">
                {project.role}
              </span>
            </div>
            <div
              className="flex w-full flex-1 flex-wrap content-center items-center justify-center gap-2 rounded-[40px] border border-[#D7E2EA]/15 bg-gradient-to-br from-[#151515] to-[#0C0C0C] p-4 sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D7E2EA]/25 px-3 py-1 text-[10px] uppercase tracking-wide text-[#D7E2EA]/70 sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex w-[60%] items-center rounded-[40px] border border-[#D7E2EA]/15 bg-gradient-to-br from-[#151515] to-[#0C0C0C] p-6 sm:rounded-[50px] sm:p-8 md:rounded-[60px] md:p-10">
            <p className="text-sm leading-relaxed text-[#D7E2EA]/80 sm:text-base md:text-lg">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection({ items }: { items: WorkItem[] }) {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <FadeIn delay={0}>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {items.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} total={items.length} />
        ))}
      </div>
    </section>
  );
}
