import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.REACT_APP_SUPA_URL,
  process.env.REACT_APP_SUPA
)
