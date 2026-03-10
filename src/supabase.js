import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dqxidxihnssjmjipthxs.supabase.co"
const supabaseKey = "sb_publishable_jZDn13tbt10Ibtfs1UmHmA_5CaRYUjx"

export const supabase = createClient(supabaseUrl, supabaseKey)
