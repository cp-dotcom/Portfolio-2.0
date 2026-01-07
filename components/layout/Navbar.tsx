"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import StaggeredMenu from "./StaggeredMenu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    const socialLinks = [
        { Icon: Github, href: "https://github.com/cp-dotcom", label: "GitHub" },
        { Icon: Linkedin, href: "https://www.linkedin.com/in/vishnu-cp404/", label: "LinkedIn" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-black/50 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold font-display tracking-wider">
                    VISHNU <span className="text-sage">CP</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest hover:text-sage"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Social Links */}
                    <div className="flex gap-3 ml-2">
                        {socialLinks.map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-sage hover:text-black transition-all"
                                aria-label={label}
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>

                    <Link
                        href="#contact"
                        className="px-6 py-2 bg-sage text-black font-bold uppercase tracking-wide rounded-full hover:bg-white transition-colors"
                    >
                        Hire Me
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu with Stagger Animation */}
            <StaggeredMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </nav>
    );
};

export default Navbar;
