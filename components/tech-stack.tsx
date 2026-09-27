import React from "react";

// Koleksi Logo Vektor Teknologi (Resmi, Tajam, & Bebas Ketergantungan Eksternal)
const TechIcons: Record<string, React.ReactNode> = {
  "React": (
    <svg className="w-8 h-8" viewBox="-11.5 -10.23174 23 20.46348" fill="#00d8ff">
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="#00d8ff" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  "Next.js": (
    <svg className="w-8 h-8" viewBox="0 0 180 180" fill="none">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect x="115" y="54" width="12" height="72" fill="white" />
      </g>
    </svg>
  ),
  "Tailwind CSS": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#38bdf8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  "TypeScript": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3178c6">
      <rect width="24" height="24" rx="4" fill="#3178c6" />
      <path d="M11.5 8h-6v2.2h1.8v7.8h2.4v-7.8h1.8V8zm2.4 7.6c.7.5 1.5.8 2.3.8 1 0 1.5-.4 1.5-1 0-.6-.4-.9-1.5-1.3-1.6-.6-2.5-1.4-2.5-2.6 0-1.4 1.2-2.5 3-2.5 1 0 1.8.3 2.4.7l-.6 1.9c-.6-.4-1.2-.6-1.8-.6-.7 0-1.1.3-1.1.8 0 .5.4.8 1.5 1.2 1.7.6 2.5 1.4 2.5 2.7 0 1.5-1.2 2.6-3.2 2.6-1.2 0-2.2-.4-2.9-.9l.4-1.8z" fill="#ffffff" />
    </svg>
  ),
  "JavaScript": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#f7df1e">
      <rect width="24" height="24" rx="4" fill="#f7df1e" />
      <path d="M12.5 17.5c.6.9 1.4 1.5 2.6 1.5 1.4 0 2.3-.7 2.3-2.4v-6.3h2.3v6.4c0 2.8-1.7 4.1-4.4 4.1-2.1 0-3.3-.9-4.1-2.4l1.3-.9zm-6.1.1c.4.7 1 .1.2 1.6 1.2.9 0 1.5-.5 1.5-1.1 0-.6-.4-.9-1.4-1.4-1.5-.6-2.5-1.4-2.5-2.7 0-1.5 1.2-2.5 3-2.5 1.3 0 2.2.4 2.9 1.4l-1.3 1c-.3-.5-.7-.8-1.4-.8-.7 0-1.1.3-1.1.7 0 .5.4.8 1.4 1.2 1.6.7 2.5 1.4 2.5 2.8 0 1.7-1.3 2.7-3.4 2.7-1.7 0-2.8-.7-3.4-1.9l1.6-1.2z" fill="#000000" />
    </svg>
  ),
  "HTML5 / CSS3": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#e34f26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "PostgreSQL": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#336791">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V18h-2v.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-.07c3.95-.49 7-3.85 7-7.93 0-.62-.08-1.21-.21-1.79L13 14v4.93z" />
    </svg>
  ),
  "SQL / Database": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "Supabase": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3ecf8e">
      <path d="M13.35 1.05c-.6-.4-1.45.02-1.45.74V9.6H3.3c-.65 0-1.04.72-.65 1.25L10.65 22.95c.6.4 1.45-.02 1.45-.74v-7.81h8.6c.65 0 1.04-.72.65-1.25L13.35 1.05z" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#5fa04e">
      <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z" />
    </svg>
  ),
  "Python": (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path d="M11.9 2c-3.7 0-3.5 1.6-3.5 1.6l.01 1.7h3.6v.5H4.8S2 5.5 2 9.2s2.5 3.6 2.5 3.6h1.5v-2.1s-.1-2.5 2.5-2.5h4.3s2.4.1 2.4-2.4V4.4S15.4 2 11.9 2zm-1.8 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#387eb8" />
      <path d="M12.1 22c3.7 0 3.5-1.6 3.5-1.6l-.01-1.7H12v-.5h7.2s2.8.3 2.8-3.4-2.5-3.6-2.5-3.6H18v2.1s.1 2.5-2.5 2.5h-4.3s-2.4-.1-2.4 2.4v1.4S8.6 22 12.1 22zm1.8-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#ffe052" />
    </svg>
  ),
  "Pandas": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#150458">
      <rect x="3" y="4" width="3.5" height="16" rx="1.5" />
      <rect x="10.25" y="8" width="3.5" height="12" rx="1.5" />
      <rect x="17.5" y="11" width="3.5" height="9" rx="1.5" />
    </svg>
  ),
  "Data Visualization / Matplotlib": (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
};

const skillCategories = [
  {
    title: "Frontend Languages & Frameworks",
    description:
      "Teknologi utama untuk merancang antarmuka web modern yang responsif, rapi, dan berperforma tinggi.",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript", "HTML5 / CSS3"],
  },
  {
    title: "Backend & Database Core",
    description:
      "Fondasi logika server, manajemen database relasional SQL, serta integrasi layanan backend.",
    skills: ["PostgreSQL", "SQL / Database", "Supabase", "Node.js"],
  },
  {
    title: "Data Science & Analytics Tools",
    description:
      "Perangkat analisis data untuk eksplorasi dataset, pembersihan data (data cleaning), dan visualisasi pola data.",
    skills: ["Python", "Pandas", "Data Visualization / Matplotlib"],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-24 border-t border-neutral-100">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
            SKILLS & TOOLS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            My Tech Stack
          </h2>
        </div>

        {/* Categories Stack */}
        <div className="space-y-14 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-6">
              
              {/* Info Kategori */}
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-bold text-neutral-900">
                  {category.title}
                </h3>
                <p className="text-neutral-500 text-sm max-w-2xl">
                  {category.description}
                </p>
              </div>

              {/* Grid Kartu Tech */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skillName, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="p-5 bg-white border border-neutral-100/90 rounded-2xl shadow-xs hover:shadow-md hover:border-neutral-200 hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-3 text-center group cursor-default"
                  >
                    <div className="p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      {TechIcons[skillName] || (
                        <div className="w-8 h-8 rounded-full bg-neutral-200" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 tracking-tight">
                      {skillName}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}