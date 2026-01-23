"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

// Note: Real-time presence is powered by Supabase
const VISITORS: any[] = [];

export default function VisitorStack() {
    const [realVisitors, setRealVisitors] = useState<any[]>([]);

    useEffect(() => {
        const identity = {
            name: "You",
            src: "/images/download-removebg-preview (1).png",
            online_at: new Date().toISOString()
        };

        // Show self immediately as a fallback
        setRealVisitors([identity]);

        // Only run real-time logic if Supabase keys are provided
        if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            return;
        }

        const channel = supabase.channel('presence-visitors', {
            config: {
                presence: {
                    key: 'visitor',
                },
            },
        });

        channel
            .on('presence', { event: 'sync' }, () => {
                const newState = channel.presenceState();
                const flattened: any[] = [];
                Object.values(newState).forEach((presences: any) => {
                    presences.forEach((p: any) => {
                        if (p.name && p.src) flattened.push(p);
                    });
                });

                // Deduplicate by name, ensuring "You" stays at the front
                let unique = flattened.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);

                // If "You" isn't in the real-time list, add the local identity
                if (!unique.find(v => v.name === identity.name)) {
                    unique = [identity, ...unique];
                }

                setRealVisitors(unique);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track(identity);

                    // Persistent database log
                    try {
                        if (supabase) {
                            await supabase
                                .from('portfolio_visitors')
                                .insert([{
                                    name: identity.name,
                                    avatar_url: identity.src,
                                    visited_at: identity.online_at
                                }]);
                        }
                    } catch (error) {
                        console.error("Failed to log visitor persistence:", error);
                    }
                }
            });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="flex flex-col items-center lg:items-start gap-4"
        >
            <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">
                    Real-Time Visitors
                </span>
            </div>

            <div className="flex items-center">
                <div className="flex -space-x-3 transition-all duration-300">
                    {realVisitors.length === 0 && (
                        <div className="text-xs text-white/20 italic ml-1">
                            Detecting visitors...
                        </div>
                    )}

                    {realVisitors.map((person, i) => (
                        <motion.div
                            key={person.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="group relative"
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl scale-90 group-hover:scale-100">
                                {person.name}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                            </div>

                            <motion.div
                                className={`relative w-11 h-11 rounded-full border-2 border-deep-bg overflow-hidden bg-gray-900 ring-1 ${person.name === "You" ? 'ring-sage shadow-[0_0_20px_rgba(178,172,136,0.3)]' : 'ring-white/10'}`}
                                whileHover={{ scale: 1.15, zIndex: 10, y: -5 }}
                            >
                                <Image
                                    src={person.src}
                                    alt={person.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {realVisitors.length > 0 && (
                    <div className="ml-5 flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage"></span>
                            </span>
                            <span className="text-sm font-medium text-white/80">
                                {realVisitors.length} live now
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
