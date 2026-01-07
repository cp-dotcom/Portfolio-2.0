"use client";

import { useRef, useEffect } from "react";
import { Building2, GraduationCap, Calendar, Award } from "lucide-react";

const experience = [
    {
        role: "Web Developer",
        company: "Bridgeon Solutions",
        period: "2025 – Present",
        description: "Built & maintained responsive web apps. Used React, Redux, Tailwind. Improved performance & UI/UX.",
    },
];

const education = [
    {
        degree: "BCA",
        school: "University of Calicut",
        period: "2022 – 2025",
    },
    {
        role: "Junior Software Developer",
        school: "VHSE",
        period: "2020 – 2022",
    },
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const cards = container.getElementsByClassName("spotlight-card");
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
                (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
            }
        };

        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6">
                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 group">

                    {/* Education Column (Left) */}
                    <div>
                        <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-3">
                            <GraduationCap className="text-gold" /> Education
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div
                                    key={i}
                                    className="spotlight-card relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-gold/30"
                                >
                                    {/* Spotlight Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(178, 172, 136, 0.15), transparent 40%)`
                                        }}
                                    />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{edu.degree || edu.role}</h3>
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 flex items-center gap-1">
                                                <Calendar size={12} /> {edu.period}
                                            </span>
                                        </div>
                                        <p className="text-lg text-gray-400">{edu.school}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience & Certifications Column (Right) */}
                    <div>
                        <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-3">
                            <Building2 className="text-sage" /> Work Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, i) => (
                                <div
                                    key={i}
                                    className="spotlight-card relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-sage/30"
                                >
                                    {/* Spotlight Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(209, 213, 219, 0.15), transparent 40%)`
                                        }}
                                    />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-sage transition-colors">{exp.role}</h3>
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 flex items-center gap-1">
                                                <Calendar size={12} /> {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-lg text-gray-400 mb-2">{exp.company}</p>
                                        <p className="text-sm text-gray-500 leading-relaxed max-w-md">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Certifications (Moved to Right & Restyled as Grid) */}
                        <div className="mt-12">
                            <h2 className="text-3xl font-bold font-display mb-8 flex items-center gap-3">
                                <Award className="text-sage" /> Certifications
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="spotlight-card relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-sage/30">
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sage transition-colors">
                                            Python Django
                                        </h3>
                                        <p className="text-sm text-gray-400">Techno Dot</p>
                                        <span className="text-xs text-gray-500 mt-2 block">Workshop</span>
                                    </div>
                                </div>
                                <div className="spotlight-card relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-sage/30">
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sage transition-colors">
                                            Cyber Security
                                        </h3>
                                        <p className="text-sm text-gray-400">Ehackify</p>
                                        <span className="text-xs text-gray-500 mt-2 block">Workshop</span>
                                    </div>
                                </div>
                                <div className="spotlight-card relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-sage/30">
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sage transition-colors">
                                            AI Expert
                                        </h3>
                                        <p className="text-sm text-gray-400">NXT Wave</p>
                                        <span className="text-xs text-gray-500 mt-2 block">Webinar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
