"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ServiceCard({
  title,
  desc,
  icon,
  className = "",
}: {
  title: string;
  desc: string;
  icon: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`rounded-[1.75rem] border border-line bg-panel p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">{desc}</p>
    </motion.div>
  );
}
