import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { uploadAvatar, updateUserProfile } from "../api/profile";
import { compressImage } from "../utils/compressImage";

export default function Profile() {
  const { user, signOut, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Modal state
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
    setAvatarPreview(URL.createObjectURL(file)); // show preview in modal
  };

  const handleSave = async () => {
    setSaving(true);

    let avatarUrl = avatarPreview;

    if (avatarFile) {
      // compress + upload
      const smallImage = await compressImage(avatarFile, 380);
      avatarUrl = await uploadAvatar(smallImage, user.id);
    }

    await updateUserProfile({
      full_name: fullName,
      bio: bio,
      avatar_url: avatarUrl,
    });

    await refreshUser(); // instantly update sidebar + page
    setSaving(false);
    setIsEditing(false); // CLOSE MODAL AFTER SAVE
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");   // go to Landing page
  };
  

  if (!user)
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center">
        Please log in.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex">

      <main className="flex-1 p-8 ml-20 md:ml-56">

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center mb-10">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 bg-[#0f0c17]">
            {avatarPreview ? (
              <img src={avatarPreview} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-purple-400 text-5xl">
                👤
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold">
              {user.user_metadata?.full_name || user.email.split("@")[0]}
            </h2>

            <p className="text-gray-400">@{user.email.split("@")[0]}</p>
            {user.user_metadata?.bio && (
              <p className="mt-2 text-gray-400 max-w-md">{user.user_metadata.bio}</p>
            )}

            {/* EDIT PROFILE BUTTON */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-5 px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Placeholder for playlists */}
        <div className="text-center text-gray-500 mt-20">
          Your playlists UI goes here...
        </div>

        {/* LOGOUT AT BOTTOM */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
          >
            Logout
          </button>
        </div>
      </main>

      {/* MODAL FOR EDIT PROFILE */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#16121d] w-full max-w-md rounded-2xl p-6 border border-gray-800">

            <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>

            {/* Avatar Upload */}
            <label className="w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500 mx-auto block cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />

              {avatarPreview ? (
                <img src={avatarPreview} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex justify-center items-center text-purple-400 text-3xl">
                  👤
                </div>
              )}
            </label>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-4 w-full bg-[#0e0e12] border border-gray-700 rounded-lg px-4 py-3 text-white"
            />

            {/* Bio */}
            <textarea
              rows="3"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-4 w-full bg-[#0e0e12] border border-gray-700 rounded-lg px-4 py-3 text-white resize-none"
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="flex-1 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 font-semibold disabled:opacity-50"
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
