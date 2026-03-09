// src/components/MapView.jsx
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from "react-leaflet";
import { createCustomIcon } from "../utils/mapUtils";
import EventPopup from "./EventPopup";

const { BaseLayer } = LayersControl;

// Component to fly to bounds when events change
function FitBounds({ events }) {
  const map = useMap();
  useEffect(() => {
    if (events.length > 0) {
      const bounds = events.map((e) => [e.lat, e.lng]);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [events, map]);
  return null;
}

export default function MapView({ events, loading }) {
  return (
    <div className="map-wrapper">
      {loading && (
        <div className="map-loading-overlay">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      )}

      <MapContainer
        center={[40.7128, -74.006]}
        zoom={11}
        className="leaflet-map"
        zoomControl={true}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Satellite (Esri)">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>
          <BaseLayer name="Dark Mode">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>
        </LayersControl>

        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.lat, event.lng]}
            icon={createCustomIcon(event)}
          >
            <Popup maxWidth={300} minWidth={260}>
              <EventPopup event={event} />
            </Popup>
          </Marker>
        ))}

        <FitBounds events={events} />
      </MapContainer>

      <div className="map-stats">
        <span>{events.length} events shown</span>
      </div>
    </div>
  );
}
