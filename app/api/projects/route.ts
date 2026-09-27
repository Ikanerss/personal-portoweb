import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// WAJIB: Memaksa Next.js selalu mengambil data segar dari database (bukan cache kosong)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (error) {
      console.error("Supabase Error di Server:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error("Server Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}