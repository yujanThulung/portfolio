"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
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
import { navLinks } from "@/data/navLinks"; 


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
    const { theme } = useTheme();
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

    const isDark = theme === "dark";

    // ✅ Always keep black footer
    const bgColor = "bg-black";
    const subTextColor = "text-gray-400";
    const borderColor = "border-gray-500";
    const hoverColor = isDark
        ? "hover:bg-orange-500 hover:text-white"
        : "hover:bg-orange-500 hover:text-gray-900";


    const recipient = "yujanrai03@gmail.com";
    const subject = encodeURIComponent("Project Inquiry / Hire Request");
    const body = encodeURIComponent(
        `Hi Yujan,\n\nI'm interested in working with you! Please let me know how we can proceed.\n\nRegards,\n[Your Name]`
    );

    // Gmail link (opens in new tab)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;


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
        { name: "About", href: "/about" },
        { name: "Skills", href: "/#skills" },
        { name: "Experience", href: "/#experience" },
        { name: "Projects", href: "/#projects" },
        { name: "Contact", href: "/#contact" },
    ];


    return (
        <footer id="#contact"
            className={`relative ${bgColor} border-t ${borderColor} text-white`} >
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
                            href={gmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-8 py-4 rounded-2xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 shadow-lg flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail size={20} />
                            Hire Me
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
                <div
                    className="
    px-6 sm:px-8 md:px-12 lg:px-16 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 
    gap-8 sm:gap-10 md:gap-12 
    py-12 md:py-16
  "
                >
                    {/* About */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-4">Yujan Rai</h3>
                        <p className={`${subTextColor} mb-6 max-w-md mx-auto sm:mx-0`}>
                            Full-Stack Developer passionate about creating impactful digital experiences.
                        </p>
                        <div className="flex justify-center sm:justify-start flex-wrap gap-4">
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
                    <div
                        className="text-center sm:text-left">
                        <h4 className="font-semibold mb-6">Get In Touch</h4>
                        <div className="space-y-4">
                            {contactInfo.map((contact, i) => (
                                <motion.a
                                    key={i}
                                    href={contact.href}
                                    className={`flex items-center justify-center sm:justify-start gap-3 ${subTextColor} hover:text-orange-500 transition-colors duration-300`}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className={`p-2 rounded-lg ${hoverColor}`}>{contact.icon}</div>
                                    <span className="text-sm">{contact.value}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                     {/* ✅ Quick Links from navLinks */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path} legacyBehavior>
                  <motion.a
                    className={`block ${subTextColor} hover:text-orange-500 text-sm transition-colors duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </Link>
              ))}
            </div>
          </div>


                    {/* Availability */}
                    <div className="text-center sm:text-left">
                        <h4 className="font-semibold mb-6">Availability</h4>
                        <div className="p-4 rounded-2xl border border-gray-800 bg-white/5">
                            <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                                <span className="font-medium text-sm text-white">Available for work</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Currently accepting new projects and opportunities for {currentYear}
                            </p>
                            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-500">
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


            {/* Floating Social Buttons */}
            <div className="fixed bottom-28 right-8 flex flex-col gap-3 z-50">
                <motion.a
                    href="https://www.linkedin.com/in/yujan-rai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border ${borderColor} transition-all duration-300 backdrop-blur-md
    ${isDark ? "bg-neutral-900/60 text-gray-300 hover:text-blue-400" : `bg-white/60 text-gray-700 ${hoverColor}`}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Linkedin size={20} />
                </motion.a>


                <motion.a
                    href="https://github.com/yujanThulung"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border ${borderColor} transition-all duration-300 backdrop-blur-md
    ${isDark ? "bg-neutral-900/60 text-gray-300 hover:text-gray-300" : `bg-white/60 text-gray-700 ${hoverColor}`}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Github size={20} />
                </motion.a>

            </div>

            {/* Scroll To Top Button */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`fixed bottom-8 right-8 p-3 rounded-2xl border ${borderColor} ${hoverColor} transition-all duration-300
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ArrowUp size={20} className={isDark ? "text-white" : "text-gray-700"} />
            </motion.button>

        </footer >
    );
}
