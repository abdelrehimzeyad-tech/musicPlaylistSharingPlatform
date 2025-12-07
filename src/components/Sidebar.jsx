import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  PlusCircle,
  Music2,
  LogOut,
  LogIn,
  Sun,
  Moon
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ theme, setTheme, onToggle }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Sidebar state
  const [isOpen, setIsOpen] = useState(true);

  // Toggle sidebar + report new width to App.jsx
  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      onToggle(newState ? 56 : 20); // Report width to App
      return newState;
    });
  };

  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Explore", path: "/explore", icon: <Search size={20} /> },
    { name: "Create Playlist", path: "/create", icon: <PlusCircle size={20} /> },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const goToProfile = () => navigate(user ? "/profile" : "/login");

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen
        ${isOpen ? "w-56" : "w-20"}
        bg-white dark:bg-[#0c0a11]
        text-black dark:text-gray-300
        border-r border-gray-200 dark:border-gray-800
        hidden md:flex flex-col
        transition-all duration-300
        z-50
      `}
    >

      {/* TOP */}
      <div className="flex items-center justify-between p-5">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        >
          <Music2 className="text-purple-500 dark:text-purple-400" size={28} />
          {isOpen && <h1 className="text-lg font-bold">Playlist Palette</h1>}
        </div>

        <button
          onClick={toggleSidebar}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-2 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
                flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                transition
                ${
                  isActive
                    ? "bg-purple-100 dark:bg-[#1a1624] text-purple-600 dark:text-pink-400"
                    : "hover:bg-gray-200 dark:hover:bg-[#15121c]"
                }
                ${isOpen ? "justify-start" : "justify-center"}
              `
            }
          >
            <span className="text-purple-500 dark:text-purple-400">
              {item.icon}
            </span>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM */}
      <div className="mt-auto p-5 border-t border-gray-200 dark:border-gray-800">

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            flex items-center gap-2 mb-4 p-2 w-full
            rounded-lg transition
            bg-gray-100 dark:bg-[#15121c]
            hover:bg-gray-200 dark:hover:bg-[#1f1a2b]
          "
        >
          {theme === "dark" ? (
            <>
              <Sun size={18} className="text-yellow-400" />
              {isOpen && "Light Mode"}
            </>
          ) : (
            <>
              <Moon size={18} className="text-blue-500" />
              {isOpen && "Dark Mode"}
            </>
          )}
        </button>

        {/* PROFILE ICON */}
        <div
          onClick={goToProfile}
          className="
            w-10 h-10 mx-auto rounded-full overflow-hidden cursor-pointer
            bg-gray-200 dark:bg-[#17141f] flex items-center justify-center
          "
        >
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl">👤</span>
          )}
        </div>

        {/* LOGIN / LOGOUT */}
        <div className="mt-3 text-center">
          {user ? (
            isOpen && (
              <button
                onClick={handleLogout}
                className="text-sm flex items-center gap-2 mx-auto text-red-500 dark:text-red-400 hover:opacity-80"
              >
                <LogOut size={14} /> Logout
              </button>
            )
          ) : (
            isOpen && (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:opacity-80"
                >
                  <LogIn size={14} /> Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="text-sm text-pink-500 dark:text-pink-400 hover:opacity-80"
                >
                  Sign Up
                </button>
              </div>
            )
          )}
        </div>

      </div>
    </aside>
  );
}
