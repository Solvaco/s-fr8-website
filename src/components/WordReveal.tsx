"use client";

import { motion } from "framer-motion";

const wordVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 150, damping: 18 } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

export default function WordReveal({
  segments,
}: {
  segments: { text: string; className?: string }[];
}) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ display: "inline" }}
    >
      {segments.map((segment, si) =>
        segment.text.split(" ").map((word, wi) => (
          <motion.span
            key={`${si}-${wi}`}
            variants={wordVariant}
            className={segment.className}
            style={{ display: "inline-block" }}
          >
            {word}
            {wi < segment.text.split(" ").length - 1 ? " " : si < segments.length - 1 ? " " : ""}
          </motion.span>
        ))
      )}
    </motion.span>
  );
}
