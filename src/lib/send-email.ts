// src/lib/send-email.ts
export type FormKind = "quote" | "carrier" | "tracking";

export type SendResult = { status: "sent" } | { status: "error" } | { status: "not-configured" };

const CRM_WEBHOOK_URL: Partial<Record<FormKind, string>> = {
  quote: "https://n8nprof.tech/webhook/s-fr8/client-form",
  carrier: "https://n8nprof.tech/webhook/s-fr8/carrier-form",
};

export async function sendFormEmail(
  kind: FormKind,
  templateParams: Record<string, string>
): Promise<SendResult> {
  const url = CRM_WEBHOOK_URL[kind];

  if (!url) {
    return { status: "not-configured" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(templateParams),
    });

    if (!response.ok) {
      return { status: "error" };
    }

    return { status: "sent" };
  } catch {
    return { status: "error" };
  }
}
