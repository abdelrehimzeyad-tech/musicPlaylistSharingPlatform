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
      // Supabase sign up
      const { error: authError } = await signUp(form.email, form.password);

      if (authError) {
        setError(authError.message || "Registration failed.");
        setLoading(false);
        return;
      }

      // (Optional) later you can insert `form.name` into a profiles table

      // After successful signup, go to login page
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center p-6">
      <div className="bg-[#16121d] p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-lg bg-[#0f0c17] text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-lg bg-[#0f0c17] text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-lg bg-[#0f0c17] text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
            className="w-full mb-6 p-3 rounded-lg bg-[#0f0c17] text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing you up..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
