import { supabase } from "./supabase"

export async function getArtistsUtils() {
  const { data: artists } = await supabase
    .from("artist")
    .select()
    .order("last_name")
  return artists
}

export async function getArtistUtils(artistId) {
  const { data: artist } = await supabase
    .from("artist")
    .select()
    .eq("url_name", `${artistId}`)
  return artist[0]
}
