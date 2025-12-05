import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Home, Search, PlusCircle, Music2, LogOut, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Explore", path: "/explore", icon: <Search size={20} /> },
    { name: "Create Playlist", path: "/create", icon: <PlusCircle size={20} /> },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");   // go to Landing page
  };

  const goToProfile = () => {
    if (user) navigate("/profile");
    else navigate("/login");
  };

  return (
    <>
      <aside
        className={`
          ${isOpen ? "w-56" : "w-20"}
          bg-[#0c0a11] text-gray-300 h-screen 
          border-r border-gray-800 hidden md:flex flex-col
          transition-all duration-300
        `}
      >
        {/* TOP */}
        <div className="flex items-center justify-between p-5">

          {/* 🔥 UPDATED PART — clickable brand/logo */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/")}
          >
            <Music2 className="text-purple-400" size={28} />
            {isOpen && <h1 className="text-lg font-bold">Playlist Palette</h1>}
          </div>
          {/* END UPDATED PART */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4 px-4 py-3 rounded-lg
                transition cursor-pointer
                ${isActive ? "bg-[#1a1624] text-pink-400" : "hover:bg-[#15121c]"}
                ${isOpen ? "justify-start" : "justify-center"}
              `
              }
            >
              <span className="text-purple-400">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* BOTTOM USER AREA */}
        <div className="mt-auto p-5 border-t border-gray-800">
          {/* Avatar */}
          <div
            onClick={goToProfile}
            className="w-10 h-10 rounded-full overflow-hidden bg-[#17141f] flex items-center justify-center cursor-pointer"
          >
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl">👤</span>
            )}
          </div>

          {/* Logout / Login */}
          <div className="mt-3">
            {user ? (
              isOpen && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
                >
                  <LogOut size={14} /> Logout
                </button>
              )
            ) : (
              isOpen && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-purple-400 flex gap-2 text-sm hover:text-purple-300"
                  >
                    <LogIn size={14} /> Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="text-pink-400 text-sm hover:text-pink-300"
                  >
                    Sign Up
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
