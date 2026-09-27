import { User, Mail, GraduationCap, MapPin, Sparkles } from "lucide-react";

export default function About() {
  const personalDetails = [
    { label: "NAME", value: "Faizano", icon: User },
    { label: "STATUS", value: "Mahasiswa IT", icon: GraduationCap },
    { label: "FOCUS", value: "Frontend & Data Science", icon: Sparkles },
    { label: "LOCATION", value: "Indonesia", icon: MapPin },
  ];

  return (
    <section id="about" className="py-24 border-t border-neutral-100">
      <div className="space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
            DISCOVER
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
            About Me
          </h2>
        </div>

        {/* Konten Utama: 2 Kolom (Who Am I & My Approach) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Kartu 1: Who Am I */}
          <div className="p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-neutral-900">Who Am I</h3>
            <p className="text-neutral-500 leading-relaxed text-sm md:text-base">
              Saya adalah seorang mahasiswa jurusan Teknologi Informasi dengan ketertarikan mendalam 
              pada pengembangan antarmuka web modern (*Frontend*) serta eksplorasi analitik data (*Data Science*). 
              Saya menikmati proses menerjemahkan ide visual menjadi kode yang fungsional, bersih, dan mudah digunakan.
            </p>
          </div>

          {/* Kartu 2: My Approach */}
          <div className="p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-neutral-900">My Approach</h3>
            <p className="text-neutral-500 leading-relaxed text-sm md:text-base">
              Saya mengutamakan *clean code*, desain antarmuka yang intuitif, serta kinerja website yang cepat dan responsif. 
              Dengan latar belakang logika data, saya terbiasa mendekati pemecahan masalah teknis secara terstruktur dan terukur.
            </p>
          </div>

        </div>

        {/* Kotak Personal Details */}
        <div className="p-8 rounded-2xl bg-neutral-50/70 border border-neutral-100 space-y-6">
          <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400">
            Personal Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {personalDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs font-semibold">
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </div>
                  <p className="text-neutral-800 font-semibold text-sm md:text-base">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}