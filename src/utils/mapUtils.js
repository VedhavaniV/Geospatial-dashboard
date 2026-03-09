// src/utils/mapUtils.js
import L from "leaflet";

// Fix Leaflet default icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const SEVERITY_COLORS = {
  critical: "#dc2626",
  high: "#ea580c",
  medium: "#d97706",
  low: "#16a34a",
};

export const TYPE_ICONS = {
  incident: "⚠️",
  asset: "📦",
  iot: "📡",
};

export const STATUS_COLORS = {
  active: "#dc2626",
  operational: "#16a34a",
  warning: "#d97706",
  monitoring: "#2563eb",
};

/**
 * Create a custom divIcon based on event type and severity
 */
export function createCustomIcon(event) {
  const color = SEVERITY_COLORS[event.severity] || "#6b7280";
  const icon = TYPE_ICONS[event.type] || "📍";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        cursor: pointer;
      ">
        ${icon}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

/**
 * Format timestamp to readable string
 */
export function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get badge style for severity
 */
export function getSeverityBadgeStyle(severity) {
  const bg = SEVERITY_COLORS[severity] || "#6b7280";
  return {
    backgroundColor: bg,
    color: "white",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
  };
}
