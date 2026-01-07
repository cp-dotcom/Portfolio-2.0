"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setComplete(true),
            });

            // Counter Animation
            const counterObj = { value: 0 };
            tl.to(counterObj, {
                value: 100,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    const counter = document.getElementById("loader-counter");
                    if (counter) counter.textContent = Math.round(counterObj.value).toString();
                },
            });

            // Reveal Animation
            tl.to(".loader-content", {
                opacity: 0,
                y: -50,
                duration: 0.5,
                ease: "power2.in",
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                }, "-=0.2");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (complete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center pointer-events-none"
        >
            <div className="loader-content flex flex-col items-center gap-4">
                {/* Animated Counter */}
                <div className="relative">
                    <div className="text-8xl md:text-9xl font-bold font-display text-white">
                        <span id="loader-counter">0</span>%
                    </div>
                    <div className="absolute -bottom-4 left-0 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-sage/50 animate-pulse w-full origin-left scale-x-0" style={{ animation: "grow 1.5s ease-in-out forwards" }} />
                    </div>
                </div>

                <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-medium animate-pulse">
                    Initializing Experience
                </p>
            </div>

            <style jsx>{`
        @keyframes grow {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
        }
      `}</style>
        </div>
    );
}
