import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center p-6">
      <div className="bg-[#16121d] p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create an Account
        </h1>

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
          className="w-full mb-6 p-3 rounded-lg bg-[#0f0c17] text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
        />

        {/* Register Button */}
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg text-white font-semibold hover:opacity-90 transition">
          Sign Up
        </button>

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
