"use client";

import {
  AttributionControl,
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  setWorkerUrl,
} from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

function MapLoadingState() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-n-bg" role="status" aria-label="Loading project map">
      <div className="w-full max-w-xl px-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-n-orange" />
          <span className="h-2.5 w-32 animate-pulse rounded-full bg-n-border" />
        </div>
        <div className="relative h-56 overflow-hidden rounded-xl border border-n-border bg-white">
          <span className="absolute -left-8 top-16 h-px w-[120%] rotate-[13deg] bg-n-purple/20" />
          <span className="absolute -left-8 top-32 h-px w-[120%] -rotate-[9deg] bg-n-orange/20" />
          <span className="absolute left-[28%] top-[38%] h-4 w-4 rounded-full bg-n-orange/40 ring-8 ring-n-orange/10" />
          <span className="absolute left-[63%] top-[62%] h-3 w-3 rounded-full bg-n-purple/45 ring-8 ring-n-purple/10" />
          <span className="absolute left-[78%] top-[25%] h-3 w-3 rounded-full bg-n-yellow/55 ring-8 ring-n-yellow/20" />
        </div>
      </div>
    </div>
  );
}

export interface MapProject {
  name: string;
  type: string;
  services: string[];
  neighborhood: string;
  borough?: string;
  lat?: number;
  lng?: number;
  status: "Ongoing" | "Upcoming" | "Completed";
  url?: string;
  colorClass: string;
  source?: "business" | "bid";
}

interface NeighborhoodMapProps {
  projects: MapProject[];
}

interface PreparedMarker extends MapProject {
  borough: string;
  isBid: boolean;
  approximate: boolean;
  lat: number;
  lng: number;
  hex: string;
  textHex: string;
}

const NYC_COORDINATE_BOUNDS = {
  minLat: 40.45,
  maxLat: 40.95,
  minLng: -74.35,
  maxLng: -73.65,
};

const CARTO_STYLE_URL = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

function getCartoStyleUrl(): string {
  const key = process.env.NEXT_PUBLIC_CARTO_BASEMAP_KEY?.trim();
  return key ? `${CARTO_STYLE_URL}?key=${encodeURIComponent(key)}` : CARTO_STYLE_URL;
}

function isNycCoordinate(lat?: number, lng?: number): boolean {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= NYC_COORDINATE_BOUNDS.minLat &&
    lat <= NYC_COORDINATE_BOUNDS.maxLat &&
    lng >= NYC_COORDINATE_BOUNDS.minLng &&
    lng <= NYC_COORDINATE_BOUNDS.maxLng
  );
}

const MARKER_HEX: Array<{ match: string; fill: string; text: string }> = [
  { match: "violet-200", fill: "#DDD6FE", text: "#6D28D9" },
  { match: "violet-300", fill: "#C4B5FD", text: "#6D28D9" },
  { match: "violet-400", fill: "#A78BFA", text: "#5B21B6" },
  { match: "orange-200", fill: "#FED7AA", text: "#C2410C" },
  { match: "orange-300", fill: "#FDBA74", text: "#C2410C" },
  { match: "orange-400", fill: "#FB923C", text: "#9A3412" },
  { match: "amber-200", fill: "#FDE68A", text: "#B45309" },
  { match: "amber-300", fill: "#FCD34D", text: "#B45309" },
  { match: "amber-400", fill: "#FBBF24", text: "#92400E" },
  { match: "fuchsia-200", fill: "#F5D0FE", text: "#A21CAF" },
  { match: "fuchsia-300", fill: "#F0ABFC", text: "#A21CAF" },
  { match: "fuchsia-400", fill: "#E879F9", text: "#86198F" },
  { match: "purple-300", fill: "#D8B4FE", text: "#7E22CE" },
  { match: "rose-200", fill: "#FECDD3", text: "#BE123C" },
  { match: "rose-300", fill: "#FDA4AF", text: "#BE123C" },
  { match: "rose-400", fill: "#FB7185", text: "#9F1239" },
];

const FALLBACK_MARKER = { fill: "#C4B5FD", text: "#6D28D9" };

const getMarkerColors = (colorClass: string): { fill: string; text: string } =>
  MARKER_HEX.find((color) => colorClass.includes(color.match)) ?? FALLBACK_MARKER;

function normalizeBorough(value?: string): "Brooklyn" | "Queens" | "Manhattan" | "Bronx" | "Staten Island" | "" {
  const raw = String(value ?? "").trim().toLowerCase();
  if (!raw) return "";
  if (raw.includes("brooklyn")) return "Brooklyn";
  if (raw.includes("queens")) return "Queens";
  if (raw.includes("manhattan")) return "Manhattan";
  if (raw.includes("bronx")) return "Bronx";
  if (raw.includes("staten")) return "Staten Island";
  return "";
}

