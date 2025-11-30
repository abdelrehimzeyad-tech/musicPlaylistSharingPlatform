import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState("Trending");

  const filters = ["Trending", "Pop", "Afrobeats", "R&B", "Hip-Hop", "Jazz"];

  const playlists = [
    { id: 1, title: "Fresh Finds", creator: "Tami", category: "Trending" },
    { id: 2, title: "Global Top 50", creator: "Pip", category: "Pop" },
    { id: 3, title: "Workout Pump", creator: "Remi", category: "Trending" },
    { id: 4, title: "Cake Focus", creator: "Ron", category: "Jazz" },
    { id: 5, title: "Indie Mix", creator: "Zee", category: "Pop" },
    { id: 6, title: "Party Starters", creator: "Remi", category: "Afrobeats" },
    { id: 7, title: "Piano Moods", creator: "Kofi", category: "Jazz" },
  ];

  const filteredPlaylists =
    activeFilter === "All"
      ? playlists
      : playlists.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">

        {/* Search Bar */}
        <div className="mb-10 mt-6">
          <input
            type="text"
            placeholder="Search songs, artists, playlists..."
            className="w-full md:w-1/2 bg-[#16121d] border border-gray-700 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "border border-gray-700 text-gray-400 hover:border-purple-400 hover:text-purple-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Playlist Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredPlaylists.map((p) => (
              <Link
                key={p.id}
                to={`/playlist/${p.id}`}
                className="bg-[#16121d] rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="w-full h-40 bg-[#0f0c17] flex items-center justify-center">
                  <span className="text-4xl text-purple-400">▶</span>
                </div>

                <div className="p-4">
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-gray-400 text-sm">by {p.creator}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
