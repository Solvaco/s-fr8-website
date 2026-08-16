import type { ReactNode } from "react";

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
  return (
    <div
      className={`group rounded-[1.75rem] border border-line bg-panel p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}
