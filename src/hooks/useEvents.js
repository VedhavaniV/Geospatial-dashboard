// src/hooks/useEvents.js
import { useState, useEffect, useCallback } from "react";
import { mockEvents } from "../data/mockEvents";

/**
 * Custom hook to fetch and filter map events.
 * In production, replace the mock with an actual API call:
 *   const res = await axios.get('/api/events', { params: filters });
 */
export function useEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    severity: "all",
    status: "all",
    search: "",
  });

  // Simulate REST API fetch
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      // In production: const { data } = await axios.get('/api/v1/events');
      setAllEvents(mockEvents);
    } catch (err) {
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Client-side filtering
  useEffect(() => {
    let result = [...allEvents];

    if (filters.type !== "all") {
      result = result.filter((e) => e.type === filters.type);
    }
    if (filters.severity !== "all") {
      result = result.filter((e) => e.severity === filters.severity);
    }
    if (filters.status !== "all") {
      result = result.filter((e) => e.status === filters.status);
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    setFilteredEvents(result);
  }, [allEvents, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ type: "all", severity: "all", status: "all", search: "" });
  };

  return {
    events: filteredEvents,
    allEvents,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    refetch: fetchEvents,
  };
}
