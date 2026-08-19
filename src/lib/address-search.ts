// src/lib/address-search.ts
export type AddressSuggestion = {
  label: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  lat: number;
  lng: number;
};

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    name?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};

// Roughly Canada + continental US — Photon's global index otherwise ranks
// short/ambiguous queries (e.g. a house number + "av") against the whole
// planet and returns results like Spanish bus stops for a Quebec address.
const NORTH_AMERICA_BBOX = "-141,15,-52,75";

// Free, no-API-key address search via Komoot's Photon (built on OpenStreetMap
// data, designed for autocomplete-while-typing — unlike Nominatim, whose
// usage policy explicitly discourages that). Swap for Mapbox/Google Places
// before any high-volume production use.
export async function searchAddress(
  query: string,
  signal?: AbortSignal,
  lang: "fr" | "en" = "fr"
): Promise<AddressSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return [];

  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", trimmed);
  url.searchParams.set("limit", "5");
  url.searchParams.set("lang", lang);
  url.searchParams.set("bbox", NORTH_AMERICA_BBOX);
  url.searchParams.set("layer", "house");
  url.searchParams.append("layer", "street");
  url.searchParams.append("layer", "city");

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) return [];

  const data = (await res.json()) as { features: PhotonFeature[] };

  return data.features.map((f) => {
    const p = f.properties;
    const [lng, lat] = f.geometry.coordinates;
    const streetLine = [p.housenumber, p.street].filter(Boolean).join(" ") || p.name || "";
    const label = [streetLine || p.name, p.city, p.state, p.postcode, p.country]
      .filter(Boolean)
      .join(", ");

    return {
      label,
      address: streetLine,
      city: p.city ?? "",
      province: p.state ?? "",
      postalCode: p.postcode ?? "",
      country: p.country ?? "",
      lat,
      lng,
    };
  });
}
