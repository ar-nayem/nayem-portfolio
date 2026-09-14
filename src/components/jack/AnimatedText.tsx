"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden" }}>{char}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const total = text.length;
  const wordStarts = words.reduce<{ list: number[]; offset: number }>(
    (acc, word) => ({
      list: [...acc.list, acc.offset],
      offset: acc.offset + word.length + 1,
    }),
    { list: [], offset: 0 },
  ).list;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordStart = wordStarts[wordIndex];
        const chars = word.split("").map((char, charIndex) => {
          const index = wordStart + charIndex;
          const start = index / total;
          const end = (index + 1) / total;
          return (
            <Char
              key={charIndex}
              char={char}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        });

        return (
          <span key={wordIndex} style={{ display: "inline-block" }}>
            {chars}
            {wordIndex < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
