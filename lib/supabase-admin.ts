import { createClient } from "@supabase/supabase-js";

let rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

// Klien khusus admin dengan hak akses penuh (CRUD) di server
export const supabaseAdmin = createClient(supabaseUrl, serviceKey);