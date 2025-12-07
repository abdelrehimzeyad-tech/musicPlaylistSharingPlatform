import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { uploadAvatar, updateUserProfile } from "../api/profile";
import { compressImage } from "../utils/compressImage";

export default function Profile() {
  const { user, signOut, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setBio(user.user_metadata?.bio || "");
      setAvatarPreview(user.user_metadata?.avatar_url || null);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    let avatarUrl = avatarPreview;

    if (avatarFile) {
      const smallImg = await compressImage(avatarFile, 380);
      avatarUrl = await uploadAvatar(smallImg, user.id);
    }

    await updateUserProfile({
      full_name: fullName,
      bio: bio,
      avatar_url: avatarUrl,
    });

    await refreshUser();
    setSaving(false);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-black dark:text-white bg-white dark:bg-[#0b0b0f]">
        Please log in.
      </div>
    );

  return (
    <div
      className="
        min-h-screen flex 
        bg-white dark:bg-[#0b0b0f] 
        text-black dark:text-white 
        relative transition
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 ml-20 md:ml-56 transition">

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center mb-14">

          {/* Avatar */}
          <div
            className="
              w-32 h-32 rounded-full overflow-hidden
              border-4 border-purple-500/70 dark:border-purple-400
              shadow-xl dark:shadow-[0_0_25px_rgba(150,0,255,0.25)]
            "
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-purple-500 text-5xl">
                👤
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center mt-6">
            <h2 className="text-4xl font-extrabold capitalize">
              {user.user_metadata?.full_name || user.email.split("@")[0]}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-1">
              @{user.email.split("@")[0]}
            </p>

            {bio && (
              <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                {bio}
              </p>
            )}

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="
                mt-6 px-6 py-2 
                bg-gradient-to-r from-purple-500 to-pink-500 
                rounded-lg font-semibold text-white
                hover:opacity-90 transition
              "
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Placeholder for future playlists */}
        <div className="text-center text-gray-600 dark:text-gray-400 mt-20">
          Your playlists UI will appear here soon...
        </div>

        {/* Logout */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={handleLogout}
            className="
              px-8 py-3 rounded-lg 
              bg-red-500 text-white font-semibold
              hover:bg-red-400 transition
            "
          >
            Logout
          </button>
        </div>
      </main>

      {/* 🔥 EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="
              w-full max-w-md 
              bg-gray-100 dark:bg-[#16121d]
              p-6 rounded-2xl 
              border border-gray-300 dark:border-gray-700
              shadow-xl
            "
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Edit Profile
            </h2>

            {/* Avatar uploader */}
            <label
              className="
                w-28 h-28 rounded-full overflow-hidden 
                border-2 border-purple-500 
                mx-auto block cursor-pointer shadow-lg
              "
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />

              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-purple-400 text-4xl">
                  👤
                </div>
              )}
            </label>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="
                mt-5 w-full px-4 py-3 rounded-lg
                bg-white dark:bg-[#0e0e12]
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-500
                focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                outline-none
              "
            />

            {/* Bio */}
            <textarea
              rows="3"
              placeholder="Bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="
                mt-4 w-full px-4 py-3 rounded-lg resize-none
                bg-white dark:bg-[#0e0e12]
                border border-gray-300 dark:border-gray-700
                text-black dark:text-white
                placeholder-gray-500 dark:placeholder-gray-500
                focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400
                outline-none
              "
            />

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="
                  flex-1 py-2 rounded-lg
                  bg-gray-300 dark:bg-gray-700
                  hover:bg-gray-200 dark:hover:bg-gray-600
                "
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="
                  flex-1 py-2 rounded-lg font-semibold text-white
                  bg-gradient-to-r from-purple-500 to-pink-500
                  hover:opacity-90 transition
                  disabled:opacity-50
                "
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
