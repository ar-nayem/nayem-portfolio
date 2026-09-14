"use client";

import { motion } from "framer-motion";
import SphereGallery3D, { type GalleryItem } from "./SphereGallery3D";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Photography({ images }: { images?: GalleryItem[] }) {
  return (
    <section id="photography" className="py-28">
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
            Photography
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Frames From the Field
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-text-muted">
            Drag to orbit, scroll to zoom, hover to pull a frame forward.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 sm:h-[640px]"
        >
          <div className="h-full w-full overflow-hidden rounded-[1.625rem] bg-dark-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <SphereGallery3D background="#0b0b0f" images={images} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
