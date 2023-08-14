import { supabase } from "./supabase"

export async function getEventsUtils() {
  const { data: events } = await supabase.from("a_to_v_view").select()
  return events
}
