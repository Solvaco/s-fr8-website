// src/lib/geocode.ts
export type GeocodeResult = { lat: number; lng: number; label: string };

// Free, no-API-key geocoding via OpenStreetMap Nominatim. Usage policy caps
// this at ~1 request/sec — fine for a form a human is typing into, but
// swap for a paid provider (Mapbox/Google) before any bulk/automated use.
export async function geocodeCity(
  query: string,
  signal?: AbortSignal
): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return null;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", trimmed);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ca,us");

  const res = await fetch(url.toString(), { signal, headers: { Accept: "application/json" } });
  if (!res.ok) return null;

  const results = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>;
  const first = results[0];
  if (!first) return null;

  return { lat: parseFloat(first.lat), lng: parseFloat(first.lon), label: first.display_name };
}
