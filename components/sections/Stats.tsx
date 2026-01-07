"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Experience", value: "2+", suffix: "Years" },
    { label: "Projects Completed", value: "15+", suffix: "Works" },
    { label: "Technologies Mastered", value: "10+", suffix: "Stack" },
    { label: "Company", value: "Bridgeon", suffix: "Solutions" },
];

export default function Stats() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-20 relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-card glass-panel p-6 rounded-2xl text-center border border-white/5 hover:border-sage/30 transition-colors group"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-sage transition-colors">
                                {stat.value}
                            </h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                                {stat.label}
                            </p>
                            <span className="text-xs text-gray-600 block mt-1">{stat.suffix}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
