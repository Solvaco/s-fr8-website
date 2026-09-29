// src/app/api/forms/[kind]/route.ts
//
// Relais serveur des formulaires du site vers n8n. Avant, le navigateur du
// visiteur appelait directement le webhook n8n (URL publique, sans secret) :
// n'importe qui pouvait crÃ©er de faux prospects et faire envoyer des courriels
// de confirmation depuis info@s-fr8.com. Ici :
//   1. le secret N8N_FORM_SECRET reste cÃ´tÃ© serveur (jamais dans le navigateur) ;
//   2. seules les requÃªtes venant du site sont acceptÃ©es (en-tÃªte Origin) ;
//   3. une limite simple par adresse IP freine les envois en rafale.
import { NextResponse } from "next/server";

const N8N_WEBHOOKS: Record<string, string> = {
  quote: "https://n8nprof.tech/webhook/s-fr8/client-form",
  carrier: "https://n8nprof.tech/webhook/s-fr8/carrier-form",
};

const ALLOWED_ORIGINS = ["https://www.s-fr8.com", "https://s-fr8.com"];

// Limite par instance serveur (mÃ©moire) : suffisant contre les rafales
// d'un robot, sans dÃ©pendance externe.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  const target = N8N_WEBHOOKS[kind];
  if (!target) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const origin = request.headers.get("origin");
  const isDev = process.env.NODE_ENV !== "production";
  if (!isDev && (!origin || !ALLOWED_ORIGINS.includes(origin))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnu";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const secret = process.env.N8N_FORM_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-SFR8-Form-Secret": secret },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "upstream_unreachable" }, { status: 502 });
  }
}
