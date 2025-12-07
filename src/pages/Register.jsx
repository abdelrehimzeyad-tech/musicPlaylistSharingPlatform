import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: authError } = await signUp(form.email, form.password);

      if (authError) {
        setError(authError.message || "Registration failed.");
        setLoading(false);
        return;
      }

      navigate("/login"); // success
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-6
        bg-white dark:bg-[#0b0b0f]
        text-black dark:text-white
        relative transition-colors duration-300
      "
    >
      {/* 🔥 BACKGROUND GLOW */}
      <div
        className="
          absolute inset-0 -z-10 
          opacity-[0.12] dark:opacity-[0.07]
          bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300
          blur-[160px]
        "
      />

      {/* CARD */}
      <div
        className="
          w-full max-w-md 
          p-8 rounded-2xl 
          bg-gray-100 dark:bg-[#16121d] 
          border border-gray-300 dark:border-gray-700
          shadow-xl backdrop-blur-md
        "
      >
        <h1 className="text-4xl font-extrabold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="
              w-full px-4 py-3 rounded-lg 
              bg-white dark:bg-[#0e0e12] 
              border border-gray-300 dark:border-gray-700
              placeholder-gray-500 dark:placeholder-gray-400
              focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
              outline-none transition
            "
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="
              w-full px-4 py-3 rounded-lg 
              bg-white dark:bg-[#0e0e12] 
              border border-gray-300 dark:border-gray-700
              placeholder-gray-500 dark:placeholder-gray-400
              focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
              outline-none transition
            "
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              w-full px-4 py-3 rounded-lg 
              bg-white dark:bg-[#0e0e12] 
              border border-gray-300 dark:border-gray-700
              placeholder-gray-500 dark:placeholder-gray-400
              focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
              outline-none transition
            "
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            className="
              w-full px-4 py-3 rounded-lg 
              bg-white dark:bg-[#0e0e12] 
              border border-gray-300 dark:border-gray-700
              placeholder-gray-500 dark:placeholder-gray-400
              focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
              outline-none transition
            "
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 mt-2 rounded-lg 
              text-white font-semibold
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:opacity-90 transition disabled:opacity-60
            "
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-500 dark:text-pink-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
