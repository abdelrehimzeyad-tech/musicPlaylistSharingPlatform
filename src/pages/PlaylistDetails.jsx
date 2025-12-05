// src/pages/PlaylistDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlaylistWithItems } from "../api/playlists";
import { supabase } from "../lib/supabaseClient";
import { Plus, ArrowUpDown, X, Play, Pause } from "lucide-react";

// ---- REAL iTunes SONG SEARCH ----
async function searchTracks(query) {
  if (!query) return [];

  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&entity=song&limit=10`
  );
  const data = await res.json();

  return data.results.map((track) => ({
    id: track.trackId,
    title: track.trackName,
    artist: track.artistName,
    cover: track.artworkUrl100.replace("100x100bb", "600x600bb"),
    preview: track.previewUrl,
    duration: track.trackTimeMillis,
  }));
}

export default function PlaylistDetails() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);

  // Loading + Errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add Song Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Sorting
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Play All state
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  // Rename state
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [savingTitle, setSavingTitle] = useState(false);

  // ---------------- LOAD PLAYLIST ----------------
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setLoading(true);

        const { playlist, items } = await fetchPlaylistWithItems(id);

        // Fetch creator name from profiles table
        const { data: ownerProfile } = await supabase
          .from("profiles")
          .select("display_name, username")
          .eq("id", playlist.owner_id)
          .single();

        const creatorName =
          ownerProfile?.display_name || ownerProfile?.username || null;

        setPlaylist({
          ...playlist,
          creator_name: creatorName,
        });

        setSongs(items);
      } catch (err) {
        console.error(err);
        setError("Could not load this playlist.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ---------------- SEARCH HANDLER ----------------
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    const results = await searchTracks(value);
    setSearchResults(results);
    setSearchLoading(false);
  };

  // ---------------- ADD SONG TO PLAYLIST ----------------
  async function addSongToPlaylist(track) {
    const nextPosition =
      songs.length > 0
        ? Math.max(...songs.map((s) => s.position || 0)) + 1
        : 1;

    const payload = {
      playlist_id: id,
      track_title: track.title,
      track_artist: track.artist,
      track_cover: track.cover,
      track_preview: track.preview,
      track_duration: track.duration,
      position: nextPosition,
    };

    const { data, error } = await supabase
      .from("playlist_items")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Could not save song to playlist: " + error.message);
      return;
    }

    setSongs((prev) => [...prev, data]);
  }

  // ---------------- PLAY ALL LOGIC ----------------
  const playTrackAt = (index) => {
    const audio = document.getElementById(`playlist-audio-${index}`);
    if (audio && songs[index]?.track_preview) {
      audio.currentTime = 0;
      audio.play();
      setCurrentPlayingIndex(index);
    }
  };

  const handlePlayAll = () => {
    if (!songs.length) return;
    const firstIndex = songs.findIndex((s) => s.track_preview);
    if (firstIndex === -1) return;
    playTrackAt(firstIndex);
  };

  const handleTrackEnded = (index) => {
    // find next track with a preview
    const nextIndex = songs.findIndex(
      (s, i) => i > index && s.track_preview
    );
    if (nextIndex !== -1) {
      playTrackAt(nextIndex);
    } else {
      setCurrentPlayingIndex(null);
    }
  };

  // ---------------- RENAME PLAYLIST ----------------
  const startRename = () => {
    setNewTitle(playlist.title || "");
    setIsRenaming(true);
  };

  const saveRename = async () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    try {
      setSavingTitle(true);
      const { data, error } = await supabase
        .from("playlists")
        .update({ title: trimmed })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Rename error:", error);
        alert("Could not rename playlist: " + error.message);
        return;
      }

      setPlaylist((prev) => ({
        ...prev,
        ...data,
      }));
      setIsRenaming(false);
    } finally {
      setSavingTitle(false);
    }
  };

  // ---------------- SORTING ----------------
  const applySort = (type) => {
    let sorted = [...songs];

    if (type === "recent") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (type === "title") {
      sorted.sort((a, b) => a.track_title.localeCompare(b.track_title));
    }

    setSongs(sorted);
    setShowSortMenu(false);
  };

  // ---------------- LOADING STATES ----------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex">
        <main className="flex-1 p-8 ml-20 md:ml-56">Loading…</main>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex">
        <main className="flex-1 p-8 ml-20 md:ml-56">
          <p className="text-red-500">{error ?? "Playlist not found."}</p>
        </main>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">
      <main className="flex-1 p-8 ml-20 md:ml-56 transition-all duration-300">
        {/* Playlist Banner */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
          <div className="w-48 h-48 bg-[#0f0c17] rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-5xl text-purple-400">▶</span>
          </div>

          <div>
            {/* Title + rename */}
            <div className="flex items-center gap-3 mb-2">
              {isRenaming ? (
                <>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-[#0e0e12] border border-purple-600 rounded-lg px-3 py-2 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={saveRename}
                    disabled={savingTitle}
                    className="px-3 py-2 text-sm bg-purple-600 hover:bg-purple-500 rounded-lg disabled:opacity-50"
                  >
                    {savingTitle ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsRenaming(false)}
                    className="px-3 py-2 text-sm border border-gray-600 rounded-lg hover:bg-[#201931]"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold">{playlist.title}</h2>
                  <button
                    onClick={startRename}
                    className="px-3 py-1 text-xs rounded-full border border-purple-500 text-purple-300 hover:bg-[#221333] transition"
                  >
                    Rename
                  </button>
                </>
              )}
            </div>

            {/* Creator line: use whatever is in Supabase */}
            {playlist.creator_name && (
              <p className="text-gray-400 mb-2">by {playlist.creator_name}</p>
            )}

            <p className="text-gray-500 max-w-md mb-4">
              {playlist.description}
            </p>

            {/* Play All Button */}
            <button
              onClick={handlePlayAll}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              ▶ Play All
            </button>

            {/* Spotify-style Button Row */}
            <div className="flex gap-3 mt-4">
              {/* Add Songs */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1c1526] border border-gray-700
                           hover:bg-[#2a1f3d] rounded-full text-sm text-purple-300 transition"
              >
                <Plus size={16} />
                Add Songs
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1c1526] border border-gray-700
                             hover:bg-[#2a1f3d] rounded-full text-sm text-purple-300 transition"
                >
                  <ArrowUpDown size={16} />
                  Sort
                </button>

                {showSortMenu && (
                  <div className="absolute mt-2 bg-[#16121d] border border-gray-700 rounded-lg shadow-xl w-40 p-2 z-10">
                    <button
                      onClick={() => applySort("recent")}
                      className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#221A2F] text-sm text-gray-300"
                    >
                      Recently Added
                    </button>

                    <button
                      onClick={() => applySort("title")}
                      className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#221A2F] text-sm text-gray-300"
                    >
                      Title (A–Z)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SONGS LIST */}
        <div className="bg-[#16121d] rounded-xl border border-gray-800 overflow-hidden">
          <div className="grid grid-cols-5 text-gray-400 uppercase text-sm px-6 py-3 border-b border-gray-800">
            <span>#</span>
            <span>Cover</span>
            <span>Title</span>
            <span>Preview</span>
            <span className="text-right">Duration</span>
          </div>

          {songs.length > 0 &&
            songs.map((song, index) => (
              <div
                key={index}
                className="grid grid-cols-5 items-center px-6 py-3 hover:bg-[#1e1b29] transition"
              >
                <span className="text-gray-400">{index + 1}</span>

                {/* Album Art – only show if we actually have a cover */}
                {song.track_cover ? (
                  <img
                    src={song.track_cover}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-[#201931]" />
                )}

                <div>
                  <span className="font-medium">{song.track_title}</span>
                  <p className="text-gray-400 text-sm">{song.track_artist}</p>
                </div>

                {/* Preview Audio */}
                {song.track_preview ? (
                  <audio
                    id={`playlist-audio-${index}`}
                    controls
                    className="w-28 h-8"
                    onEnded={() => handleTrackEnded(index)}
                  >
                    <source src={song.track_preview} type="audio/mpeg" />
                  </audio>
                ) : (
                  <span className="text-gray-500 text-sm">No Preview</span>
                )}

                <span className="text-right text-gray-500">
                  {song.track_duration
                    ? Math.floor(song.track_duration / 60000) +
                      ":" +
                      String(
                        Math.floor((song.track_duration % 60000) / 1000)
                      ).padStart(2, "0")
                    : "--:--"}
                </span>
              </div>
            ))}

          {songs.length === 0 && (
            <div className="px-6 py-4 text-gray-400">
              No songs in this playlist yet.
            </div>
          )}
        </div>
      </main>

      {/* ---------------- ADD SONGS MODAL ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#16121d] w-full max-w-lg rounded-2xl p-6 border border-gray-800 relative">
            {/* Close Modal */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Add Songs</h2>

            {/* Search Bar */}
            <input
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search songs..."
              className="w-full bg-[#0e0e12] border border-gray-700 rounded-lg px-4 py-3 text-white mb-4"
            />

            {/* Search Results */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {searchLoading && <p className="text-gray-400">Searching…</p>}

              {!searchLoading && searchQuery && searchResults.length === 0 && (
                <p className="text-gray-500">No results found.</p>
              )}

              {searchResults.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between bg-[#1c1526] border border-gray-700 
                             px-4 py-3 rounded-lg hover:bg-[#241b35] transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={track.cover}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-gray-400 text-sm">{track.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* ▶ Play Preview button + hidden audio, with proper icons */}
                    {track.preview && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const audio = document.getElementById(
                              `preview-${track.id}`
                            );
                            const isPlaying = !audio.paused;

                            if (!isPlaying) {
                              audio.play();
                            } else {
                              audio.pause();
                            }

                            setSearchResults((prev) =>
                              prev.map((t) =>
                                t.id === track.id
                                  ? { ...t, isPlaying: !isPlaying }
                                  : t
                              )
                            );

                            audio.onended = () => {
                              setSearchResults((prev) =>
                                prev.map((t) =>
                                  t.id === track.id
                                    ? { ...t, isPlaying: false }
                                    : t
                                )
                              );
                            };
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-full 
                                     bg-[#2d2340] text-purple-300 hover:bg-[#3b2d51] transition"
                        >
                          {track.isPlaying ? (
                            <Pause size={16} />
                          ) : (
                            <Play size={16} />
                          )}
                        </button>

                        <audio id={`preview-${track.id}`}>
                          <source src={track.preview} type="audio/mpeg" />
                        </audio>
                      </>
                    )}

                    {/* Add */}
                    <button
                      onClick={() => addSongToPlaylist(track)}
                      className="text-sm bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