const BOROUGH_HEX: Record<string, { fill: string; text: string }> = {
  Brooklyn: { fill: "#FDBA74", text: "#C2410C" },
  Queens: { fill: "#C4B5FD", text: "#6D28D9" },
  Manhattan: { fill: "#FCD34D", text: "#B45309" },
  Bronx: { fill: "#D8B4FE", text: "#7E22CE" },
  "Staten Island": { fill: "#FDA4AF", text: "#BE123C" },
};

const BOROUGH_FALLBACK = { fill: "#CBD5E1", text: "#475569" };

// These are representative neighborhood points, never business addresses.
const AREA_CENTERS: Record<string, [number, number]> = {
  "bayside": [40.7615, -73.7684],
  "bedford-stuyvesant": [40.6872, -73.9418],
  "brownsville": [40.6633, -73.9094],
  "canarsie brooklyn": [40.6409, -73.9007],
  "crown heights": [40.6694, -73.9422],
  "cypress hills": [40.6827, -73.8797],
  "east new york": [40.6663, -73.8826],
  "east village": [40.7265, -73.9815],
  "flushing": [40.7675, -73.8331],
  "great kills": [40.5543, -74.1515],
  "harlem": [40.8116, -73.9465],
  "hell's kitchen": [40.7638, -73.9918],
  "jackson heights": [40.7557, -73.8831],
  "long island city": [40.7447, -73.9485],
  "midtown manhattan": [40.7549, -73.9840],
  "park slope": [40.6728, -73.9778],
  "parkchester": [40.8395, -73.8609],
  "prospect heights": [40.6774, -73.9670],
  "sunnyside": [40.7433, -73.9196],
  "sunset park": [40.6455, -74.0124],
  "upper east side": [40.7736, -73.9566],
  "whitestone": [40.7933, -73.8096],
  "11206": [40.7015, -73.9423],
  "10314": [40.6035, -74.1450],
  "brooklyn": [40.6782, -73.9442],
  "bronx": [40.8448, -73.8648],
  "manhattan": [40.7831, -73.9712],
  "queens": [40.7282, -73.7949],
  "staten island": [40.5795, -74.1502],
};

export function approximateLocation(project: MapProject): [number, number] | null {
  const neighborhood = project.neighborhood.trim().toLowerCase();
  if (neighborhood === "nyc" || neighborhood === "neighborhood, borough") return null;
  const area = neighborhood.replace(/,?\s+ny$/, "").replace(/,\s*ny$/, "");
  return AREA_CENTERS[area] ?? AREA_CENTERS[normalizeBorough(project.borough).toLowerCase()] ?? null;
}

function appendTextLine(parent: HTMLElement, text: string, className: string) {
  const line = document.createElement("div");
  line.className = className;
  line.textContent = text;
  parent.appendChild(line);
}

function createPopupContent(marker: PreparedMarker): HTMLElement {
  const content = document.createElement("div");
  content.className = "novus-map-popup";

  appendTextLine(content, marker.name, "novus-map-popup__title");
  appendTextLine(content, marker.type, "novus-map-popup__muted");
  appendTextLine(content, marker.approximate ? `Approximate area: ${marker.neighborhood}` : marker.neighborhood, "novus-map-popup__muted");

  const details = document.createElement("div");
  details.className = "novus-map-popup__details";

  const status = document.createElement("span");
  status.className = "novus-map-popup__status";
  status.style.color = marker.textHex;
  status.textContent = marker.status;
  details.appendChild(status);

  if (marker.services.length > 0) {
    const separator = document.createElement("span");
    separator.textContent = "·";
    details.appendChild(separator);

    const services = document.createElement("span");
    services.textContent = marker.services.join(", ");
    details.appendChild(services);
  }

  content.appendChild(details);

  if (marker.url) {
    const internal = marker.url.startsWith("/");
    const link = document.createElement("a");
    link.className = "novus-map-popup__link";
    link.style.color = marker.textHex;
    link.href = marker.url;
    if (!internal) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.textContent = internal ? "How we work together →" : "View →";
    content.appendChild(link);
  }

  return content;
}

function createMarkerElement(marker: PreparedMarker): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "novus-map-marker";
  button.setAttribute("aria-label", `View ${marker.name}${marker.approximate ? " (approximate area)" : ""} on the map`);

  const dot = document.createElement("span");
  dot.className = marker.isBid ? "novus-map-marker__dot novus-map-marker__dot--partner" : marker.approximate ? "novus-map-marker__dot novus-map-marker__dot--approximate" : "novus-map-marker__dot";
  dot.style.backgroundColor = marker.isBid ? `${marker.hex}24` : marker.approximate ? "#fff" : marker.hex;
  dot.style.borderColor = marker.isBid ? `${marker.textHex}73` : marker.textHex;
  button.appendChild(dot);

  return button;
}

