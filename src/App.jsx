import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PlaylistDetails from "./pages/PlaylistDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import PlayerBar from "./components/PlayerBar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const location = useLocation();

  // THEME
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 👇 sidebar width state
  const [sidebarWidth, setSidebarWidth] = useState(56); // default open

  // hide player
  const hidePlayer =
    ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div
      className="
        min-h-screen bg-white dark:bg-[#0b0b0f]
        text-black dark:text-white
        transition-colors duration-300
        flex
      "
    >
      {/* SIDEBAR */}
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        onToggle={(w) => setSidebarWidth(w)} // 👈 update margin
      />

      {/* MAIN AREA */}
      <main
        style={{ marginLeft: `${sidebarWidth}px` }} // 👈 THIS FIXES YOUR ISSUE
        className="flex-1 transition-all duration-300"
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/playlist/:id" element={<PlaylistDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
        </Routes>

        {!hidePlayer && <PlayerBar />}
      </main>
    </div>
  );
}
