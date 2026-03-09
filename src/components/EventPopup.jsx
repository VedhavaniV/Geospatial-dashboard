// src/components/EventPopup.jsx
import React from "react";
import { formatTimestamp, getSeverityBadgeStyle, STATUS_COLORS, TYPE_ICONS } from "../utils/mapUtils";

export default function EventPopup({ event }) {
  const statusColor = STATUS_COLORS[event.status] || "#6b7280";

  return (
    <div className="event-popup">
      <div className="popup-header">
        <span className="popup-type-icon">{TYPE_ICONS[event.type]}</span>
        <div>
          <h3 className="popup-title">{event.title}</h3>
          <span className="popup-type">{event.type.toUpperCase()}</span>
        </div>
      </div>

      <p className="popup-description">{event.description}</p>

      <div className="popup-meta">
        <div className="popup-row">
          <span className="popup-label">Severity</span>
          <span style={getSeverityBadgeStyle(event.severity)}>{event.severity}</span>
        </div>
        <div className="popup-row">
          <span className="popup-label">Status</span>
          <span
            style={{
              color: statusColor,
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            ● {event.status}
          </span>
        </div>
        <div className="popup-row">
          <span className="popup-label">Assignee</span>
          <span className="popup-value">{event.assignee}</span>
        </div>
        <div className="popup-row">
          <span className="popup-label">Time</span>
          <span className="popup-value">{formatTimestamp(event.timestamp)}</span>
        </div>
        <div className="popup-row">
          <span className="popup-label">Location</span>
          <span className="popup-value">
            {event.lat.toFixed(4)}, {event.lng.toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
}