// MapLibre needs WebGL2. Without it the constructor logs an error and leaves
// the interaction handlers undefined, so the map is skipped instead of crashing
// the page.
function supportsWebGL2(): boolean {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

export default function NeighborhoodMap({ projects }: NeighborhoodMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hintTimerRef = useRef<number>();
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapUnavailable, setMapUnavailable] = useState(false);
  const [zoomModifierLabel, setZoomModifierLabel] = useState("Ctrl");

  const markers = useMemo<PreparedMarker[]>(
    () =>
      projects.map((project, index): PreparedMarker | null => {
        const precise = isNycCoordinate(project.lat, project.lng);
        const area = precise ? null : approximateLocation(project);
        if (!precise && !area) return null;
        const borough = normalizeBorough(project.borough ?? project.neighborhood);
        const isBid = project.source === "bid";
        const markerColor = isBid ? (BOROUGH_HEX[borough] ?? BOROUGH_FALLBACK) : getMarkerColors(project.colorClass);

        // Spread businesses sharing an area so every approximate marker stays clickable.
        const angle = index * 2.39996;
        const radius = area ? 0.002 * Math.sqrt(index % 7) : 0;

        return {
          ...project,
          borough,
          isBid,
          approximate: !precise,
          lat: precise ? Number(project.lat) : area![0] + Math.sin(angle) * radius,
          lng: precise ? Number(project.lng) : area![1] + Math.cos(angle) * radius,
          hex: markerColor.fill,
          textHex: markerColor.text,
        };
      }).filter((marker): marker is PreparedMarker => marker !== null),
    [projects],
  );

  useEffect(() => {
    if (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent)) setZoomModifierLabel("⌘");
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!supportsWebGL2()) {
      setMapUnavailable(true);
      return;
    }

    setMapLoaded(false);
    const map = new MapLibreMap({
      container,
      style: getCartoStyleUrl(),
      center: [-73.94, 40.7],
      zoom: 11,
      minZoom: 0,
      maxZoom: 20,
      attributionControl: false,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      maxPitch: 0,
    });

    map.touchZoomRotate.disableRotation();
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new AttributionControl({ compact: true }), "bottom-right");

    for (const marker of markers) {
      const popup = new Popup({ offset: marker.isBid ? 12 : 8, maxWidth: "280px" }).setDOMContent(createPopupContent(marker));
      new Marker({ element: createMarkerElement(marker), anchor: "center" })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map);
    }

    map.once("load", () => {
      if (markers.length > 0) {
        const bounds = new LngLatBounds();
        for (const marker of markers) bounds.extend([marker.lng, marker.lat]);
        const camera = map.cameraForBounds(bounds, { padding: 42 });
        if (camera) {
          map.jumpTo(camera);
          map.setMinZoom(camera.zoom);
        }
      }
      setMapLoaded(true);
    });

    const onWheel = (event: WheelEvent) => {
      if (event.metaKey || event.ctrlKey) {
        event.preventDefault();
        window.clearTimeout(hintTimerRef.current);
        setShowZoomHint(false);

        const rect = container.getBoundingClientRect();
        const around = map.unproject([event.clientX - rect.left, event.clientY - rect.top]);
        const step = event.deltaY < 0 ? 0.5 : -0.5;
        const zoom = Math.min(map.getMaxZoom(), Math.max(map.getMinZoom(), map.getZoom() + step));
        map.easeTo({ zoom, around, duration: 0 });
        return;
      }

      setShowZoomHint(true);
      window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = window.setTimeout(() => setShowZoomHint(false), 1300);
    };

    const onMouseLeave = () => {
      window.clearTimeout(hintTimerRef.current);
      setShowZoomHint(false);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(hintTimerRef.current);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mouseleave", onMouseLeave);
      map.remove();
    };
  }, [markers]);

  return (
    <div className="relative z-0 h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full"
        role="region"
        aria-label="Interactive map of Novus NYC business locations across New York City"
      />

      {mapUnavailable ? (
        <div className="absolute inset-0 z-[2] flex items-center justify-center bg-n-bg px-6 text-center">
          <p className="max-w-sm font-body text-sm leading-relaxed text-n-muted">
            This map needs WebGL, which your browser has turned off. Our projects are listed below.
          </p>
        </div>
      ) : !mapLoaded && (
        <div className="absolute inset-0 z-[2]">
          <MapLoadingState />
        </div>
      )}

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-[3] flex items-center justify-center transition-opacity duration-200 ${
          showZoomHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="rounded-full bg-black/70 px-4 py-2 font-body text-sm font-medium text-white shadow-lg backdrop-blur-sm">
          Hold {zoomModifierLabel} and scroll to zoom
        </span>
      </div>
    </div>
  );
}
