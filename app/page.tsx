import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import TechStack from "@/components/tech-stack";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ChatAssistant from "@/components/chat-assistant";

export default function Home() {
  return (
    <main className="min-h-screen px-6 max-w-6xl mx-auto">
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
      <ChatAssistant />
    </main>
  );
}