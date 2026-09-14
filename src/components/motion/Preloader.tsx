"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const EASE = [0.32, 0.72, 0, 1] as const;
const SESSION_KEY = "nayem-preloader-shown";

export default function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const barScaleX = useTransform(count, [0, 100], [0, 1]);

  useMotionValueEvent(count, "change", (v) => setDisplayValue(Math.round(v)));

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    if (prefersReducedMotion) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setVisible(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const controls = animate(count, 100, {
      duration: 1.6,
      ease: EASE,
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = previousOverflow;
        setVisible(false);
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-dark-primary"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl font-bold text-white"
          >
            Nayem<span className="text-gold">.</span>
          </motion.p>

          <div className="h-px w-40 overflow-hidden bg-dark-border">
            <motion.div
              style={{ scaleX: barScaleX }}
              className="h-full w-full origin-left bg-gold"
            />
          </div>

          <p className="font-mono text-sm tabular-nums text-text-muted">
            {displayValue}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
