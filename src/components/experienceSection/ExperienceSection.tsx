"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink, ChevronRight, Award, Clock, Users, Code } from "lucide-react";

import HighlightText from "../ui/HighlightText";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
  logo?: string;
  website?: string;
  achievements?: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-neutral-900" : "bg-gray-100";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const borderColor = isDark ? "border-gray-800" : "border-gray-200";

  const getTypeColor = (type: Experience['type']) => {
    const colors = {
      'full-time': isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-500/20 text-green-700 border-green-500/30',
      'part-time': isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-500/20 text-blue-700 border-blue-500/30',
      'contract': isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-500/20 text-purple-700 border-purple-500/30',
      'freelance': isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-500/20 text-orange-700 border-orange-500/30',
      'internship': isDark
  ? 'bg-teal-500/20 text-teal-400 border-teal-500/30'
  : 'bg-teal-500/20 text-teal-700 border-teal-500/30'

    };
    return colors[type];
  };

  return (
    <section className={`relative w-full min-h-screen py-20 px-6 sm:px-12 lg:px-24 overflow-hidden ${bgColor}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            x: mousePosition.x * -0.005,
            y: mousePosition.y * -0.005,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </motion.div>

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? 'bg-purple-400/20' : 'bg-orange-400/20'
            }`}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251,146,60,0.4) 0%, transparent 70%)',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex justify-betweentext-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HighlightText firstText="Work" orangeText=" Experience" size="4xl" />
          <p className={`${subTextColor} mt-4 text-lg text-center max-w-2xl mx-auto`}>
            My professional journey through the tech industry, building innovative solutions and growing with each challenge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company List - Vertical Timeline */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`rounded-2xl p-6 backdrop-blur-sm border ${borderColor} sticky top-24`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-orange-500/20 text-orange-600'
                }`}>
                  <Clock size={20} />
                </div>
                <h3 className={`font-semibold ${textColor}`}>Timeline</h3>
              </div>
              
              <div className="space-y-2">
                {experiences.map((experience, index) => (
                  <motion.button
                    key={experience.id}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      activeTab === index
                        ? isDark 
                          ? 'bg-purple-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10' 
                          : 'bg-orange-500/20 border border-orange-500/30 shadow-lg shadow-orange-500/10'
                        : `hover:bg-gray-500/10 ${borderColor} border`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activeTab === index 
                          ? isDark ? 'bg-purple-400' : 'bg-orange-500'
                          : isDark ? 'bg-gray-500' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm truncate ${
                          activeTab === index 
                            ? isDark ? 'text-purple-400' : 'text-orange-600'
                            : textColor
                        }`}>
                          {experience.company}
                        </h4>
                        <p className={`text-xs truncate ${subTextColor} mt-1`}>
                          {experience.role}
                        </p>
                        <p className={`text-xs ${subTextColor} mt-1`}>
                          {experience.period}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Details */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-8 backdrop-blur-sm border ${borderColor}`}
              >
                {experiences.map((experience, index) => (
                  index === activeTab && (
                    <div key={experience.id} className="space-y-6">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className={`p-3 rounded-2xl ${
                              isDark ? 'bg-white/5' : 'bg-black/5'
                            }`}>
                              <Code size={24} className={isDark ? 'text-purple-400' : 'text-orange-500'} />
                            </div>
                            <div>
                              <h3 className={`text-2xl font-bold ${textColor}`}>
                                {experience.role}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-lg font-semibold ${
                                  isDark ? 'text-purple-400' : 'text-orange-500'
                                }`}>
                                  {experience.company}
                                </span>
                                {experience.website && (
                                  <a
                                    href={experience.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1 rounded-lg transition-colors ${
                                      isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                                    }`}
                                  >
                                    <ExternalLink size={16} className={subTextColor} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className={subTextColor} />
                              <span className={`text-sm ${subTextColor}`}>{experience.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className={subTextColor} />
                              <span className={`text-sm ${subTextColor}`}>{experience.location}</span>
                            </div>
                            <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getTypeColor(experience.type)}`}>
                              {experience.type.replace('-', ' ')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-4">
                        <h4 className={`font-semibold flex items-center gap-2 ${textColor}`}>
                          <ChevronRight size={16} className={isDark ? 'text-purple-400' : 'text-orange-500'} />
                          Role Overview
                        </h4>
                        <ul className="space-y-3">
                          {experience.description.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`flex items-start gap-3 text-sm ${subTextColor}`}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                                isDark ? 'bg-purple-400' : 'bg-orange-500'
                              }`} />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div className="space-y-4">
                          <h4 className={`font-semibold flex items-center gap-2 ${textColor}`}>
                            <Award size={16} className={isDark ? 'text-purple-400' : 'text-orange-500'} />
                            Key Achievements
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {experience.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-3 rounded-xl border ${
                                  isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-gray-200'
                                }`}
                              >
                                <p className={`text-sm ${subTextColor}`}>{achievement}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="space-y-4">
                        <h4 className={`font-semibold flex items-center gap-2 ${textColor}`}>
                          <Users size={16} className={isDark ? 'text-purple-400' : 'text-orange-500'} />
                          Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, idx) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                                isDark 
                                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                  : 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                              }`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: <Award size={24} />, value: `${experiences.length}+`, label: 'Roles' },
            { icon: <Clock size={24} />, value: '1+', label: 'Years Exp' },
            { icon: <Users size={24} />, value: '20+', label: 'Projects' },
            { icon: <Code size={24} />, value: '20+', label: 'Technologies' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className={`text-center p-6 rounded-2xl backdrop-blur-sm border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-gray-200'
              }`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
                isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-orange-500/20 text-orange-500'
              }`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold mb-1 ${textColor}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${subTextColor}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}