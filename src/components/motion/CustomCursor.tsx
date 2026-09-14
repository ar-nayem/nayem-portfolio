"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 280, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    setEnabled(true);
    document.body.classList.add("cursor-none-custom");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor]"
      );
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.body.classList.remove("cursor-none-custom");
    };
  }, [prefersReducedMotion, x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? (label ? 76 : 52) : 28;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center overflow-hidden rounded-full border border-gold/50"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: hovering ? "rgba(212,175,55,0.08)" : "rgba(212,175,55,0)",
        }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-nowrap px-1 text-[10px] font-semibold uppercase tracking-wide text-gold"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
