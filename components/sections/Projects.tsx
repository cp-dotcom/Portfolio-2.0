"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    
    {
        title: "POS System",
        category: "Desktop Application (Live Project)",
        description: "A live full-featured Point of Sale system for the Saudi market. Features multilingual support (Arabic/English), phone input, offline capabilities, and a MERN stack backend. Built with Electron, React, TypeScript, and Zustand.",
        tech: ["Electron", "React", "TypeScript", "Zustand", "MERN Stack", "i18n"],
        image: "/images/Gemini_Generated_Image_ydh00bydh00bydh0.png",
        href: "#",
    },
     {
        title: "ZipRide",
        category: "Ride Architect App",
        description: "Instant ride booking application with multilingual support, GSAP animations, and Redux state management. Collaborative Git workflow.",
        tech: ["Next.js", "GSAP", "Redux", "i18n"],
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop", // Placeholder
        href: "#",
    },
    {
        title: "Verdant Vogue",
        category: "E-commerce Platform",
        description: "A premium plant-selling website featuring a modern, dark-themed UI with sage green accents. Includes a shopping cart, product filtering, and a seamless checkout experience. Built with React, Next.js, Tailwind, and TypeScript.",
        tech: ["React", "Next.js", "Tailwind", "TypeScript"],
        image: "/images/plant_store_mockup.png",
        href: "#",
    },
   
    {
        title: "E-Commerce App",
        category: "Full Stack Web App",
        description: "A responsive e-commerce platform with product listing, search, filters, cart functionality, and JSON server backend. Built with React and Tailwind.",
        tech: ["React", "Tailwind", "Redux", "JSON Server"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1932&auto=format&fit=crop", // Placeholder
        href: "#",
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".project-card").forEach((card: any, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "power2.out",
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="py-24 relative">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-12 flex items-end gap-3">
                    Selected <span className="text-sage">Works</span>
                    <span className="text-sm text-gray-400 font-body font-normal mb-2 ml-2">({projects.length})</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card group relative p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-sage/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(178,172,136,0.1)]"
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                {/* Use a placeholder div or real Image if URLs were real assets. Using div with bg for now if Image fails or external. */}
                                {/* Actually using Image with unoptimized for external URL to avoid config error */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    unoptimized
                                />
                            </div>

                            <div className="px-2 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-sage text-xs font-bold uppercase tracking-wider">{project.category}</span>
                                        <h3 className="text-2xl font-bold font-display mt-1 group-hover:text-white transition-colors">{project.title}</h3>
                                    </div>
                                    <Link
                                        href={project.href}
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-sage hover:text-black transition-all transform group-hover:rotate-45"
                                    >
                                        <ArrowUpRight size={20} />
                                    </Link>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-3 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
