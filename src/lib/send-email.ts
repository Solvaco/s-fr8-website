// src/lib/send-email.ts
export type FormKind = "quote" | "carrier" | "tracking";

export type SendResult = { status: "sent" } | { status: "error" } | { status: "not-configured" };

// Les formulaires passent par la route serveur du site (/api/forms/[kind]),
// qui ajoute le secret et relaie vers n8n — l'adresse du webhook n8n et le
// secret ne sont plus jamais exposés au navigateur.
const FORM_ENDPOINTS: Partial<Record<FormKind, string>> = {
  quote: "/api/forms/quote",
  carrier: "/api/forms/carrier",
};

export async function sendFormEmail(
  kind: FormKind,
  templateParams: Record<string, string>
): Promise<SendResult> {
  const url = FORM_ENDPOINTS[kind];

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
