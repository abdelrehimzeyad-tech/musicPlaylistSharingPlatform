import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div
      className="
        min-h-screen w-full flex 
        bg-white dark:bg-[#0b0b0f]
        text-black dark:text-white 
        transition-colors duration-300
        relative
      "
    >
      {/* 🔥 Background Glow */}
      <div
        className="
          absolute inset-0 -z-10
          opacity-[0.10] dark:opacity-[0.06]
          bg-[radial-gradient(circle_at_center,rgba(180,0,255,0.25),transparent_70%)]
          blur-[120px]
        "
      />

      {/* ⭐ MAIN CONTENT (NO SIDEBAR HERE) */}
      <main
        className="
          flex-1 p-8 
          ml-20 md:ml-56   /* adjusts for sidebar */
          transition-all duration-300
        "
      >
        {/* SEARCH BAR */}
        <div className="mb-10 mt-6 flex justify-center md:justify-start">
          <input
            type="text"
            placeholder="Search songs, artists, playlists..."
            className="
              w-full md:w-1/2 
              px-6 py-3 rounded-full
              bg-gray-100 dark:bg-[#16121d]
              text-black dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              border border-gray-300 dark:border-gray-700
              shadow-md dark:shadow-[0_0_15px_rgba(120,0,255,0.25)]
              focus:outline-none focus:ring-2 
              focus:ring-purple-500 dark:focus:ring-purple-400
              transition
            "
          />
        </div>

        {/* AUTH MESSAGES */}
        {loading && <p>Loading...</p>}

        {!loading && !user && (
          <p className="text-gray-700 dark:text-gray-300">
            Please log in to see your playlists.
          </p>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* ⭐ MY PLAYLISTS */}
        {user && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Playlists
              </span>
            </h2>

            {playlists.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                You don&apos;t have any playlists yet. Create one!
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {playlists.map((p) => (
                  <Link
                    key={p.id}
                    to={`/playlist/${p.id}`}
                    className="
                      rounded-xl overflow-hidden
                      bg-gray-100 dark:bg-[#16121d]
                      border border-gray-300 dark:border-gray-700
                      hover:shadow-xl hover:scale-[1.03]
                      transition-all duration-300
                    "
                  >
                    <div
                      className="
                        w-full h-40 
                        bg-gradient-to-br from-purple-400/20 to-pink-400/20 
                        dark:from-purple-600/20 dark:to-pink-600/20
                        flex items-center justify-center
                      "
                    >
                      <span className="text-4xl text-purple-500 dark:text-purple-400">
                        ▶
                      </span>
                    </div>

                    <div className="p-4">
                      <p className="font-semibold">{p.title}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        by {p.owner_name ?? "You"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ⭐ RECENTLY PLAYED */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Recently Played
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            You can later back this with a &quot;play history&quot; table.
          </p>

          <div
            className="
              mt-4 w-full h-36 
              rounded-xl
              bg-gray-200 dark:bg-[#16121d]
              border border-gray-300 dark:border-gray-700
              flex items-center justify-center
              text-gray-600 dark:text-gray-400
            "
          >
            No recent playlists yet.
          </div>
        </section>
      </main>
    </div>
  );
}
