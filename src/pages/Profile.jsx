import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("My Playlists");

  const playlists = [
    { id: 1, title: "Focus Flow", creator: "You" },
    { id: 2, title: "Evening Chill", creator: "You" },
    { id: 3, title: "Coding Beats", creator: "You" },
  ];

  const liked = [
    { id: 4, title: "RnB Vibes", creator: "Lina" },
    { id: 5, title: "Lo-Fi Study", creator: "Ben" },
  ];

  const followers = [
    { id: 1, name: "Amara" },
    { id: 2, name: "Remi" },
    { id: 3, name: "Tunde" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
          {/* Profile avatar placeholder */}
          <div className="w-32 h-32 bg-[#0f0c17] rounded-full flex items-center justify-center border-4 border-purple-500">
            <span className="text-4xl text-purple-400">👤</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Abdulmajeed</h2>
            <p className="text-gray-400">@abdulmajeed</p>
            <p className="mt-3 text-gray-400">Music lover • Curator • Creator</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          {["My Playlists", "Liked", "Followers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition ${
                activeTab === tab
                  ? "text-pink-400 border-b-2 border-pink-500"
                  : "text-gray-400 hover:text-purple-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* My Playlists */}
        {activeTab === "My Playlists" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {playlists.map((p) => (
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
        )}

        {/* Liked */}
        {activeTab === "Liked" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {liked.map((p) => (
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
        )}

        {/* Followers */}
        {activeTab === "Followers" && (
          <div className="flex flex-wrap gap-6">
            {followers.map((f) => (
              <div
                key={f.id}
                className="flex flex-col items-center text-center bg-[#16121d] px-6 py-4 rounded-xl border border-gray-800 hover:border-purple-500 transition"
              >
                <div className="w-20 h-20 bg-[#0f0c17] rounded-full flex items-center justify-center mb-3 border-2 border-pink-500">
                  <span className="text-2xl text-pink-400">👤</span>
                </div>
                <p className="font-semibold">{f.name}</p>
                <p className="text-gray-500 text-sm">Curator</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
