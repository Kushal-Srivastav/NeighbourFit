"use client";
import React, { useState } from "react";

const WORLD_MAP_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png";

export default function FindPlacesPage() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);
    try {
      // Example: Teleport API for city info (replace with more advanced API if needed)
      const res = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${location.toLowerCase().replace(/\s+/g, '-')}/details/`
      );
      if (!res.ok) throw new Error("No data found for this location.");
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* World map background */}
      <img
        src={WORLD_MAP_URL}
        alt="World Map"
        className="fixed inset-0 w-full h-full object-cover opacity-20 -z-10"
        draggable={false}
      />
      <div className="relative z-10 w-full max-w-xl bg-black/60 rounded-2xl p-8 shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Find Places to Live</h1>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter a city (e.g. London, New York)"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="p-3 rounded-lg bg-white/90 text-stone-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            min={0}
            placeholder="Max monthly budget in USD (optional)"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            className="p-3 rounded-lg bg-white/90 text-stone-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-amber-600 text-white font-bold py-3 rounded-lg shadow-md hover:scale-105 transition-all"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
        {results && (
          <div className="mt-6 bg-white/80 rounded-lg p-4 text-stone-900">
            <h2 className="text-xl font-bold mb-2">Results for {location}</h2>
            <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
            {/* TODO: Parse and display relevant info in a pretty format */}
          </div>
        )}
      </div>
    </div>
  );
}
