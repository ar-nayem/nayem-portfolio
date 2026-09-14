"use client";

import { motion } from "framer-motion";
import Counter from "./motion/Counter";

const STATS = [
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "", label: "Countries Worked With" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const SKILLS = [
  "Project Management",
  "International Operations",
  "Supply Chain",
  "Stakeholder Management",
  "Agile & Scrum",
  "Risk Management",
  "Vendor Negotiation",
  "Process Optimization",
  "Cross-Border Logistics",
  "Budget Planning",
];

const LANGUAGES = [
  { name: "English", level: 95 },
  { name: "Bengali", level: 100 },
  { name: "Mandarin (Chinese)", level: 70 },
];

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function About() {
  return (
    <section id="about" className="py-28">
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
            Driving Operations Across Borders
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <p className="text-lg leading-relaxed text-text-muted">
              I&apos;m a project manager and international operations specialist
              who helps organizations plan, coordinate, and deliver work
              across multiple countries and time zones. My focus is turning
              complex, cross-border problems into clear plans, dependable
              timelines, and measurable outcomes.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              From vendor negotiation to supply chain coordination and team
              alignment, I bring structure to operations that need to move
              fast without breaking. I care about clear communication,
              realistic planning, and getting things done right the first
              time.
            </p>

            <div className="mt-10">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                Technical & Professional Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-dark-border bg-dark-secondary px-4 py-2 text-sm text-text-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                Languages
              </h3>
              <div className="space-y-4">
                {LANGUAGES.map((language) => (
                  <div key={language.name}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-white">{language.name}</span>
                      <span className="text-text-muted">{language.level}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-dark-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${language.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-gold/30"
              >
                <div className="rounded-[1.375rem] bg-dark-secondary p-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl font-bold text-gold"
                  />
                  <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
