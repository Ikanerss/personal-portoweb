import { Calendar, Building2 } from "lucide-react";

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    year: "2024 - Sekarang",
    role: "Mahasiswa Teknik Informatika",
    company: "UNIVERSITAS MERCU BUANA",
    description:
      "Mempelajari fondasi ilmu komputer mencakup Algoritma & Struktur Data, Rekayasa Perangkat Lunak, Basis Data Relasional, serta Pemrograman Web. Mengembangkan kemampuan analisis logika dan pemecahan masalah secara terstruktur.",
    technologies: ["SQL", "ALGORITMA", "DATABASE", "GIT", "LOGIKA PEMROGRAMAN"],
  },
  {
    year: "2024 - Sekarang",
    role: "Frontend Development Explorer",
    company: "PROYEK MANDIRI & FREELANCE",
    description:
      "Secara konsisten mendalami ekosistem antarmuka web modern. Membangun platform personal portfolio interaktif berbasis Next.js, implementasi Tailwind CSS, hingga integrasi asisten cerdas berbasis AI.",
    technologies: ["NEXT.JS", "REACT", "TAILWIND CSS", "TYPESCRIPT", "UI/UX"],
  },
  {
    year: "2024 - Sekarang",
    role: "Data Science & Analysis Explorer",
    company: "ACADEMIC & INDEPENDENT",
    description:
      "Mengeksplorasi pengolahan dataset terstruktur, pembersihan data (data cleaning), serta analisis data eksploratif (EDA) dan visualisasi grafik menggunakan pustaka Python untuk pengambilan keputusan berbasis data.",
    technologies: ["PYTHON", "PANDAS", "MATPLOTLIB", "POSTGRESQL", "EDA"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-neutral-100">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
            CAREER PATH
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            Work Experience
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Garis Vertikal Tengah */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 -translate-x-1/2 bg-neutral-200" />

          {/* List Kartu Pengalaman */}
          <div className="space-y-12">
            {experiences.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Titik Node Timeline */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border-4 border-white bg-neutral-900 shadow-sm z-10 mt-6" />

                  {/* Spacer untuk desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Kartu Pengalaman */}
                  <div
                    className={`w-full md:w-1/2 pl-14 ${
                      isEven ? "md:pl-0 md:pr-12" : "md:pl-12 md:pr-0"
                    }`}
                  >
                    <div className="p-6 md:p-8 bg-white border border-neutral-100 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
                      
                      {/* 1. Badge Tahun (Di atas, tidak akan pernah terpotong) */}
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-full whitespace-nowrap">
                          <Calendar size={12} />
                          {item.year}
                        </span>
                      </div>

                      {/* 2. Judul Role & Instansi (Tersusun rapi ke bawah) */}
                      <div className="space-y-1">
                        <h3 className="text-lg md:text-xl font-bold text-neutral-900">
                          {item.role}
                        </h3>
                        <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-neutral-400">
                          <Building2 size={13} />
                          {item.company}
                        </p>
                      </div>

                      {/* 3. Deskripsi */}
                      <p className="text-neutral-500 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* 4. Tag Teknologi */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 py-1 text-[11px] font-semibold tracking-wider text-neutral-600 bg-neutral-50 border border-neutral-200/60 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}