import { supabase } from "./supabase"

export async function getVenuesUtils() {
  const { data: venues } = await supabase.from("venue").select().order("name")
  return venues
}

export async function getVenueUtils(venueId) {
  console.log("venueId" + venueId)
  const { data: venue } = await supabase
    .from("venue")
    .select()
    .eq("url_name", `${venueId}`)
  return venue[0]
}
