// src/components/RouteMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { geocodeCity, type GeocodeResult } from "@/lib/geocode";
import { useLanguage } from "@/lib/language-context";

// Leaflet's default marker icon references relative image paths that break
// under bundlers — point them at the CDN copies instead of shipping our own.
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function useDebouncedGeocode(query: string, delayMs = 600) {
  const [result, setResult] = useState<GeocodeResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle");

  useEffect(() => {
    if (!query.trim()) {
      setResult(null);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const found = await geocodeCity(query, controller.signal);
        setResult(found);
        setStatus(found ? "found" : "not-found");
      } catch {
        if (!controller.signal.aborted) setStatus("not-found");
      }
    }, delayMs);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, delayMs]);

  return { result, status };
}

function FitBounds({ points }: { points: GeocodeResult[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 7);
      return;
    }
    map.fitBounds(
      points.map((p) => [p.lat, p.lng]),
      { padding: [40, 40] }
    );
  }, [map, points]);
  return null;
}

export default function RouteMap({ origin, destination }: { origin: string; destination: string }) {
  const { lang } = useLanguage();
  const originGeo = useDebouncedGeocode(origin);
  const destGeo = useDebouncedGeocode(destination);
  const points = [originGeo.result, destGeo.result].filter((p): p is GeocodeResult => p !== null);
  const hasAnyInput = origin.trim().length > 0 || destination.trim().length > 0;
  const containerRef = useRef<HTMLDivElement>(null);

  if (!hasAnyInput) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-line bg-panel text-center text-sm text-muted">
        {lang === "fr"
          ? "Entrez une origine et une destination pour voir l'itinéraire"
          : "Enter an origin and destination to see the route"}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-64 overflow-hidden rounded-2xl border border-line">
      <MapContainer center={[45.5, -73.6]} zoom={5} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {originGeo.result && <Marker position={[originGeo.result.lat, originGeo.result.lng]} icon={markerIcon} />}
        {destGeo.result && <Marker position={[destGeo.result.lat, destGeo.result.lng]} icon={markerIcon} />}
        {points.length === 2 && (
          <Polyline
            positions={points.map((p) => [p.lat, p.lng])}
            pathOptions={{ color: "var(--color-accent)", weight: 3, dashArray: "6 6" }}
          />
        )}
        <FitBounds points={points} />
      </MapContainer>
    </div>
  );
}
