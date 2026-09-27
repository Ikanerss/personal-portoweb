"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, Loader2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Halo! Saya adalah asisten AI Faizano. Ada yang bisa saya bantu terkait portofolio, latar belakang pendidikan di Mercu Buana, keahlian, atau proyek Faizano?",
      time: "Online",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke pesan terbawah saat ada chat baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      time: currentTime,
    };

    // Tambahkan pesan user ke UI
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Kirim pesan user beserta riwayat obrolan ke backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: updatedMessages, // Mengirim percakapan sebelumnya!
        }),
      });

      const data = await response.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "Maaf, coba ulangi pertanyaanmu.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Koneksi terputus. Pastikan server lokalmu berjalan.",
          time: currentTime,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* JENDELA CHAT (POPUP) */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-95 h-125 bg-white border border-neutral-100 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Chat */}
          <div className="px-5 py-4 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  Faizano Assistant
                  <Sparkles size={12} className="text-yellow-400" />
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition"
              aria-label="Tutup Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Area Pesan Obrolan */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-neutral-900 text-white rounded-br-none"
                      : "bg-white text-neutral-800 border border-neutral-200/80 shadow-xs rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-neutral-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Indikator Mengetik */}
            {isLoading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs p-2 bg-white rounded-2xl border border-neutral-100 w-fit">
                <Loader2 size={13} className="animate-spin text-neutral-600" />
                <span>Faizano Assistant sedang mengetik...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Chat */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-neutral-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanyakan sesuatu..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-100 text-xs md:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-900 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 disabled:opacity-40 transition cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}

      {/* TOMBOL FLOATING DI POJOK KANAN BAWAH */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Buka Chat AI"
        className="w-14 h-14 rounded-full bg-neutral-900 text-white shadow-xl hover:bg-neutral-800 flex items-center justify-center hover:scale-105 transition-all duration-200 relative group cursor-pointer"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        
        {/* Titik Notifikasi Hijau */}
        {!isOpen && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </button>

    </div>
  );
}