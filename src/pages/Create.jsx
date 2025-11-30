import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Create() {
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
    genre: "",
    cover: "",
  });

  const handleChange = (e) => {
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Playlist created:", playlist);
    alert("🎵 Playlist created successfully (demo only)");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      {/* Main Content */}
      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">

        <h2 className="text-3xl font-bold mb-8">Create a New Playlist</h2>

        {/* Playlist Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-[#16121d] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-lg"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-400 mb-2">Playlist Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter playlist name"
              value={playlist.title}
              onChange={handleChange}
              className="w-full bg-[#0b0b0f] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Describe your playlist..."
              value={playlist.description}
              onChange={handleChange}
              className="w-full bg-[#0b0b0f] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              required
            ></textarea>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-gray-400 mb-2">Genre</label>
            <select
              name="genre"
              value={playlist.genre}
              onChange={handleChange}
              className="w-full bg-[#0b0b0f] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select genre</option>
              <option value="Pop">Pop</option>
              <option value="Afrobeats">Afrobeats</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Lo-Fi">Lo-Fi</option>
              <option value="Jazz">Jazz</option>
              <option value="Electronic">Electronic</option>
            </select>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-400 mb-2">Cover Image URL</label>
            <input
              type="url"
              name="cover"
              placeholder="Paste image link (e.g. from Unsplash)"
              value={playlist.cover}
              onChange={handleChange}
              className="w-full bg-[#0b0b0f] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Create Playlist
          </button>
        </form>

        {/* Live Preview */}
        {playlist.title && (
          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">
              Preview
            </h3>
            <div className="bg-[#16121d] border border-gray-800 p-4 rounded-xl w-64">
              <img
                src={playlist.cover || "https://i.imgur.com/W2i7TzZ.jpg"}
                alt="cover"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <p className="font-semibold">{playlist.title}</p>
              <p className="text-gray-400 text-sm">{playlist.genre}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
