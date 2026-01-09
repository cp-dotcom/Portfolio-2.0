"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import GeometricShapes from "@/components/3d/GeometricShapes";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box, Code, Globe, Layers, Zap, CheckCircle, CreditCard } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const watermarkRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Parallax for Watermark
            gsap.to(watermarkRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                y: 200,
            });

            // Animate Elements
            tl.from(".hero-content", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 2.5,
            })
                .from(".float-widget", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[110vh] flex flex-col justify-center overflow-hidden bg-deep-bg pt-20">

            {/* Massive Watermark Text */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0">
            
                <h1 ref={watermarkRef} className="text-[12rem] md:text-[20rem] font-bold font-display text-white/5 whitespace-nowrap leading-none select-none">
                    VISHNU CP
                </h1>
            </div>

            {/* 3D Background Layer */}
            <GeometricShapes />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text Content */}
                <div className="hero-content space-y-8 text-center lg:text-left">
                    

                    <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight ">
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300/10 to-sage">YOUR VISION</span>  <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage to-black/10">
                            MY MISSION
                        </span> <br />

                    </h2>

                    <p className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Creative frontend developer specializing in building
                        premium, high-performance web applications with modern technologies.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                        <Link href="#contact" className="px-8 py-4 bg-sage text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(178,172,136,0.3)]">
                            Start Project
                        </Link>
                        <Link href="#projects" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-md">
                            View Work
                        </Link>
                    </div>
                </div>

                {/* Right: Floating 'Dashboard' Composition */}
                <div className="relative h-[600px] w-full flex items-center justify-center">
                    {/* Main Profile Image - Blended */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-20 w-[450px] h-[550px] z-20 pointer-events-none select-none">
                        <div
                            className="relative w-full h-full"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                            }}
                        >
                            <Image
                                src="/images/download-removebg-preview (1).png"
                                alt="Vishnu CP"
                                fill
                                className="object-contain object-bottom grayscale scale-110"
                                priority
                                quality={100}
                            />
                        </div>
                    </div>

                   

                    {/* Floating Widget: Payment/Success */}


                    {/* Floating Widget: Icons */}


                    {/* Decorative Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sage/20 rounded-full blur-[100px] -z-10" />
                </div>
            </div>

            {/* Curved Divider at Bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[100px] fill-black/20 backdrop-blur-sm">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

        </section>
    );
}
