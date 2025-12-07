import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlaylistWithItems } from "../api/playlists";
import { supabase } from "../lib/supabaseClient";
import { Plus, ArrowUpDown, X, Play, Pause } from "lucide-react";

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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [savingTitle, setSavingTitle] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setLoading(true);

        const { playlist, items } = await fetchPlaylistWithItems(id);

        const { data: ownerProfile } = await supabase
          .from("profiles")
          .select("display_name, username")
          .eq("id", playlist.owner_id)
          .single();

        const creatorName =
          ownerProfile?.display_name || ownerProfile?.username || null;

        setPlaylist({ ...playlist, creator_name: creatorName });
        setSongs(items);
      } catch (err) {
        console.error(err);
        setError("Could not load this playlist.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) return setSearchResults([]);

    setSearchLoading(true);
    const results = await searchTracks(value);
    setSearchResults(results);
    setSearchLoading(false);
  };

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

    if (error) return alert("Could not save song: " + error.message);

    setSongs((prev) => [...prev, data]);
  }

  const playTrackAt = (index) => {
    const audio = document.getElementById(`playlist-audio-${index}`);
    if (!audio || !songs[index]?.track_preview) return;

    audio.currentTime = 0;
    audio.play();
    setCurrentPlayingIndex(index);
  };

  const handlePlayAll = () => {
    if (!songs.length) return;

    const firstIndex = songs.findIndex((s) => s.track_preview);
    if (firstIndex !== -1) playTrackAt(firstIndex);
  };

  const handleTrackEnded = (index) => {
    const next = songs.findIndex(
      (s, i) => i > index && s.track_preview
    );
    next !== -1
      ? playTrackAt(next)
      : setCurrentPlayingIndex(null);
  };

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

      if (error) alert("Rename failed.");

      setPlaylist((prev) => ({ ...prev, ...data }));
      setIsRenaming(false);
    } finally {
      setSavingTitle(false);
    }
  };

  const applySort = (type) => {
    let sorted = [...songs];

    if (type === "recent")
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (type === "title")
      sorted.sort((a, b) => a.track_title.localeCompare(b.track_title));

    setSongs(sorted);
    setShowSortMenu(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex bg-white dark:bg-[#0b0b0f] text-black dark:text-white">
        <main className="flex-1 p-8 ml-20 md:ml-56">Loading…</main>
      </div>
    );

  if (error || !playlist)
    return (
      <div className="min-h-screen flex bg-white dark:bg-[#0b0b0f] text-black dark:text-white">
        <main className="flex-1 p-8 ml-20 md:ml-56">
          <p className="text-red-500">{error ?? "Playlist not found."}</p>
        </main>
      </div>
    );

  return (
    <div
      className="
        min-h-screen flex 
        bg-white dark:bg-[#0b0b0f] 
        text-black dark:text-white
        relative transition
      "
    >
      {/* 🔥 Background Glow */}
      <div
        className="
          absolute inset-0 -z-10
          opacity-[0.12] dark:opacity-[0.07]
          bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300
          blur-[160px]
        "
      />

      <main className="flex-1 p-8 ml-20 md:ml-56 transition">

        <div className="flex flex-col md:flex-row gap-8 items-center mb-14">

          {/* Cover */}
          <div
            className="
              w-48 h-48 rounded-xl 
              bg-gray-200 dark:bg-[#16121d]
              shadow-xl dark:shadow-[0_0_25px_rgba(150,0,255,0.25)]
              flex items-center justify-center
            "
          >
            <span className="text-5xl text-purple-500">▶</span>
          </div>

          {/* Details */}
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-center gap-3 mb-2">
              {isRenaming ? (
                <>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="
                      bg-gray-100 dark:bg-[#16121d]
                      border border-purple-500 
                      px-3 py-2 rounded-lg text-2xl font-semibold
                      focus:outline-none
                    "
                  />
                  <button
                    onClick={saveRename}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsRenaming(false)}
                    className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-extrabold">{playlist.title}</h2>
                  <button
                    onClick={startRename}
                    className="
                      px-4 py-1 text-xs rounded-full 
                      border border-purple-400 
                      text-purple-500 dark:text-purple-300
                      hover:bg-purple-500/10
                    "
                  >
                    Rename
                  </button>
                </>
              )}
            </div>

            {/* Creator */}
            {playlist.creator_name && (
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                by {playlist.creator_name}
              </p>
            )}

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-4">
              {playlist.description}
            </p>

            {/* Buttons */}
            <button
              onClick={handlePlayAll}
              className="
                bg-gradient-to-r from-purple-500 to-pink-500
                text-white font-semibold px-6 py-3 rounded-full
                shadow-md hover:opacity-90 transition
              "
            >
              ▶ Play All
            </button>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="
                  flex items-center gap-2 
                  bg-gray-200 dark:bg-[#1c1526]
                  border border-gray-400 dark:border-gray-700
                  px-4 py-2 rounded-full text-sm
                  hover:bg-gray-300 dark:hover:bg-[#2a1f3d]
                "
              >
                <Plus size={16} />
                Add Songs
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="
                    flex items-center gap-2 
                    bg-gray-200 dark:bg-[#1c1526]
                    border border-gray-400 dark:border-gray-700
                    px-4 py-2 rounded-full text-sm
                    hover:bg-gray-300 dark:hover:bg-[#2a1f3d]
                  "
                >
                  <ArrowUpDown size={16} />
                  Sort
                </button>

                {showSortMenu && (
                  <div
                    className="
                      absolute mt-2 right-0 w-40
                      bg-gray-100 dark:bg-[#16121d]
                      border border-gray-400 dark:border-gray-700
                      rounded-xl shadow-xl p-2 z-20
                    "
                  >
                    <button
                      onClick={() => applySort("recent")}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-[#241b35]"
                    >
                      Recently Added
                    </button>
                    <button
                      onClick={() => applySort("title")}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-200 dark:hover:bg-[#241b35]"
                    >
                      Title (A–Z)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            rounded-xl overflow-hidden 
            bg-gray-100 dark:bg-[#16121d]
            border border-gray-300 dark:border-gray-800
            shadow-lg
          "
        >
          {/* Header */}
          <div className="grid grid-cols-5 text-gray-600 dark:text-gray-400 text-xs uppercase px-6 py-3 border-b border-gray-300 dark:border-gray-800">
            <span>#</span>
            <span>Cover</span>
            <span>Title</span>
            <span>Preview</span>
            <span className="text-right">Duration</span>
          </div>

          {songs.map((song, index) => (
            <div
              key={index}
              className="
                grid grid-cols-5 items-center 
                px-6 py-4 hover:bg-gray-200 dark:hover:bg-[#1f1a2d]
                transition
              "
            >
              <span className="text-gray-500">{index + 1}</span>

              {song.track_cover ? (
                <img
                  src={song.track_cover}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 dark:bg-[#221933] rounded" />
              )}

              <div className="truncate">
                <p className="font-semibold">{song.track_title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {song.track_artist}
                </p>
              </div>

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

              <span className="text-right text-gray-500 dark:text-gray-400">
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

          {!songs.length && (
            <div className="px-6 py-4 text-gray-500 dark:text-gray-400">
              No songs yet.
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="
              w-full max-w-lg bg-gray-100 dark:bg-[#16121d]
              border border-gray-300 dark:border-gray-700
              rounded-2xl p-6 shadow-xl
              relative
            "
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:opacity-80"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Add Songs</h2>

            <input
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search songs..."
              className="
                w-full px-4 py-3 rounded-lg
                bg-white dark:bg-[#0e0e12]
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none 
                focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                mb-4
              "
            />

            <div className="max-h-80 overflow-y-auto space-y-2">
              {searchLoading && (
                <p className="text-gray-500 dark:text-gray-400">Searching…</p>
              )}

              {!searchLoading && searchQuery && searchResults.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                  No results found.
                </p>
              )}

              {searchResults.map((track) => (
                <div
                  key={track.id}
                  className="
                    flex items-center justify-between
                    px-4 py-3 rounded-lg
                    bg-gray-200 dark:bg-[#1c1526]
                    border border-gray-300 dark:border-gray-700
                    hover:bg-gray-300 dark:hover:bg-[#241b35]
                    transition
                  "
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={track.cover}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-semibold">{track.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Preview Button */}
                    {track.preview && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const audio = document.getElementById(
                              `preview-${track.id}`
                            );
                            const isPlaying = !audio.paused;

                            !isPlaying ? audio.play() : audio.pause();

                            setSearchResults((prev) =>
                              prev.map((t) =>
                                t.id === track.id
                                  ? { ...t, isPlaying: !isPlaying }
                                  : t
                              )
                            );

                            audio.onended = () =>
                              setSearchResults((prev) =>
                                prev.map((t) =>
                                  t.id === track.id
                                    ? { ...t, isPlaying: false }
                                    : t
                                )
                              );
                          }}
                          className="
                            w-9 h-9 rounded-full flex items-center justify-center
                            bg-purple-500/20 text-purple-600 dark:text-purple-300
                            hover:bg-purple-500/30 transition
                          "
                        >
                          {track.isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>

                        <audio id={`preview-${track.id}`}>
                          <source src={track.preview} type="audio/mpeg" />
                        </audio>
                      </>
                    )}

                    <button
                      onClick={() => addSongToPlaylist(track)}
                      className="
                        px-3 py-1 rounded-lg text-white text-sm
                        bg-purple-600 hover:bg-purple-500
                        transition
                      "
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
