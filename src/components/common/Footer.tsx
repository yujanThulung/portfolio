"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    Linkedin,
    Github,
    Twitter,
    MapPin,
    ArrowUp,
    Calendar,
    ExternalLink,
} from "lucide-react";

interface FooterProps {
    phoneNumber?: string;
    email?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
    location?: string;
}

export default function Footer({
    phoneNumber = "+977 9845371472",
    email = "yujanrai07@gmail.com",
    linkedinUrl = "https://www.linkedin.com/in/yujan-rai/",
    githubUrl = "https://github.com/yujanThulung",
    twitterUrl = "",
    location = "Kathmandu, Nepal",
}: FooterProps) {
    const [mounted, setMounted] = useState(false);
    const [currentYear] = useState(new Date().getFullYear());
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        const toggleVisibility = () => setIsVisible(window.scrollY > 300);
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (!mounted) return null;

    // ✅ Always keep black footer
    const bgColor = "bg-black";
    const subTextColor = "text-gray-400";
    const borderColor = "border-gray-800";
    const hoverColor = "hover:bg-white/10";

    const socialLinks = [
        { icon: <Linkedin size={20} />, href: linkedinUrl, label: "LinkedIn", color: "hover:text-blue-400" },
        { icon: <Github size={20} />, href: githubUrl, label: "GitHub", color: "hover:text-gray-400" },
        { icon: <Twitter size={20} />, href: twitterUrl, label: "Twitter", color: "hover:text-sky-400" },
    ];

    const contactInfo = [
        { icon: <Phone size={18} />, value: phoneNumber, href: `tel:${phoneNumber}` },
        { icon: <Mail size={18} />, value: email, href: `mailto:${email}` },
        { icon: <MapPin size={18} />, value: location, href: "#" },
    ];

    const quickLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer className={`relative ${bgColor} border-t ${borderColor} text-white`}>
            {/* Background accents */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 left-1/4 w-64 h-64 rounded-full bg-orange-500 blur-3xl opacity-10" />
                <div className="absolute -bottom-32 right-1/4 w-64 h-64 rounded-full bg-purple-500 blur-3xl opacity-10" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Call To Action */}
                <motion.div
                    className="text-center border-b border-gray-800 py-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        <span className="text-white">Let&apos;s Build Something </span>
                        <span className="text-orange-500">Amazing </span>
                        <span className="text-white">Together</span>
                    </h2>

                    <p className={`${subTextColor} text-lg max-w-2xl mx-auto mb-8`}>
                        Ready to bring your ideas to life? Let’s create something extraordinary.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href={`mailto:${email}`}
                            className="group px-8 py-4 rounded-2xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 shadow-lg flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail size={20} />
                            Hire Me
                            <motion.div
                                className="ml-1"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ExternalLink size={16} />
                            </motion.div>
                        </motion.a>

                        <motion.a
                            href={`tel:${phoneNumber}`}
                            className="group px-6 py-4 rounded-2xl font-medium border-2 border-gray-700 text-gray-300 hover:border-orange-400 hover:text-orange-400 transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Phone size={18} />
                            Call Now
                        </motion.a>
                    </div>
                </motion.div>

                {/* Main Footer Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Yujan Rai</h3>
                        <p className={`${subTextColor} mb-6`}>
                            Full-Stack Developer passionate about creating impactful digital experiences.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-xl ${hoverColor} transition-all ${subTextColor} ${social.color} border ${borderColor}`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-6">Get In Touch</h4>
                        <div className="space-y-4">
                            {contactInfo.map((contact, i) => (
                                <motion.a
                                    key={i}
                                    href={contact.href}
                                    className={`flex items-center gap-3 ${subTextColor} hover:text-orange-500 transition-colors duration-300`}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className={`p-2 rounded-lg ${hoverColor}`}>{contact.icon}</div>
                                    <span className="text-sm">{contact.value}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-6">Quick Links</h4>
                        <div className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    className={`block ${subTextColor} hover:text-orange-500 text-sm transition-colors duration-300`}
                                    whileHover={{ x: 5 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <h4 className="font-semibold mb-6">Availability</h4>
                        <div className="p-4 rounded-2xl border border-gray-800 bg-white/5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                                <span className="font-medium text-sm text-white">
                                    Available for work
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Currently accepting new projects and opportunities for {currentYear}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar size={12} />
                                <span>Response time: within 24 hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 py-6">
                    <div>© {currentYear} Yujan Rai. Built with Next.js</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-orange-500 transition">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Scroll To Top */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`fixed bottom-8 right-8 p-3 rounded-2xl border ${borderColor} ${hoverColor} transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ArrowUp size={20} className="text-white" />
            </motion.button>
        </footer>
    );
}
