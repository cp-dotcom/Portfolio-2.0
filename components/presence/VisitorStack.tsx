"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

// Note: Real-time presence is powered by Supabase
const VISITORS: any[] = [];

export default function VisitorStack() {
    const [realVisitors, setRealVisitors] = useState<any[]>([]);
    const [historicalVisitors, setHistoricalVisitors] = useState<any[]>([]);

    useEffect(() => {
        const identity = {
            name: "You",
            src: "/images/download-removebg-preview (1).png",
            online_at: new Date().toISOString()
        };

        const fetchHistorical = async () => {
            if (!supabase) return;
            try {
                const { data, error } = await supabase
                    .from('portfolio_visitors')
                    .select('name, avatar_url, visited_at')
                    .neq('name', 'You')
                    .order('visited_at', { ascending: false })
                    .limit(10);

                if (data) {
                    // Deduplicate by name
                    const unique = data.reduce((acc: any[], current: any) => {
                        const x = acc.find(item => item.name === current.name);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);

                    setHistoricalVisitors(unique.map(v => ({
                        name: v.name,
                        src: v.avatar_url,
                        visited_at: v.visited_at,
                        is_historical: true
                    })));
                }
            } catch (err) {
                console.error("Error fetching historical visitors:", err);
            }
        };

        fetchHistorical();

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
                let online = flattened.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);

                // If "You" isn't in the real-time list, add the local identity
                if (!online.find(v => v.name === identity.name)) {
                    online = [identity, ...online];
                }

                setRealVisitors(online);
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

    // Combine and deduplicate
    const onlineNames = new Set(realVisitors.map(v => v.name));
    const allVisitors = [
        ...realVisitors,
        ...historicalVisitors.filter(v => !onlineNames.has(v.name))
    ].slice(0, 8); // Show max 8 avatars

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }} // Reduced delay
            className="flex flex-col items-center lg:items-start gap-4"
        >
            <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">
                    Real-Time Visitors
                </span>
            </div>

            <div className="flex items-center">
                <div className="flex -space-x-3 transition-all duration-300">
                    {allVisitors.length === 0 && (
                        <div className="text-xs text-white/20 italic ml-1">
                            Detecting visitors...
                        </div>
                    )}

                    {allVisitors.map((person, i) => (
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
                                className={`relative w-11 h-11 rounded-full border-2 border-deep-bg overflow-hidden bg-gray-900 ring-1 ${person.name === "You" ? 'ring-sage shadow-[0_0_20px_rgba(178,172,136,0.3)]' : 'ring-white/10'} ${person.is_historical ? 'grayscale-[0.5] opacity-60' : ''}`}
                                whileHover={{ scale: 1.15, zIndex: 10, y: -5, filter: "grayscale(0)", opacity: 1 }}
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

                {allVisitors.length > 0 && (
                    <div className="ml-5 flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 ${realVisitors.length > 1 ? 'animate-ping' : ''}`}></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage"></span>
                            </span>
                            <span className="text-sm font-medium text-white/80">
                                {realVisitors.length} online
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
