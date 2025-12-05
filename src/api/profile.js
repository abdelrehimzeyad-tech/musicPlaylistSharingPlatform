import { supabase } from "../lib/supabaseClient";

// Upload avatar to Supabase Storage
export async function uploadAvatar(file, userId) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  // Get public URL
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Update metadata
export async function updateUserProfile(updates) {
  const { data, error } = await supabase.auth.updateUser({
    data: updates,
  });

  if (error) throw error;

  return data.user;
}
