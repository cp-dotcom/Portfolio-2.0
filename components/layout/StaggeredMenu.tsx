"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

interface StaggeredMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuVariants = {
    closed: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    closed: {
        opacity: 0,
        x: -20
    },
    open: {
        opacity: 1,
        x: 0
    }
};

export default function StaggeredMenu({ isOpen, onClose }: StaggeredMenuProps) {
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

    if (!isOpen) return null;

    return (
        <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6"
        >
            {/* Navigation Links */}
            {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                    <Link
                        href={link.href}
                        className="text-lg font-medium text-gray-300 hover:text-sage uppercase tracking-widest block transition-colors"
                        onClick={onClose}
                    >
                        {link.name}
                    </Link>
                </motion.div>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4 border-t border-white/10">
                {socialLinks.map(({ Icon, href, label }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-sage hover:text-black transition-all"
                        aria-label={label}
                    >
                        <Icon size={18} />
                    </a>
                ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
                <Link
                    href="#contact"
                    className="px-6 py-3 bg-sage text-black font-bold uppercase tracking-wide rounded-full text-center hover:bg-white transition-colors block"
                    onClick={onClose}
                >
                    Hire Me
                </Link>
            </motion.div>
        </motion.div>
    );
}
