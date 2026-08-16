// src/components/FormStatus.tsx
export type FormStatusState = "idle" | "success" | "error";

export default function FormStatus({
  state,
  successText,
  errorText,
}: {
  state: FormStatusState;
  successText: string;
  errorText: string;
}) {
  if (state === "idle") return null;

  if (state === "success") {
    return (
      <div className="rounded-xl border border-[var(--freight-accent-2)]/30 bg-[var(--freight-accent-2)]/10 p-4 text-sm font-medium text-[var(--freight-accent-2)]">
        {successText}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-medium text-red-500">
      {errorText}
    </div>
  );
}
