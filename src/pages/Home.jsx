import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const playlists = [
    { id: 1, title: "Chill Vibes", creator: "Amara" },
    { id: 2, title: "Afrobeats Mix", creator: "Tunde" },
    { id: 3, title: "Focus Flow", creator: "Lina" },
    { id: 4, title: "Late Night Jazz", creator: "Remi" },
  ];

  const recent = [
    { id: 5, title: "Coding Beats", creator: "Nora" },
    { id: 6, title: "RnB Essentials", creator: "Jade" },
    { id: 7, title: "Lo-Fi Study", creator: "Ben" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      {/* Main Content */}
      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">
      {/* Search Bar */}
        <div className="mb-10 mt-6">
          <input
            type="text"
            placeholder="Search songs, artists, playlists..."
            className="w-full md:w-1/2 bg-[#16121d] border border-gray-700 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />
        </div>

        {/* My Playlists */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">My Playlists</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {playlists.map((p) => (
              <Link
                key={p.id}
                to={`/playlist/${p.id}`}
                className="bg-[#16121d] rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                {/* Placeholder instead of image */}
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

        {/* Recently Played */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Recently Played</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {recent.map((p) => (
              <Link
                key={p.id}
                to={`/playlist/${p.id}`}
                className="bg-[#16121d] rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                {/* Placeholder instead of image */}
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
