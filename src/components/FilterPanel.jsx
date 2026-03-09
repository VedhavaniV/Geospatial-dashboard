// src/components/FilterPanel.jsx
import React from "react";
import { eventTypes, severityLevels, statusOptions } from "../data/mockEvents";

export default function FilterPanel({ filters, onFilterChange, onReset, totalCount, filteredCount }) {
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <span className="event-count">
          {filteredCount} / {totalCount}
        </span>
      </div>

      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="filter-input"
          maxLength={100}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
          className="filter-select"
        >
          {eventTypes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="severity">Severity</label>
        <select
          id="severity"
          value={filters.severity}
          onChange={(e) => onFilterChange("severity", e.target.value)}
          className="filter-select"
        >
          {severityLevels.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="filter-select"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button className="reset-btn" onClick={onReset}>
        Reset Filters
      </button>

      <div className="legend">
        <h3>Legend</h3>
        <div className="legend-item"><span className="dot critical"></span> Critical</div>
        <div className="legend-item"><span className="dot high"></span> High</div>
        <div className="legend-item"><span className="dot medium"></span> Medium</div>
        <div className="legend-item"><span className="dot low"></span> Low</div>
      </div>
    </div>
  );
}
