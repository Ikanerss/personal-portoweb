"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // <-- Komponen pengolah gambar resmi Next.js
import { 
  ArrowRight, 
  Download, 
  Code2, 
  GraduationCap, 
  Laptop 
} from "lucide-react";

export default function Hero() {
  const roles = [
    "Frontend Developer",
    "Data Science Enthusiast",
    "IT Student & Explorer"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Kolom Kiri: Teks & Aksi */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
              Hi, I&apos;m <span className="text-neutral-700">Faizano</span>
            </h1>
            
            {/* Typewriter text */}
            <div className="h-10 flex items-center">
              <span className="text-2xl md:text-3xl font-bold text-neutral-600">
                {displayedText}
              </span>
              <span className="inline-block w-0.75 h-7 bg-neutral-900 ml-1 animate-pulse"></span>
            </div>
          </div>

          <p className="text-neutral-500 text-base md:text-lg max-w-xl leading-relaxed">
            Halo! Saya suka ngoding dan bereksperimen dengan ide-ide baru. 
            Bagi saya, setiap baris kode adalah cara untuk menghadirkan sesuatu 
            yang bermanfaat dan fungsional di dunia digital.
          </p>

          {/* Tombol Aksi (CTA) */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-all shadow-sm group"
            >
              Explore Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Tombol Download CV langsung mengarah ke cv.pdf */}
            <a
              href="/cv.pdf"
              download="CV.pdf"
              className="inline-flex items-center gap-2 bg-white text-neutral-800 border border-neutral-200 px-6 py-3 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-all shadow-sm"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          {/* Social Links menggunakan SVG dari folder public */}
          <div className="pt-6 space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
              CONNECT
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg hover:bg-neutral-100 transition opacity-80 hover:opacity-100"
              >
                <Image 
                  src="/github-icon.svg" 
                  alt="GitHub" 
                  width={22} 
                  height={22} 
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg hover:bg-neutral-100 transition opacity-80 hover:opacity-100"
              >
                <Image 
                  src="/linkedin-icon.svg" 
                  alt="LinkedIn" 
                  width={22} 
                  height={22} 
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg hover:bg-neutral-100 transition opacity-80 hover:opacity-100"
              >
                <Image 
                  src="/instagram-icon.svg" 
                  alt="Instagram" 
                  width={22} 
                  height={22} 
                />
              </a>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Foto Lingkaran + 3 Badge Melayang */}
        <div className="md:col-span-5 relative flex justify-center items-center">
          
          {/* Wadah Foto Profil Bulat */}
          <div className="relative w-72 h-72 md:w-88 md:h-88 rounded-full border-4 border-white shadow-xl overflow-hidden bg-neutral-100">
            <Image
              src="/profile.jpeg"
              alt="Foto Profil"
              fill
              sizes="(max-width: 768px) 288px, 352px"
              priority
              className="object-cover"
            />
          </div>

          {/* 3 BADGE MELAYANG (Versi Lebih Ramping & Tidak Menutupi Wajah) */}
          <div className="absolute -bottom-4 -left-3 md:-left-8 flex flex-col gap-2 z-10">
            
            {/* Badge 1 */}
            <div className="bg-white/95 backdrop-blur-md border border-neutral-100 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2.5 hover:scale-105 transition-transform duration-200">
              <div className="p-1.5 bg-neutral-100 rounded-md text-neutral-800">
                <GraduationCap size={14} />
              </div>
              <span className="text-[11px] font-semibold text-neutral-800">
                IT Student & Developer
              </span>
            </div>

            {/* Badge 2 */}
            <div className="bg-white/95 backdrop-blur-md border border-neutral-100 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2.5 hover:scale-105 transition-transform duration-200">
              <div className="p-1.5 bg-neutral-100 rounded-md text-neutral-800">
                <Code2 size={14} />
              </div>
              <span className="text-[11px] font-semibold text-neutral-800">
                JavaScript & Python
              </span>
            </div>

            {/* Badge 3 */}
            <div className="bg-white/95 backdrop-blur-md border border-neutral-100 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2.5 hover:scale-105 transition-transform duration-200">
              <div className="p-1.5 bg-neutral-100 rounded-md text-neutral-800">
                <Laptop size={14} />
              </div>
              <span className="text-[11px] font-semibold text-neutral-800">
                Frontend & Data Enthusiast
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}