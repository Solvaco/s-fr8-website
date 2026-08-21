// src/lib/send-email.ts
import emailjs from "@emailjs/browser";

export type FormKind = "quote" | "carrier" | "tracking";

export type SendResult = { status: "sent" } | { status: "error" } | { status: "not-configured" };

const TEMPLATE_ENV_KEY: Record<FormKind, string> = {
  quote: "NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE",
  carrier: "NEXT_PUBLIC_EMAILJS_TEMPLATE_CARRIER",
  tracking: "NEXT_PUBLIC_EMAILJS_TEMPLATE_TRACKING",
};

const CRM_WEBHOOK_URL: Partial<Record<FormKind, string>> = {
  quote: "https://n8nprof.tech/webhook/s-fr8/client-form",
  carrier: "https://n8nprof.tech/webhook/s-fr8/carrier-form",
};

function sendToCRM(kind: FormKind, templateParams: Record<string, string>) {
  const url = CRM_WEBHOOK_URL[kind];
  if (!url) return;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(templateParams),
  }).catch(() => {
    // Le CRM est secondaire au courriel — un échec ici ne doit jamais bloquer l'utilisateur.
  });
}

export async function sendFormEmail(
  kind: FormKind,
  templateParams: Record<string, string>
): Promise<SendResult> {
  sendToCRM(kind, templateParams);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const templateId = process.env[TEMPLATE_ENV_KEY[kind]];

  if (!serviceId || !publicKey || !templateId) {
    return { status: "not-configured" };
  }

  try {
    await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    return { status: "sent" };
  } catch {
    return { status: "error" };
  }
}
