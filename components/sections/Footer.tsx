"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            // Create mailto link with form data
            const subject = encodeURIComponent(`Contact from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            );
            window.location.href = `mailto:harold007700@gmail.com?subject=${subject}&body=${body}`;

            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });

            // Reset submitted state after 3 seconds
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <footer id="contact" className="relative pt-24 pb-12 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 tracking-wide text-center">
  Get In <span className="text-sage">Touch</span>
</h2>

 <br />
                {/* Contact Form Section */}
                <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 text-center max-w-4xl mx-auto mb-20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-sage/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Have a project in mind? Drop me a message and let's create something amazing together.
                    </p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="px-6 py-4 rounded-2xl bg-black/50 border border-white/10 focus:border-sage focus:outline-none text-white placeholder:text-gray-500 transition-colors"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="px-6 py-4 rounded-2xl bg-black/50 border border-white/10 focus:border-sage focus:outline-none text-white placeholder:text-gray-500 transition-colors"
                                />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-6 py-4 rounded-2xl bg-black/50 border border-white/10 focus:border-sage focus:outline-none text-white placeholder:text-gray-500 transition-colors resize-none"
                            />
                            <button
                                type="submit"
                                disabled={!formData.name || !formData.email || !formData.message}
                                className="w-full md:w-auto px-12 py-4 bg-sage text-black font-bold uppercase tracking-wide rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(178,172,136,0.3)] hover:shadow-[0_0_30px_rgba(178,172,136,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send Message
                            </button>
                        </form>
                    ) : (
                        <div className="w-full py-8 text-center space-y-2 animate-in fade-in zoom-in duration-300">
                            <div className="text-2xl font-bold text-sage">Message Sent!</div>
                            <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
                        </div>
                    )}
                </div>

                {/* Footer Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold font-display tracking-wider block">
                            VISHNU <span className="text-sage">CP</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Crafting modern digital experiences with precision and creativity.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Github, href: "https://github.com/cp-dotcom" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/in/vishnu-cp404/" },
                                { Icon: Mail, href: "mailto:harold007700@gmail.com" }
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-sage hover:text-black transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Explore</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="#projects" className="hover:text-sage transition-colors">Projects</Link></li>
                            <li><Link href="#skills" className="hover:text-sage transition-colors">Skills</Link></li>
                            <li><Link href="#experience" className="hover:text-sage transition-colors">Experience</Link></li>
                            <li><Link href="#contact" className="hover:text-sage transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-sage transition-colors">Resume</a></li>
                            <li><a href="#" className="hover:text-sage transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-sage transition-colors">GitHub Repos</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex justify-between">
                                <span>Portfolio Version</span>
                                <span className="text-white">2.0</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-500">Theme</span>
                                <span className="text-gray-500">Dark (Default)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} Vishnu CP. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
