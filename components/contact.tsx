"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase"; // <-- Impor konektor Supabase

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Menyimpan data pesan langsung ke tabel 'messages' di Supabase
      const { error } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Hilangkan pesan sukses setelah 5 detik
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error("Gagal mengirim pesan:", err);
      setErrorMessage("Maaf, terjadi kesalahan saat mengirim pesan. Coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-24 border-t border-neutral-100">
      <div className="space-y-16 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Contact Me
          </h2>
        </div>

        {/* Kartu Form Kontak */}
        <div className="bg-white border border-neutral-100 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
              Send an Email directly.
            </h3>
            <p className="text-sm text-neutral-500">
              Ada tawaran proyek, peluang magang, atau sekadar ingin berdiskusi? Kirim pesanmu di sini.
            </p>
          </div>

          {/* Alert Sukses */}
          {isSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>Pesanmu berhasil terkirim ke database! Terima kasih, saya akan segera membacanya.</span>
            </div>
          )}

          {/* Alert Error */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in">
              <AlertCircle size={18} className="text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs uppercase tracking-wider font-bold text-neutral-500">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-wider font-bold text-neutral-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="johndoe@example.com"
                className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs uppercase tracking-wider font-bold text-neutral-500">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tulis pesanmu di sini..."
                className="w-full px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-neutral-900 text-white rounded-xl font-semibold text-sm hover:bg-neutral-800 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>SENDING TO DATABASE...</span>
                </>
              ) : (
                <>
                  <span>SEND MESSAGE</span>
                  <Send size={15} />
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}