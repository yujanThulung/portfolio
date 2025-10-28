"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

import HighlightText from "../ui/HighlightText";

interface Skill {
  name: string;
  logo: string;
}

interface SkillShowcaseProps {
  title?: string;
  skills: Skill[];
}

interface Position {
  x: number;
  y: number;
}

export default function SkillShowcase({ skills }: SkillShowcaseProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [randomPositions, setRandomPositions] = useState<Position[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCursorInSection, setIsCursorInSection] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Generate non-overlapping random positions
    const generateRandomPositions = () => {
      const positions: Position[] = [];
      const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;

      for (let i = 0; i < skills.length; i++) {
        let position: Position;
        let attempts = 0;
        let validPosition = false;

        while (!validPosition && attempts < 100) {
          position = {
            x: (Math.random() - 0.5) * (screenWidth - 300),
            y: (Math.random() - 0.5) * (screenHeight - 300),
          };

          validPosition = positions.every((existingPos) => {
            const distance = Math.sqrt(
              Math.pow(position.x - existingPos.x, 2) +
              Math.pow(position.y - existingPos.y, 2)
            );
            return distance > 150;
          });

          if (validPosition) {
            positions.push(position);
            break;
          }
          attempts++;
        }

        if (!validPosition) {
          const angle = (i / skills.length) * 2 * Math.PI;
          const radius = 200 + (i % 3) * 50;
          positions.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
          });
        }
      }

      setRandomPositions(positions);
    };

    generateRandomPositions();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [skills.length]);


  if (!mounted) return null;

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-neutral-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-600";

  // Create circular arrangement positions
  const createCircularArrangement = (items: Skill[], radius: number) => {
    return items.map((skill, index) => {
      const angle = (index / items.length) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { skill, x, y, angle };
    });
  };

  const initialSkills = skills.slice(0, 8);
  const remainingSkills = skills.slice(8);

  const normalSkills = createCircularArrangement(initialSkills, 120);
  const remainingSkillsNormal = createCircularArrangement(remainingSkills, 160);

  return (
    <section
      id="skill"
      className={`relative w-full min-h-screen py-20 px-6 sm:px-12 lg:px-24 overflow-hidden ${bgColor}`}
      onMouseEnter={() => setIsCursorInSection(true)}
      onMouseLeave={() => setIsCursorInSection(false)}
    >
      {/* Cursor-responsive Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid with enhanced hover effects */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isCursorInSection ? 0.4 : 0.3,
            scale: isCursorInSection ? 1.05 : 1,
            x: mousePosition.x * (isCursorInSection ? -0.02 : -0.01),
            y: mousePosition.y * (isCursorInSection ? -0.02 : -0.01),
          }}
          transition={{
            type: "spring",
            stiffness: isCursorInSection ? 30 : 50,
            damping: 20
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Animated gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-purple-500/5"
            animate={{
              opacity: isCursorInSection ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Dynamic gradient spotlight that follows cursor */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
            scale: isCursorInSection ? 1.2 : 0.8,
            opacity: isCursorInSection ? 0.3 : 0.1,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30
          }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251,146,60,0.4) 0%, rgba(249,115,22,0.2) 50%, transparent 70%)',
          }}
        />

        {/* Enhanced Floating Particles with hover interaction */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-purple-400/40' : 'bg-orange-400/40'
              }`}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: mousePosition.x * (isCursorInSection ? 0.03 : 0.02) + (Math.random() * 40 - 20),
              y: mousePosition.y * (isCursorInSection ? 0.03 : 0.02) + (Math.random() * 40 - 20),
              opacity: isCursorInSection ? [0.5, 1, 0.5] : [0.3, 0.8, 0.3],
              scale: isCursorInSection ? 1.5 : 1,
            }}
            transition={{
              duration: isCursorInSection ? 2 + Math.random() : 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Pulse rings that emanate from cursor */}
        {isCursorInSection && (
          <>
            <motion.div
              className="absolute w-8 h-8 rounded-full border-2 opacity-0"
              animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: [1, 3, 1],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                borderColor: isDark ? 'rgba(168,85,247,0.5)' : 'rgba(251,146,60,0.5)',
              }}
            />
            <motion.div
              className="absolute w-8 h-8 rounded-full border-2 opacity-0"
              animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: [1, 4, 1],
                opacity: [0.3, 0, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                borderColor: isDark ? 'rgba(99,102,241,0.5)' : 'rgba(249,115,22,0.5)',
              }}
            />
          </>
        )}

        {/* Background particles that react to hover */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isCursorInSection
              ? isDark
                ? 'radial-gradient(ellipse at center, rgba(168,85,247,0.05) 0%, transparent 50%)'
                : 'radial-gradient(ellipse at center, rgba(251,146,60,0.05) 0%, transparent 50%)'
              : 'transparent',
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center">
          <HighlightText firstText="My" orangeText=" Skills" size="4xl" />
          <p className={`${subTextColor} mt-4`}>The digital toolbox that powers my creativity and problem-solving.</p>
        </motion.div>

        {/* Circular Skill Showcase */}
        <div className="relative h-96 mb-28 pt-12 flex items-center justify-center">
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Center Circle */}
            <motion.div
              className="absolute inset-0 m-auto w-32 h-32 rounded-full backdrop-blur-sm border-2 shadow-lg flex items-center justify-center cursor-pointer z-20"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              }}
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
              transition={{
                scale: { type: "spring", stiffness: 300 }
              }}
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="text-xs font-medium text-center">
                <HighlightText firstText="Tech" orangeText=" Stacks" />
              </div>
            </motion.div>

            {/* Initial Skills (first 8) */}
            {initialSkills.map((skill, index) => {
              const normalPosition = normalSkills[index];
              const randomPosition = randomPositions[index] || { x: 0, y: 0 };

              return (
                <motion.div
                  key={skill.name}
                  className="absolute top-1/2 left-1/2 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={{
                    x: isHovered ? randomPosition.x : normalPosition.x - 40,
                    y: isHovered ? randomPosition.y : normalPosition.y - 40,
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isHovered ? index * 0.03 : index * 0.1,
                    type: "spring",
                    stiffness: isHovered ? 200 : 300,
                    damping: 25,
                  }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-2xl backdrop-blur-sm border shadow-lg flex flex-col items-center justify-center cursor-pointer group relative"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                    }}
                    whileHover={{
                      scale: 1.3,
                      y: -5,
                      zIndex: 50,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      },
                    }}
                    animate={{
                      x: isHovered
                        ? [0, Math.random() * 8 - 4]
                        : [0, Math.cos(normalPosition.angle) * 5],
                      y: isHovered
                        ? [0, Math.random() * 8 - 4]
                        : [0, Math.sin(normalPosition.angle) * 5],
                    }}
                    transition={{
                      duration: isHovered ? 4 : 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2,
                    }}
                  >
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={32}
                      height={32}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />

                    <motion.span
                      className={`text-xs font-medium ${textColor} text-center mt-1`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.name}
                    </motion.span>

                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-purple-500/20"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{
                        scale: isHovered ? 1.3 : 1,
                        opacity: isHovered ? 0.4 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Remaining Skills (only show on hover) */}
            {remainingSkills.map((skill, index) => {
              const absoluteIndex = index + 8;
              const normalPosition = remainingSkillsNormal[index];
              const randomPosition = randomPositions[absoluteIndex] || { x: 0, y: 0 };

              return (
                <motion.div
                  key={skill.name}
                  className="absolute top-1/2 left-1/2 z-5"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0,
                    x: isHovered ? randomPosition.x : normalPosition.x - 32,
                    y: isHovered ? randomPosition.y : normalPosition.y - 32,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: isHovered ? (index * 0.02) + 0.2 : 0,
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-xl backdrop-blur-sm border shadow-md flex flex-col items-center justify-center cursor-pointer group relative"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)',
                      borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
                    }}
                    whileHover={{
                      scale: 1.2,
                      y: -3,
                      zIndex: 40,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                      },
                    }}
                    animate={{
                      x: isHovered
                        ? [0, Math.random() * 6 - 3]
                        : [0, Math.cos(normalPosition.angle) * 4],
                      y: isHovered
                        ? [0, Math.random() * 6 - 3]
                        : [0, Math.sin(normalPosition.angle) * 4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: absoluteIndex * 0.15,
                    }}
                  >
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={24}
                      height={24}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />

                    <motion.span
                      className={`text-xs font-medium ${textColor} text-center mt-1`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.name}
                    </motion.span>

                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/15 to-purple-500/15"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{
                        scale: isHovered ? 1.2 : 1,
                        opacity: isHovered ? 0.3 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Hover Instruction */}
            <motion.div
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`text-sm ${subTextColor} flex items-center gap-2`}>
                <span>Hover to explore all {skills.length} skills</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Marquee Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col gap-8 lg:hidden">
            <Marquee speed={50} pauseOnHover gradient={false}>
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center mx-6 min-w-[5rem]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div
                    className="w-16 h-16 rounded-xl backdrop-blur-sm border shadow-md flex items-center justify-center mb-3"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    }}
                  >
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <span className={`text-xs font-medium ${textColor}`}>
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
}