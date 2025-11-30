import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PlaylistDetails() {
  const { id } = useParams();

  const playlist = {
    id,
    title: "Chill Vibes",
    creator: "Amara",
    description: "A smooth blend of relaxing tunes for late nights and calm mornings.",
  };

  const songs = [
    { id: 1, title: "Moonlight", artist: "Daxion", duration: "3:42" },
    { id: 2, title: "Breeze", artist: "Kali Wave", duration: "4:01" },
    { id: 3, title: "Dreamline", artist: "Miko", duration: "2:57" },
    { id: 4, title: "Evening Glow", artist: "Lune", duration: "3:23" },
    { id: 5, title: "Soft Static", artist: "Enzo", duration: "4:11" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">

        {/* Playlist Banner */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
          
          {/* Placeholder instead of cover image */}
          <div className="w-48 h-48 bg-[#0f0c17] rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-5xl text-purple-400">▶</span>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-2">{playlist.title}</h2>
            <p className="text-gray-400 mb-2">by {playlist.creator}</p>
            <p className="text-gray-500 max-w-md mb-4">{playlist.description}</p>

            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition">
              ▶ Play All
            </button>
          </div>
        </div>

        {/* Songs List */}
        <div className="bg-[#16121d] rounded-xl border border-gray-800 overflow-hidden">
          <div className="grid grid-cols-4 text-gray-400 uppercase text-sm px-6 py-3 border-b border-gray-800">
            <span>#</span>
            <span>Title</span>
            <span>Artist</span>
            <span className="text-right">Duration</span>
          </div>

          {songs.map((song, index) => (
            <div
              key={song.id}
              className="grid grid-cols-4 items-center px-6 py-3 hover:bg-[#1e1b29] transition"
            >
              <span className="text-gray-400">{index + 1}</span>
              <span className="font-medium">{song.title}</span>
              <span className="text-gray-400">{song.artist}</span>
              <span className="text-right text-gray-500">{song.duration}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
