// src/components/ServiceCard.tsx
export default function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[var(--freight-primary)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--freight-text-muted)]">{desc}</p>
    </div>
  );
}
