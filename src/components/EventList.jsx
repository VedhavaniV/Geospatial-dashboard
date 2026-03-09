// src/components/EventList.jsx
import React from "react";
import { formatTimestamp, SEVERITY_COLORS, TYPE_ICONS } from "../utils/mapUtils";

export default function EventList({ events, onSelect }) {
  if (events.length === 0) {
    return (
      <div className="event-list-empty">
        <p>No events match current filters.</p>
      </div>
    );
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <div
          key={event.id}
          className={`event-card severity-${event.severity}`}
          onClick={() => onSelect(event)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(event)}
        >
          <div className="event-card-header">
            <span className="event-icon">{TYPE_ICONS[event.type]}</span>
            <div className="event-card-title">
              <h4>{event.title}</h4>
              <span className="event-type-badge">{event.type}</span>
            </div>
            <span
              className="severity-dot"
              style={{ backgroundColor: SEVERITY_COLORS[event.severity] }}
              title={event.severity}
            ></span>
          </div>
          <p className="event-card-desc">{event.description}</p>
          <div className="event-card-footer">
            <span>{event.assignee}</span>
            <span>{formatTimestamp(event.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
