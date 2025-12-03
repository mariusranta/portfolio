"use client";

import { useEffect } from "react";
import L, { Map as LeafletMapType } from "leaflet";
import "leaflet/dist/leaflet.css";

let mapInstance: LeafletMapType | null = null;

const exampleGeoJson: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Example area" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [24.270, 60.448],
            [24.270, 60.448],
            [24.270, 60.448],
            [24.260, 60.448],
            [24.260, 60.448],
          ],
        ],
      },
    },
  ],
};

export default function LeafletMap() {
  useEffect(() => {
    if (mapInstance) return;

    const map = L.map("leaflet-map").setView([60.4518, 22.2666], 13);
    mapInstance = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([60.4616, 22.2666])
      .addTo(map)
      .bindPopup("Turku center");

    L.geoJSON(exampleGeoJson, {
      style: () => ({
        color: "#ff3333ff",
        weight: 2,
        fillOpacity: 0.2,
      }),
      onEachFeature: (feature, layer) => {
        if (feature.properties?.name) {
          layer.bindPopup(feature.properties.name as string);
        }
      },
    }).addTo(map);

    return () => {
      map.remove();
      mapInstance = null;
    };
  }, []);

  return <div id="leaflet-map" className="w-full h-full" />;
}
