import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { createPlaylist } from "../api/playlists";

export default function Create() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
    genre: "",
    cover: "",
    isPublic: true,
  });

  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Upload image ONLY
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setCoverPreview(previewURL);
    setPlaylist((p) => ({ ...p, cover: previewURL }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlaylist((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Only require title (no genre)
    if (!playlist.title) {
      setError("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const created = await createPlaylist({
        ownerId: user.id,
        title: playlist.title,
        description: playlist.description,
        isPublic: playlist.isPublic,
      });

      navigate(`/playlist/${created.id}`);
    } catch (err) {
      setError("Could not create playlist.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-8">Create a New Playlist</h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-[#16121d] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-xl"
        >
          {error && <p className="text-red-400">{error}</p>}

          {/* Cover Selector */}
          <div className="flex flex-col items-center mb-4">
            <label
              htmlFor="coverUpload"
              className="w-40 h-40 bg-[#0e0e12] border border-gray-700 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:opacity-80 transition"
            >
              {coverPreview ? (
                <img src={coverPreview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Add Cover Image</span>
              )}
            </label>

            <input
              type="file"
              id="coverUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-400 mb-2">Playlist Title *</label>
            <input
              type="text"
              name="title"
              value={playlist.title}
              onChange={handleChange}
              placeholder="Enter playlist name"
              className="w-full bg-[#0e0e12] border border-gray-700 rounded-lg px-4 py-3"
              required
            />
          </div>

          {/* Description (optional) */}
          <div>
            <label className="block text-gray-400 mb-2">Description (Optional)</label>
            <textarea
              name="description"
              rows="3"
              value={playlist.description}
              onChange={handleChange}
              placeholder="Add a description..."
              className="w-full bg-[#0e0e12] border border-gray-700 rounded-lg px-4 py-3 resize-none"
            />
          </div>
          
          {/* Public toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublic"
              checked={playlist.isPublic}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-300">Make playlist public</span>
          </div>

          {/* Create Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Playlist"}
          </button>
        </form>
      </main>
    </div>
  );
}
