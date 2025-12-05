// src/api/playlists.js
import { supabase } from "../lib/supabaseClient";

// My playlists (for Home page)
export async function fetchMyPlaylists(userId) {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Create a playlist
export async function createPlaylist({ ownerId, title, description, isPublic }) {
  const { data, error } = await supabase
    .from("playlists")
    .insert([
      {
        owner_id: ownerId,
        title,
        description,
        is_public: isPublic ?? true,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Single playlist + songs (for PlaylistDetails)
export async function fetchPlaylistWithItems(playlistId) {
  const { data: playlist, error: pError } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .single();

  if (pError) throw pError;

  const { data: items, error: iError } = await supabase
    .from("playlist_items")
    .select("*")
    .eq("playlist_id", playlistId)
    .order("position", { ascending: true });

  if (iError) throw iError;

  return { playlist, items };
}

// Public playlists (for Explore page)
export async function fetchPublicPlaylists() {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
