// src/App.js
import React, { useState } from "react";
import FilterPanel from "./components/FilterPanel";
import MapView from "./components/MapView";
import EventList from "./components/EventList";
import { useEvents } from "./hooks/useEvents";
import "./App.css";

export default function App() {
  const { events, allEvents, loading, error, filters, updateFilter, resetFilters, refetch } = useEvents();
  const [activeTab, setActiveTab] = useState("map"); // "map" | "list"

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <span className="header-logo">🗺️</span>
          <div>
            <h1>Geospatial Dashboard</h1>
            <p>Real-time event & asset monitoring</p>
          </div>
        </div>
        <div className="header-right">
          <button className="refresh-btn" onClick={refetch} disabled={loading}>
            {loading ? "Loading..." : "⟳ Refresh"}
          </button>
          <div className="connection-indicator">
            <span className="online-dot"></span> Live
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={refetch}>Retry</button>
        </div>
      )}

      {/* Main Layout */}
      <div className="app-body">
        {/* Left Sidebar: Filters */}
        <aside className="sidebar-left">
          <FilterPanel
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
            totalCount={allEvents.length}
            filteredCount={events.length}
          />
        </aside>

        {/* Center: Map / List toggle */}
        <main className="main-content">
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === "map" ? "active" : ""}`}
              onClick={() => setActiveTab("map")}
            >
              🗺 Map View
            </button>
            <button
              className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
            >
              📋 List View
            </button>
          </div>

          {activeTab === "map" ? (
            <MapView events={events} loading={loading} />
          ) : (
            <EventList events={events} onSelect={() => setActiveTab("map")} />
          )}
        </main>
      </div>
    </div>
  );
}
