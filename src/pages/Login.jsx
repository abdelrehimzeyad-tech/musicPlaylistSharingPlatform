import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // ---- FAKE LOGIN SYSTEM ----
    // In a real app, you'd check Firebase or API.
    const fakeUser = {
      name: "Abdulmajeed",
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));

    navigate("/home"); // redirect user
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center text-white">
      <div className="w-full max-w-5xl bg-[#16121d] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-gray-800">

        {/* Login Section */}
        <div className="flex-1 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-800">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400 mb-8">Log in to continue</p>

          <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
            {error && <p className="text-red-400 text-center">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0b0b0f] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b0b0f] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Side - Register Preview */}
        <div className="flex-1 p-10 flex flex-col items-center justify-center bg-[#1a1523]">
          <h2 className="text-3xl font-bold mb-2">New here?</h2>
          <p className="text-gray-400 mb-8">Create an account</p>

          <Link to="/register" className="w-full max-w-sm">
            <button
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
