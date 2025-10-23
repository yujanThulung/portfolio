"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navLinks";
import ThemeSwitch from "@/components/common/ThemeSwitch";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname()?.replace(/\/$/, "") || "/";

  // detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        top: isScrolled ? 24 : 0,
        width: isScrolled ? "75%" : "100%",
        borderRadius: isScrolled ? 9999 : 0, // smooth radius change
        left: isScrolled ? "50%" : 0,
        x: isScrolled ? "-50%" : 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`fixed font-sans font-light z-50 shadow-lg 
        bg-white dark:bg-neutral-900 text-gray-900 dark:text-white
        overflow-hidden`} // prevent flicker during radius change
      style={{ transformOrigin: "top center" }}
    >
      {/* Inner Wrapper with Dynamic Padding */}
      <div
        className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "px-6 sm:px-10 py-2"
            : "px-10 sm:px-20 lg:px-32 py-6"
        }`}
      >
        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left Links */}
          <div className="flex items-center space-x-4">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 rounded-full font-light transition-colors duration-300 ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Center Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="bg-orange-500 text-black font-light rounded-full px-3 py-2 text-sm">
              YR
            </div>

            <motion.div
              className="font-light tracking-wide text-gray-900 dark:text-white overflow-hidden"
              initial={{ width: "3rem" }}
              animate={{ width: hovered ? "10rem" : "3rem" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {hovered ? (
                  <motion.span
                    key="full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="block whitespace-nowrap"
                  >
                    Yujan Thulung
                  </motion.span>
                ) : (
                  <motion.span
                    key="short"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="block"
                  >
                    YUJAN
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Links + ThemeSwitch */}
          <div className="flex items-center space-x-4">
            {navLinks.slice(3).map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 rounded-full font-light transition-colors duration-300 ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <ThemeSwitch />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-neutral-900 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-64 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-full font-light transition-colors duration-300 ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <ThemeSwitch />
        </div>
      </div>
    </motion.nav>
  );
}
