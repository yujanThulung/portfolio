"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  logo: string;
}

interface SkillShowcaseProps {
  title?: string;
  skills: Skill[];
}

export default function SkillShowcase({ title = "My Skills", skills }: SkillShowcaseProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const textColor = isDark ? "text-gray-200" : "text-gray-800";
  const subText = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <section
      className={`w-full py-16 px-6 sm:px-12 lg:px-24 transition-colors duration-500 ${
        isDark ? "bg-neutral-900" : "bg-neutral-50"
      }`}
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className={`${subText}`}>Tools, frameworks, and technologies I use</p>
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-10 justify-items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center gap-3"
          >
            {/* Hexagon Glass Container */}
            <div
              className={`
                relative w-24 h-24 md:w-28 md:h-28
                backdrop-blur-lg bg-white/10 dark:bg-gray-800/20
                border border-white/20 dark:border-gray-700/40
                rounded-md
                shadow-lg hover:shadow-2xl
                transition-all duration-300 hover:-translate-y-2
                [clip-path:polygon(25%_6.7%,_75%_6.7%,_100%_50%,_75%_93.3%,_25%_93.3%,_0%_50%)]
                flex items-center justify-center
                before:absolute before:inset-0 before:rounded-md before:bg-white/5 before:backdrop-blur-md before:pointer-events-none
              `}
              style={{ transform: "translateZ(0)" }}
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src={skill.logo}
                  alt={skill.name}
                  fill
                  className={`object-contain transition-transform duration-300 hover:scale-110 ${
                    isDark ? "brightness-90" : "brightness-100"
                  }`}
                  sizes="(max-width: 768px) 60px, 80px"
                />
              </div>
            </div>

            {/* Skill Label */}
            <p className={`text-sm md:text-base font-medium ${textColor}`}>
              {skill.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
