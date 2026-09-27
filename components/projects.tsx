"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, X, ArrowUpRight } from "lucide-react";
import ProjectsSkeleton from "@/components/projects-skeleton";
import { supabase } from "@/lib/supabase"; // <-- Impor konektor Supabase

interface Project {
  id: number;
  title: string;
  category: "Web Development" | "Data Science";
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

function GithubSvg({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mengambil data proyek melalui API internal Next.js (Anti-Gagal & Aman)
  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/projects");
        const data = await res.json();

        if (Array.isArray(data)) {
          const formatted: Project[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category as "Web Development" | "Data Science",
            description: item.description,
            longDescription: item.long_description,
            techStack: item.tech_stack || [],
            image: item.image,
            liveUrl: item.live_url,
            githubUrl: item.github_url,
          }));
          setProjects(formatted);
        } else {
          // Cetak isi error secara jelas di console browser
          console.error("Isi respon dari server:", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Gagal melakukan fetch:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const categories = ["All", "Web Development", "Data Science"];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 border-t border-neutral-100">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
            PORTFOLIO
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Selected Works
          </h2>
        </div>

        {/* Tab Filter Kategori */}
        <div className="flex justify-center items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menampilkan Skeleton saat sedang fetching dari database */}
        {isLoading ? (
          <ProjectsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group animate-in fade-in"
              >
                {/* Thumbnail Gambar */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-neutral-700 shadow-xs">
                    {project.category}
                  </div>
                </div>

                {/* Konten Kartu */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-semibold text-neutral-600 bg-neutral-50 border border-neutral-200/60 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 cursor-pointer"
                    >
                      VIEW DETAILS
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal Detail Proyek */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white border border-neutral-100 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition cursor-pointer"
              aria-label="Tutup modal"
            >
              <X size={18} />
            </button>

            <div className="space-y-1 pr-10">
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-extrabold text-neutral-900">
                {selectedProject.title}
              </h3>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                Overview
              </h4>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-semibold text-neutral-700 bg-neutral-100 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-100">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition"
                >
                  <ExternalLink size={14} />
                  Live Preview
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold hover:bg-neutral-50 transition"
                >
                  <GithubSvg size={14} />
                  Source Code
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}