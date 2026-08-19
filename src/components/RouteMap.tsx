// src/components/RouteMap.tsx
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "@/lib/language-context";

export type LatLng = { lat: number; lng: number };

// Leaflet's default marker icon references relative image paths that break
// under bundlers — point them at the CDN copies instead of shipping our own.
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FitBounds({ points }: { points: LatLng[] }) {
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

export default function RouteMap({ origin, destination }: { origin: LatLng | null; destination: LatLng | null }) {
  const { lang } = useLanguage();
  const points = [origin, destination].filter((p): p is LatLng => p !== null);

  if (points.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-line bg-panel text-center text-sm text-muted">
        {lang === "fr"
          ? "Choisissez une origine et une destination dans les suggestions pour voir l'itinéraire"
          : "Pick an origin and destination from the suggestions to see the route"}
      </div>
    );
  }

  return (
    <div className="h-64 overflow-hidden rounded-2xl border border-line">
      <MapContainer center={[45.5, -73.6]} zoom={5} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {origin && <Marker position={[origin.lat, origin.lng]} icon={markerIcon} />}
        {destination && <Marker position={[destination.lat, destination.lng]} icon={markerIcon} />}
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
