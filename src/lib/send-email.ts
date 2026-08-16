// src/lib/send-email.ts
import emailjs from "@emailjs/browser";

export type FormKind = "quote" | "carrier" | "tracking";

export type SendResult = { status: "sent" } | { status: "error" } | { status: "not-configured" };

const TEMPLATE_ENV_KEY: Record<FormKind, string> = {
  quote: "NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE",
  carrier: "NEXT_PUBLIC_EMAILJS_TEMPLATE_CARRIER",
  tracking: "NEXT_PUBLIC_EMAILJS_TEMPLATE_TRACKING",
};

export async function sendFormEmail(
  kind: FormKind,
  templateParams: Record<string, string>
): Promise<SendResult> {
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
