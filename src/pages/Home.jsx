// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { fetchMyPlaylists } from "../api/playlists";

export default function Home() {
  const { user, loading } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        setError(null);
        const data = await fetchMyPlaylists(user.id);
        setPlaylists(data);
      } catch (err) {
        console.error(err);
        setError("Could not load your playlists.");
      }
    })();
  }, [user]);

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

        {loading && <p>Loading...</p>}
        {!loading && !user && <p>Please log in to see your playlists.</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* My Playlists */}
        {user && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">My Playlists</h2>

            {playlists.length === 0 ? (
              <p className="text-gray-400">
                You don&apos;t have any playlists yet. Create one!
              </p>
            ) : (
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
                      <p className="text-gray-400 text-sm">
                        by {p.owner_name ?? "You"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Recently Played – for now you can keep this static or reuse playlists */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Recently Played</h2>
          <p className="text-gray-500 text-sm">
            You can later back this with a &quot;play history&quot; table, but
            for the prototype it&apos;s fine to leave this simple.
          </p>
        </section>
      </main>
    </div>
  );
}
