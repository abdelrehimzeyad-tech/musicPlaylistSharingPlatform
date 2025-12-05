import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { fetchPublicPlaylists } from "../api/playlists";

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = ["All", "Pop", "Afrobeats", "R&B", "Hip-Hop", "Jazz"];

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
        const data = await fetchPublicPlaylists();
        setPlaylists(data);
      } catch (err) {
        console.error(err);
        setError("Could not load public playlists.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPlaylists = playlists.filter((p) => {
    const matchesFilter =
      activeFilter === "All" ||
      (p.genre &&
        p.genre.toLowerCase() === activeFilter.toLowerCase());

    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">
        {/* Search Bar */}
        <div className="mb-10 mt-6">
          <input
            type="text"
            placeholder="Search playlists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          {loading && <p>Loading playlists...</p>}
          {error && <p className="text-red-400 mb-4">{error}</p>}

          {!loading && !error && filteredPlaylists.length === 0 && (
            <p className="text-gray-400">
              No playlists found. Try a different filter or search term.
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredPlaylists.map((p) => (
              <Link
                key={p.id}
                to={`/playlist/${p.id}`}
                className="bg-[#16121d] rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="w-full h-40 bg-[#0f0c17] flex items-center justify-center">
                  {p.cover_image_url ? (
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-purple-400">▶</span>
                  )}
                </div>

                <div className="p-4">
                  <p className="font-semibold">{p.title}</p>
                  {p.genre && (
                    <p className="text-gray-400 text-xs mb-1">{p.genre}</p>
                  )}
                  <p className="text-gray-500 text-xs line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
