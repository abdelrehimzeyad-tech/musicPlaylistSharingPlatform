import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await signIn(email, password);

      if (authError) {
        setError(authError.message || "Login failed.");
        setLoading(false);
        return;
      }

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-white dark:bg-[#0b0b0f] 
        text-black dark:text-white 
        transition-colors duration-300
        relative
      "
    >
      {/* 🔥 BACKGROUND GLOW */}
      <div
        className="
          absolute inset-0 -z-10
          opacity-[0.14] dark:opacity-[0.07]
          bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300
          blur-[160px]
        "
      />

      {/* MAIN CARD */}
      <div
        className="
          w-full max-w-5xl rounded-2xl overflow-hidden
          bg-gray-100/70 dark:bg-[#16121d]/80 
          backdrop-blur-xl
          shadow-2xl dark:shadow-[0_0_35px_rgba(150,0,255,0.25)]
          border border-gray-300 dark:border-gray-700
          flex flex-col md:flex-row
          transition
        "
      >
        {/* LEFT — LOGIN FORM */}
        <div className="flex-1 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700">
          <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Log in to continue</p>

          <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-3 rounded-lg
                bg-white dark:bg-[#0b0b0f]
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 
                focus:ring-purple-500 dark:focus:ring-purple-400
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3 rounded-lg
                bg-white dark:bg-[#0b0b0f]
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 
                focus:ring-purple-500 dark:focus:ring-purple-400
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-lg font-semibold
                bg-gradient-to-r from-purple-500 to-pink-500 
                text-white shadow-md hover:opacity-90
                disabled:opacity-50 transition
              "
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT — REGISTER PROMO */}
        <div
          className="
            flex-1 p-10 flex flex-col items-center justify-center
            bg-gray-200/60 dark:bg-[#1a1523]/70
            backdrop-blur-xl
            transition
          "
        >
          <h2 className="text-3xl font-extrabold mb-3">New here?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Create an account</p>

          <Link to="/register" className="w-full max-w-sm">
            <button
              className="
                w-full py-3 rounded-lg font-semibold
                bg-gradient-to-r from-pink-500 to-purple-500
                text-white hover:opacity-90 transition
              "
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
