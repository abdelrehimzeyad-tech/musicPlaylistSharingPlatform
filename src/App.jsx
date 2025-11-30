import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PlaylistDetails from "./pages/PlaylistDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";

export default function App() {
  return (
    <div className="flex">
      {/* Sidebar always visible on desktop */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/playlist/:id" element={<PlaylistDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </div>
  );
}
