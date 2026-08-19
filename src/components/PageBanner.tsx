"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PageBanner({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={ref}
      className={`relative aspect-[21/9] w-full overflow-hidden rounded-[1.75rem] ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1400px) 100vw, 1400px" />
      </motion.div>
    </div>
  );
}
