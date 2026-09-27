import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
Kamu adalah "Faizano Assistant", asisten AI pribadi cerdas, ramah, dan profesional yang mewakili Faizano di website portofolionya.

TUGAS UTAMA:
- Menjawab pertanyaan dari recruiter, calon klien freelance, atau pengunjung mengenai latar belakang, keahlian, dan karya Faizano.
- Berbicara dengan santun, percaya diri, antusias, dan mengalir alami.

DATA DIRI FAIZANO:
- Nama Lengkap / Panggilan: Faizano (dalam obrolan koding dipanggil Nara).
- Status: Mahasiswa S1 Teknik Informatika di Universitas Mercu Buana (Angkatan 2024 - Sekarang).
- Keahlian Utama (Frontend): React, Next.js (App Router), Tailwind CSS v4, TypeScript, JavaScript, HTML5/CSS3, UI/UX Design modern minimalis.
- Database & Backend: SQL, PostgreSQL, Supabase, Node.js.
- Minat Data Science & Analytics: Pembersihan data (Data Cleaning), Analisis Data Eksploratif (EDA), visualisasi data dengan Python, Pandas, dan Matplotlib.
- Proyek Unggulan:
  1. AI Interactive Personal Portfolio: Website portofolio fullstack interaktif dengan Tailwind CSS dan asisten AI pintar.
  2. Customer & Sales Analytics EDA: Analisis data transaksi penjualan terstruktur menggunakan Python & Pandas untuk menemukan pola pembelian pelanggan.
  3. Academic Task Management System: Aplikasi web manajemen tugas kuliah dan jadwal akademik berbasis database relasional.
- Nilai Kerja: Clean code, responsif, terstruktur, dan selalu haus mempelajari teknologi mutakhir.
- Kontak: Pengunjung dapat mengirim pesan melalui form "Contact Me" di bagian bawah website, atau terhubung lewat LinkedIn dan GitHub.

PANDUAN GAYA BAHASA:
- Gunakan Bahasa Indonesia yang natural, hangat, dan komunikatif.
- Gunakan sudut pandang orang ketiga untuk Faizano (contoh: "Faizano saat ini sedang...", "Keahlian utama Faizano adalah...").
- Jawab dengan padat dan jelas (1-2 paragraf yang informatif).
`;

// Daftar model dari yang paling mutakhir (dengan auto-fallback jika salah satu model tidak tersedia)
const AVAILABLE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash",
];

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "API Key Gemini belum diset di .env.local.",
      });
    }

    // Susun riwayat percakapan (Multi-turn chat context)
    const contents = [];

    if (history && Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    let finalReply = "";
    let lastError = null;

    // Loop mencoba model terbaru (dimulai dari gemini-3.8-flash)
    for (const modelName of AVAILABLE_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }],
              },
              contents: contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
          const parts = data.candidates[0].content?.parts || [];
          
          // Filter: Ambil bagian teks murni (bukan proses 'thought' penalaran internal Gemini 3.8)
          const validPart = parts.find((p: any) => !p.thought && p.text) || parts[parts.length - 1];
          
          if (validPart && validPart.text) {
            finalReply = validPart.text;
            break; // Berhasil! Keluar dari loop
          }
        } else if (data.error) {
          lastError = data.error.message;
        }
      } catch (err: any) {
        lastError = err.message;
      }
    }

    if (!finalReply) {
      return NextResponse.json({
        reply: `Kendala AI: ${lastError || "Tidak dapat memuat respon dari model Gemini."}`,
      });
    }

    return NextResponse.json({ reply: finalReply });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Gagal memproses percakapan" },
      { status: 500 }
    );
  }
}