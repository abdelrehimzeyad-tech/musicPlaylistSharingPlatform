import React from "react";
import { useNavigate } from "react-router-dom";
import { Music2 } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative 
        min-h-screen 
        w-full 
        flex flex-col items-center 
        bg-white dark:bg-[#0b0b0f]
        text-black dark:text-white
        transition-colors duration-300
        overflow-hidden
      "
    >

      {/* 🔥 BACKGROUND GRADIENTS */}
      <div
        className="
          absolute inset-0 
          blur-3xl opacity-60 dark:opacity-40
          bg-hero-light dark:bg-hero-dark
          pointer-events-none
        "
      />

      <div
        className="
          absolute top-0 left-0 w-full h-[350px]
          bg-gradient-to-b 
          from-purple-500/30 via-pink-500/10 to-transparent
          dark:from-purple-700/20 dark:via-pink-600/10 dark:to-transparent
          blur-2xl
        "
      />

     {/* NAVBAR */}
<div
  className="
    w-full 
    flex justify-between items-center
    px-12 py-6 
    relative z-10

    bg-white/70 dark:bg-[#0b0b0f]/50
    backdrop-blur-md border-b 
    border-gray-200 dark:border-gray-800

    pl-20 md:pl-56   /* 🔥 AUTO ADJUST WITH SIDEBAR WIDTH */
  "
>
  <div className="flex items-center gap-3">
    <Music2 size={28} className="text-purple-600 dark:text-purple-400" />
    <h1 className="text-2xl font-bold">Playlist Palette</h1>
  </div>

  <div className="flex items-center gap-6">
    <button
      onClick={() => navigate("/explore")}
      className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
    >
      Browse
    </button>

    <button
      onClick={() => navigate("/create")}
      className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
    >
      Create
    </button>

    <button
      onClick={() => navigate("/login")}
      className="
        px-6 py-2 rounded-full text-white
        bg-gradient-to-r from-purple-500 to-pink-500
        shadow-md hover:opacity-90 transition
      "
    >
      Sign In
    </button>
  </div>
</div>

{/* HERO SECTION */}
<div
  className="
    relative z-10 flex flex-col items-center 
    mt-40 px-6 text-center
    w-full max-w-[1000px]
  "
>

        {/* GLOW BEHIND TITLE */}
        <div
          className="
            absolute w-[500px] h-[200px]
            bg-pink-500/20 dark:bg-purple-600/20
            blur-3xl rounded-full -z-10
          "
        />

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
          Discover & Share{" "}
          <span
            className="
              bg-gradient-to-r from-purple-500 to-pink-500
              bg-clip-text text-transparent
            "
          >
            Amazing Playlists
          </span>
        </h1>

        <p
          className="
            mt-6 text-gray-700 dark:text-gray-300 
            text-lg max-w-2xl leading-relaxed
          "
        >
          Connect with music lovers worldwide. Create, share, and explore curated playlists
          for every mood and moment.
        </p>

        <div className="flex gap-5 justify-center mt-10">
          <button
            onClick={() => navigate("/explore")}
            className="
              px-7 py-3 rounded-full text-lg 
              bg-gradient-to-r from-purple-500 to-pink-500 
              text-white shadow-lg hover:opacity-90 transition
            "
          >
            Start Exploring
          </button>

          <button
            onClick={() => navigate("/create")}
            className="
              px-7 py-3 rounded-full text-lg
              border border-gray-700 dark:border-gray-300
              text-black dark:text-white
              hover:bg-black hover:text-white
              dark:hover:bg-white dark:hover:text-black
              transition
            "
          >
            Create Playlist
          </button>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          relative z-10 w-full mt-auto py-14 
          bg-white dark:bg-[#0c0a11]
          shadow-inner border-t 
          border-gray-200 dark:border-gray-800
        "
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 text-center gap-10">
          <div>
            <h2
              className="
                text-3xl font-bold
                bg-gradient-to-r from-purple-500 to-pink-500
                bg-clip-text text-transparent
              "
            >
              50K+
            </h2>
            <p className="text-gray-700 dark:text-gray-300">Active Curators</p>
          </div>

          <div>
            <h2
              className="
                text-3xl font-bold
                bg-gradient-to-r from-purple-500 to-pink-500
                bg-clip-text text-transparent
              "
            >
              100K+
            </h2>
            <p className="text-gray-700 dark:text-gray-300">Playlists Shared</p>
          </div>

          <div>
            <h2
              className="
                text-3xl font-bold
                bg-gradient-to-r from-purple-500 to-pink-500
                bg-clip-text text-transparent
              "
            >
              2M+
            </h2>
            <p className="text-gray-700 dark:text-gray-300">Songs Discovered</p>
          </div>
        </div>
      </div>

    </div>
  );
}
