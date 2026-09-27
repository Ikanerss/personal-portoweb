"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FolderPlus, 
  Mail, 
  Trash2, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Calendar
} from "lucide-react";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  long_description: string;
  tech_stack: string[];
  image: string;
  live_url?: string;
  github_url?: string;
}

interface MessageItem {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State Form Tambah Proyek
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "Web Development",
    description: "",
    long_description: "",
    tech_stack_raw: "", // input string dipisah koma
    image: "/profile.jpeg",
    live_url: "",
    github_url: "",
  });

  // Ambil data proyek dan pesan dari API admin
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [resProj, resMsg] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/messages"),
      ]);

      if (resProj.status === 401 || resMsg.status === 401) {
        router.push("/admin/login");
        return;
      }

      const dataProj = await resProj.json();
      const dataMsg = await resMsg.json();

      if (Array.isArray(dataProj)) setProjects(dataProj);
      if (Array.isArray(dataMsg)) setMessages(dataMsg);
    } catch (err) {
      console.error("Gagal memuat data dashboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Tambah Proyek Baru
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    // Ubah string koma menjadi array teks
    const techArray = newProject.tech_stack_raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProject.title,
          category: newProject.category,
          description: newProject.description,
          long_description: newProject.long_description,
          tech_stack: techArray,
          image: newProject.image || "/profile.jpeg",
          live_url: newProject.live_url || null,
          github_url: newProject.github_url || null,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", text: "Proyek baru berhasil disimpan ke database!" });
        setFormOpen(false);
        setNewProject({
          title: "",
          category: "Web Development",
          description: "",
          long_description: "",
          tech_stack_raw: "",
          image: "/profile.jpeg",
          live_url: "",
          github_url: "",
        });
        fetchData(); // Refresh data
      } else {
        setFeedback({ type: "error", text: data.error || "Gagal menambah proyek" });
      }
    } catch {
      setFeedback({ type: "error", text: "Koneksi terputus saat menyimpan" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Hapus Proyek
  const handleDeleteProject = async (id: number) => {
    if (!confirm("Yakin ingin menghapus proyek ini dari database?")) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Gagal menghapus proyek");
      }
    } catch {
      alert("Terjadi kesalahan jaringan");
    }
  };

  // Handle Hapus Pesan
  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Hapus pesan ini dari inbox?")) return;

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Gagal menghapus pesan");
      }
    } catch {
      alert("Terjadi kesalahan jaringan");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 pb-20">
      
      {/* Top Bar Header */}
      <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold tracking-tight px-2.5 py-1 bg-neutral-900 text-white rounded-lg">
              CMS
            </span>
            <h1 className="text-base font-bold text-neutral-900">
              Faizano Admin Panel
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-neutral-500 hover:text-black flex items-center gap-1.5 transition"
            >
              <span>Lihat Website</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-10 space-y-8">
        
        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in ${
              feedback.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {feedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "projects"
                ? "bg-neutral-900 text-white shadow-xs"
                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
            }`}
          >
            <Layers size={14} />
            <span>Kelola Proyek</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-neutral-200 text-neutral-800 font-extrabold">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "messages"
                ? "bg-neutral-900 text-white shadow-xs"
                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/60"
            }`}
          >
            <Mail size={14} />
            <span>Kotak Masuk (Inbox)</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-neutral-200 text-neutral-800 font-extrabold">
              {messages.length}
            </span>
          </button>
        </div>

        {/* ================= TAB 1: KELOLA PROYEK ================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            
            {/* Header Proyek & Tombol Buka Form */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold">Daftar Proyek Portofolio</h2>
                <p className="text-xs text-neutral-400">Semua perubahan langsung sinkron ke halaman depan.</p>
              </div>

              <button
                onClick={() => setFormOpen(!formOpen)}
                className="px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus size={15} />
                <span>{formOpen ? "Tutup Form" : "Tambah Proyek Baru"}</span>
              </button>
            </div>

            {/* FORM TAMBAH PROYEK (Collapsible) */}
            {formOpen && (
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-in fade-in">
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <FolderPlus size={18} />
                  <span>Formulir Proyek Baru</span>
                </h3>

                <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  
                  {/* Judul */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-neutral-600">Judul Proyek *</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="Contoh: E-Commerce Dashboard Analytics"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Kategori */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-600">Kategori *</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900 cursor-pointer"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-600">Tech Stack (Pisahkan dengan koma) *</label>
                    <input
                      type="text"
                      required
                      value={newProject.tech_stack_raw}
                      onChange={(e) => setNewProject({ ...newProject, tech_stack_raw: e.target.value })}
                      placeholder="Contoh: Next.js, Python, Tailwind, PostgreSQL"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Deskripsi Singkat */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-neutral-600">Deskripsi Singkat (Tampil di kartu) *</label>
                    <input
                      type="text"
                      required
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Ringkasan proyek dalam 1-2 kalimat..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Deskripsi Lengkap */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-neutral-600">Deskripsi Lengkap (Tampil di Modal Popup) *</label>
                    <textarea
                      required
                      rows={4}
                      value={newProject.long_description}
                      onChange={(e) => setNewProject({ ...newProject, long_description: e.target.value })}
                      placeholder="Ceritakan latar belakang, fitur utama, dan proses pembuatannya..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Path Gambar */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-600">Path Gambar / Screenshot</label>
                    <input
                      type="text"
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      placeholder="/profile.jpeg atau /projects/web1.png"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Live URL */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-600">Link Demo / Live (Opsional)</label>
                    <input
                      type="url"
                      value={newProject.live_url}
                      onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* GitHub URL */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="font-bold text-neutral-600">Link Repositori GitHub (Opsional)</label>
                    <input
                      type="url"
                      value={newProject.github_url}
                      onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Tombol Simpan */}
                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      {isSubmitting ? "Menyimpan ke Supabase..." : "Publish Proyek ke Website"}
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* List Tabel Proyek */}
            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs">
              {projects.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-400">Belum ada proyek di database.</div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-5 flex items-center justify-between hover:bg-neutral-50/60 transition gap-4">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-700">
                            {proj.category}
                          </span>
                          <h4 className="text-sm font-bold text-neutral-900">{proj.title}</h4>
                        </div>
                        <p className="text-xs text-neutral-500 line-clamp-1">{proj.description}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2.5 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Hapus Proyek"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 2: INBOX PESAN MASUK ================= */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold">Kotak Masuk Formulir Kontak</h2>
              <p className="text-xs text-neutral-400">Pesan dari pengunjung atau calon klien yang dikirim lewat website.</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs">
              {messages.length === 0 ? (
                <div className="p-12 text-center text-xs text-neutral-400">Belum ada pesan masuk di database.</div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-6 space-y-3 hover:bg-neutral-50/60 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-neutral-900">{msg.name}</h4>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-blue-600 hover:underline inline-block"
                          >
                            {msg.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 font-semibold">
                            <Calendar size={11} />
                            {new Date(msg.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>

                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Hapus Pesan"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-neutral-50 rounded-2xl text-xs text-neutral-700 leading-relaxed border border-neutral-100">
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}