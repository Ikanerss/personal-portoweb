import { createClient } from "@supabase/supabase-js";

// Ambil URL dan bersihkan otomatis dari spasi, garis miring, atau /rest/v1 yang tidak sengaja terbawa
let rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);