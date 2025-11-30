import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-7xl flex items-center justify-between px-6 sm:px-10 py-6 text-gray-200">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <span className="text-purple-400">🎵 Playlist</span>
          <span className="text-pink-400">Palette</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-8 text-gray-300">
          <Link to="/explore" className="hover:text-white transition">
            Browse
          </Link>
          <Link to="/home" className="hover:text-white transition">
            Create
          </Link>
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-full text-white font-semibold hover:opacity-90 transition"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 w-full max-w-5xl mt-10">
        <button className="mb-6 text-sm text-purple-300 border border-purple-400 px-4 py-1 rounded-full hover:bg-purple-500 hover:text-white transition">
          🎵 Share Your Sound
        </button>

        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight text-center">
          Discover & Share{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-fuchsia-500">
            Amazing Playlists
          </span>
        </h1>

        <p className="text-gray-300 max-w-2xl text-lg mb-10">
          Connect with music lovers worldwide. Create, share, and explore curated
          playlists for every mood and moment.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/explore"
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-semibold text-lg hover:opacity-90 transition"
          >
            Start Exploring
          </Link>
          <Link
            to="/home"
            className="border border-gray-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
          >
            Create Playlist
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#11111a] w-full py-12 flex flex-wrap justify-center gap-16 text-center border-t border-gray-800 mt-20">
        <div>
          <p className="text-3xl font-bold text-purple-400">50K+</p>
          <p className="text-gray-400">Active Curators</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-pink-400">100K+</p>
          <p className="text-gray-400">Playlists Shared</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-400">2M+</p>
          <p className="text-gray-400">Songs Discovered</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
