import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-bg overflow-hidden selection:bg-sage selection:text-black">
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Footer />
    </main>
  );
}
