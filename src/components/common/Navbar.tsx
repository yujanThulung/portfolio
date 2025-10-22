"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navLinks";
import ThemeSwitch from "@/components/common/ThemeSwitch";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()?.replace(/\/$/, "") || "/";
  const [hovered, setHovered] = useState(false);

  return (
    <nav className="font-sans font-light fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[80%] lg:w-[75%] bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-full shadow-lg transition-colors duration-300">
      {/* Add responsive padding wrapper */}
      <div className="px-6 sm:px-10 py-2 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
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
            {/* Circle with initials */}
            <div className="bg-orange-500 text-black font-light rounded-full px-3 py-2 text-sm">
              YR
            </div>

            {/* Animated text */}
            <motion.div
              className="font-light tracking-wide text-gray-900 dark:text-white"
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
    </nav>
  );
}
