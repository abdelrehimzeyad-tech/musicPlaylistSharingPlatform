import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Home, Search, User, PlusCircle, Music2 } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Explore", path: "/explore", icon: <Search size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Create Playlist", path: "/create", icon: <PlusCircle size={20} /> },
  ];

  return (
    <>
      {/* ===== DESKTOP SIDEBAR (NOT FIXED) ===== */}
      <aside
        className={`
          ${isOpen ? "w-56" : "w-20"}
          bg-[#0c0a11] text-gray-300 h-screen 
          border-r border-gray-800 hidden md:flex flex-col
          transition-all duration-300
        `}
      >
        {/* Top */}
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Music2 className="text-purple-400" size={28} />
            {isOpen && (
              <h1 className="text-lg font-bold whitespace-nowrap">
                Playlist Palette
              </h1>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Nav items */}
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
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

    {/* Bottom User */}
<div className="mt-auto p-5 border-t border-gray-800 flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-[#17141f] flex items-center justify-center">
    <span className="text-purple-400 text-xl">👤</span>
  </div>

  {isOpen && (
    <div>
      <p className="font-semibold text-sm text-white">
        {JSON.parse(localStorage.getItem("user"))?.name || "Guest"}
      </p>
      <p className="text-gray-400 text-xs">
        {JSON.parse(localStorage.getItem("user"))?.email || "guest@example.com"}
      </p>
    </div>
  )}
</div>   
</aside> 

      {/* ===== MOBILE MENU BUTTON ===== */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-5 left-5 z-50 bg-[#0c0a11] p-2 rounded-lg border border-gray-700"
      >
        <Menu size={24} className="text-gray-300" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 w-64 h-full bg-[#0c0a11] border-r border-gray-800 
          p-6 z-50 flex flex-col transform transition-transform duration-300 md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Music2 className="text-purple-400" size={28} />
            <h1 className="text-lg font-bold text-white">Playlist Palette</h1>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg
                ${isActive ? "text-pink-400" : "text-gray-300 hover:text-purple-400"}`
              }
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="mt-auto pt-8 border-t border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#17141f] rounded-full flex items-center justify-center">
            <span className="text-purple-400 text-xl">👤</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Abdulmajeed</p>
            <p className="text-gray-400 text-xs">@abdulmajeed</p>
          </div>
        </div>
      </div>
    </>
  );
}
