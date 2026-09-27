"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Berhasil login, arahkan ke dashboard admin
        router.push("/admin/dashboard");
      } else {
        setErrorMsg(data.error || "Password salah!");
      }
    } catch {
      setErrorMsg("Koneksi gagal. Coba ulangi lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-neutral-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
        
        {/* Header Icon */}
        <div className="space-y-2 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-900">
            Admin Portal
          </h1>
          <p className="text-xs text-neutral-400">
            Masukkan password untuk mengelola proyek dan kotak masuk.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-bold text-neutral-500">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-3.5 bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-neutral-800 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <a href="/" className="text-xs text-neutral-400 hover:text-black transition">
            ← Kembali ke Website Utama
          </a>
        </div>

      </div>
    </div>
  );
}