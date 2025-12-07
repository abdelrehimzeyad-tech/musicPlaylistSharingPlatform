import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      console.error(err);
      setError("Could not create playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen w-full flex
        bg-white dark:bg-[#0b0b0f]
        text-black dark:text-white
        relative transition-colors duration-300
      "
    >
      {/* 🔥 Background Glow */}
      <div
        className="
          absolute inset-0 -z-10
          opacity-[0.12] dark:opacity-[0.07]
          bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300
          blur-[150px]
        "
      />

      {/* ⭐ MAIN CONTENT (Sidebar is handled globally in App.jsx) */}
      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">
        
        <h2 className="text-4xl font-extrabold mb-10">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Create a New Playlist
          </span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            w-full max-w-xl 
            bg-gray-100 dark:bg-[#16121d]
            border border-gray-300 dark:border-gray-700
            rounded-2xl p-8 space-y-6
            shadow-xl dark:shadow-[0_0_25px_rgba(140,0,255,0.25)]
            backdrop-blur-lg
          "
        >
          {error && <p className="text-red-500">{error}</p>}

          {/* COVER PREVIEW */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="coverUpload"
              className="
                w-40 h-40 rounded-xl overflow-hidden cursor-pointer
                bg-gray-200 dark:bg-[#0e0e12]
                border border-gray-400 dark:border-gray-700
                flex items-center justify-center
                hover:opacity-80 transition
                shadow-md
              "
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 dark:text-gray-400">
                  Add Cover Image
                </span>
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

          {/* TITLE */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Playlist Title *
            </label>
            <input
              type="text"
              name="title"
              value={playlist.title}
              onChange={handleChange}
              placeholder="Enter playlist name"
              className="
                w-full px-4 py-3 rounded-lg
                bg-white dark:bg-[#0e0e12]
                border border-gray-400 dark:border-gray-700
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-500
                focus:outline-none focus:ring-2
                focus:ring-purple-500 dark:focus:ring-purple-400
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              rows="3"
              value={playlist.description}
              onChange={handleChange}
              placeholder="Add a description..."
              className="
                w-full px-4 py-3 rounded-lg resize-none
                bg-white dark:bg-[#0e0e12]
                border border-gray-400 dark:border-gray-700
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-500
                focus:outline-none focus:ring-2
                focus:ring-purple-500 dark:focus:ring-purple-400
              "
            />
          </div>

          {/* PUBLIC TOGGLE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublic"
              checked={playlist.isPublic}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Make playlist public
            </span>
          </div>

          {/* CREATE BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white shadow-md hover:opacity-90
              disabled:opacity-50 transition
            "
          >
            {loading ? "Creating..." : "Create Playlist"}
          </button>
        </form>
      </main>
    </div>
  );
}
