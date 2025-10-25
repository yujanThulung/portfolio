"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

// Reusable shake/hover animation variants
const hoverShakeVariants: Variants = {
  rest: {
    y: [0, -10, 10, -5, 5, 0],
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  },
  hover: {
    y: -200,
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-neutral-900" : "bg-white";
  const textColor = isDark ? "text-gray-100" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-700";
  const circleColor = isDark ? "bg-orange-300" : "bg-orange-400";
  const quoteIcon = isDark ? "/icons/quote-up-white.png" : "/icons/quote-up.png";
  const imageFilter = isDark
    ? "filter brightness-75 contrast-115"
    : "filter brightness-100 contrast-105";

  return (
    <section
      className={`relative w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-16 overflow-hidden transition-colors duration-500 ${bgColor}`}
    >
      {/* --- Top Heading Section --- */}
      <motion.div
        className="relative z-10 text-center font-urbanist font-semibold mt-10"
        animate={{
          y: isHovered ? 350 : 0,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          className={`inline-block px-3 py-0 border rounded-full text-sm font-medium mb-3 ${
            isDark ? "border-gray-600 text-gray-200" : "border-gray-300 text-gray-800"
          }`}
        >
          Hello!
        </div>

        {/* Decorative waves */}
        <motion.span
          className="absolute top-[-20px] right-54"
          variants={hoverShakeVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
        >
          <Image
            src="/icons/wave1.png"
            alt="wave1"
            width={30}
            height={30}
            priority
          />
        </motion.span>

        <motion.span
          className="absolute left-[-48px] top-44"
          variants={hoverShakeVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
        >
          <Image
            src="/icons/wave2.png"
            alt="wave2"
            width={64}
            height={64}
            priority
          />
        </motion.span>

        <h1 className={`text-5xl md:text-7xl leading-tight tracking-wider ${textColor}`}>
          I&apos;m{" "}
          <span className={`${isDark ? "text-orange-300" : "text-orange-400"}`}>
            YUJAN
          </span>
          , <br />
          Web Developer
        </h1>
      </motion.div>

      {/* --- Main Section --- */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 mt-10">
        {/* --- Left Quote --- */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-4 mb-[20rem] md:mb-[30rem]"
          variants={hoverShakeVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
        >
          <Image
            src={quoteIcon}
            alt="quote"
            width={64}
            height={64}
            className="mx-auto md:mx-0"
            priority
          />
          <p className={`max-w-sm mx-auto md:mx-0 italic ${subTextColor}`}>
            “Yujan’s exceptional web design ensures our project’s success. Highly recommended!”
          </p>
        </motion.div>

        {/* --- Center Image --- */}
        <div
          className="relative flex flex-col items-center justify-center mt-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`relative w-[28rem] h-[28rem] md:w-[34rem] md:h-[34rem] rounded-t-full ${circleColor} transition-colors duration-500`}
          ></div>

          {/* Animated Background Vector */}
          <motion.span
            className="absolute top-[-13rem] z-0"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.3 : 0.4,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src="/images/bgVector.png"
              alt="bgVector"
              width={1000}
              height={600}
              className="w-[55rem] md:w-[75rem]"
              priority
            />
          </motion.span>

          {/* Main Image */}
          <Image
            src="/images/yujan.png"
            alt="Yujan"
            width={820}
            height={820}
            priority
            className={`absolute -translate-y-80 z-10 object-cover scale-110 transition-transform duration-500 ${imageFilter}`}
          />
        </div>

        {/* --- Right Experience --- */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-2 mb-[20rem] md:mb-[30rem]"
          variants={hoverShakeVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
        >
          <div
            className={`flex justify-center md:justify-start gap-1 ${
              isDark ? "text-orange-300" : "text-orange-400"
            } text-xl`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold ${textColor}`}>10 Years</h2>
          <p className={`text-sm ${subTextColor}`}>Experience</p>
        </motion.div>
      </div>
    </section>
  );
}
