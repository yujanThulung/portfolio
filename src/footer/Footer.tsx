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
  ExternalLink
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
  location = "Kathmandu, Nepal"
}: FooterProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Scroll to top visibility
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!mounted) return null;

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-neutral-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const borderColor = isDark ? "border-gray-800" : "border-gray-200";
  const hoverColor = isDark ? "hover:bg-white/10" : "hover:bg-black/10";

  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      href: linkedinUrl,
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: <Github size={20} />,
      href: githubUrl,
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      icon: <Twitter size={20} />,
      href: twitterUrl,
      label: "Twitter",
      color: "hover:text-sky-400"
    }
  ];

  const contactInfo = [
    {
      icon: <Phone size={18} />,
      value: phoneNumber,
      href: `tel:${phoneNumber}`,
      label: "Call me"
    },
    {
      icon: <Mail size={18} />,
      value: email,
      href: `mailto:${email}`,
      label: "Email me"
    },
    {
      icon: <MapPin size={18} />,
      value: location,
      href: "#",
      label: "Location"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className={`relative ${bgColor} border-t ${borderColor}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className={`absolute -top-32 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-5 ${
          isDark ? 'bg-purple-500' : 'bg-orange-500'
        }`} />
        <div className={`absolute -bottom-32 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-5 ${
          isDark ? 'bg-blue-500' : 'bg-purple-500'
        }`} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        {/* CTA Section */}
        <motion.div 
          className="text-center py-16 border-b border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-3xl sm:text-4xl font-bold ${textColor} mb-6`}>
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
              Amazing
            </span>{" "}
            Together
          </h2>
          <p className={`${subTextColor} text-lg max-w-2xl mx-auto mb-8`}>
            Ready to bring your ideas to life? Let's discuss how we can create something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href={`mailto:${email}`}
              className={`group relative px-8 py-4 rounded-2xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Hire me
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
              className={`group px-6 py-4 rounded-2xl font-medium border-2 ${
                isDark 
                  ? 'border-gray-700 text-gray-300 hover:border-orange-400 hover:text-orange-400' 
                  : 'border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500'
              } transition-all duration-300 flex items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={18} />
              Call Now
            </motion.a>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className={`text-xl font-bold ${textColor} mb-4`}>
              Yujan Rai
            </h3>
            <p className={`${subTextColor} mb-6 leading-relaxed`}>
              Full-Stack Developer passionate about creating digital experiences 
              that make a difference. Let's build the future together.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl ${hoverColor} transition-all duration-300 ${subTextColor} ${social.color} border ${borderColor}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className={`font-semibold ${textColor} mb-6`}>Get In Touch</h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  className={`flex items-center gap-3 ${subTextColor} hover:text-orange-500 transition-colors duration-300 group`}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`p-2 rounded-lg ${hoverColor} group-hover:bg-orange-500/20 transition-colors`}>
                    {contact.icon}
                  </div>
                  <span className="text-sm">{contact.value}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className={`font-semibold ${textColor} mb-6`}>Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`block ${subTextColor} hover:text-orange-500 transition-colors duration-300 text-sm`}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className={`font-semibold ${textColor} mb-6`}>Availability</h4>
            <div className={`p-4 rounded-2xl border ${borderColor} ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className={`font-medium ${textColor} text-sm`}>Available for work</span>
              </div>
              <p className={`${subTextColor} text-sm mb-4`}>
                Currently accepting new projects and opportunities for {currentYear}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} />
                <span>Response time: within 24 hours</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className={`py-6 border-t ${borderColor} flex flex-col md:flex-row justify-between items-center gap-4`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className={`text-sm ${subTextColor} text-center md:text-left`}>
            © {currentYear} Yujan Rai. All rights reserved. Built with Next.js
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className={`${subTextColor} hover:text-orange-500 transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`${subTextColor} hover:text-orange-500 transition-colors`}>
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-2xl border ${borderColor} ${hoverColor} transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: isVisible ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp size={20} className={textColor} />
      </motion.button>
    </footer>
  );
}