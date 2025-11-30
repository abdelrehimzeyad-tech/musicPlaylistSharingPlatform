import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayerBar() {
  const { isPlaying, setIsPlaying, currentTrack } = usePlayer();

  // 🔹 Hide the bar completely when nothing is playing
  if (!isPlaying || !currentTrack) return null;

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#16121d]/90 backdrop-blur-md border-t border-gray-800 text-white flex items-center justify-between px-6 py-3 z-50 transition-all duration-300">
      {/* Song Info */}
      <div className="flex items-center space-x-4">
        <img
          src={currentTrack.image || "https://i.imgur.com/W2i7TzZ.jpg"}
          alt={currentTrack.title || "Song cover"}
          className="w-12 h-12 rounded-md object-cover"
        />
        <div>
          <p className="font-semibold text-sm">{currentTrack.title || "Unknown Track"}</p>
          <p className="text-xs text-gray-400">{currentTrack.artist || "Unknown Artist"}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-6">
          <button className="hover:text-purple-400 transition">
            <SkipBack size={22} />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center hover:opacity-90 transition"
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button className="hover:text-purple-400 transition">
            <SkipForward size={22} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 text-xs text-gray-400 w-64">
          <span>1:05</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
          <span>3:42</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center space-x-2 text-gray-400">
        <Volume2 size={22} />
        <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>
      </div>
    </div>
  );
}
