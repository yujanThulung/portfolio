"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { 
  FaArrowLeft, 
  FaGithub, 
  FaExternalLinkAlt, 
  FaRegCalendar,
  FaCode,
  FaRegCheckCircle,
  FaClock,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRocket
} from "react-icons/fa";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);

  const project = projects.find((p) => p.slug === slug);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (project) {
      setImageLoaded(new Array(project.images.length).fill(false));
    }
  }, [project]);

  if (!mounted) return null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        <p>Project not found.</p>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  // Theme-based styles
  const bgGradient = isDark 
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" 
    : "bg-gradient-to-br from-gray-50 via-white to-gray-100";
  
  const textColor = isDark ? "text-gray-100" : "text-gray-900";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";
  const cardBg = isDark ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const hoverBorder = isDark ? "hover:border-orange-500/50" : "hover:border-orange-400";

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % project.images.length);
    }
  };

  const goToPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + project.images.length) % project.images.length);
    }
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Corrected variant types
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number]
    }
  }
};


  const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8 
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number]
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: [0.55, 0.055, 0.675, 0.19] as [number, number, number, number]
    }
  }
};


  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      <section className={`min-h-screen ${bgGradient} ${textColor} px-4 sm:px-8 py-12 transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/#projects" 
              className="inline-flex items-center gap-3 text-orange-500 hover:text-orange-400 mb-8 transition-all duration-300 group"
            >
              <div className={`p-2 rounded-lg ${cardBg} ${borderColor} border group-hover:scale-110 transition-transform`}>
                <FaArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="font-medium">Back to Projects</span>
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {project.title}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${
                      project.status === "Ongoing" 
                        ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" 
                        : "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
                    }`}>
                      {project.status === "Ongoing" ? (
                        <FaClock className="w-4 h-4" />
                      ) : (
                        <FaRocket className="w-4 h-4" />
                      )}
                      {project.status}
                    </span>
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 ${textMuted} hover:text-orange-500 transition-all duration-300 hover:scale-105`}
                      >
                        <div className={`p-2 rounded-lg ${cardBg} ${borderColor} border`}>
                          <FaGithub className="w-4 h-4" />
                        </div>
                        GitHub
                      </a>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-all duration-300 hover:scale-105"
                        >
                          <div className={`p-2 rounded-lg ${cardBg} border border-orange-500/30`}>
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </div>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className={`text-lg leading-relaxed max-w-4xl ${textMuted}`}>
                {project.description}
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Project Images */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-orange-500 mb-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${cardBg} ${borderColor} border`}>
                  <FaCode className="w-5 h-5" />
                </div>
                Project Screenshots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((image, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group cursor-pointer transform transition-all duration-300"
                    onClick={() => openModal(i)}
                  >
                    <div className={`relative overflow-hidden rounded-xl shadow-2xl border ${borderColor} ${hoverBorder} transition-all duration-300`}>
                      <img
                        src={image.src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        onLoad={() => handleImageLoad(i)}
                      />
                      {!imageLoaded[i] && (
                        <div className={`absolute inset-0 animate-pulse ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <FaExternalLinkAlt className="w-8 h-8 mx-auto mb-2" />
                          <span className="font-medium">Click to enlarge</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <div className="space-y-8">
              {/* Technologies */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-orange-500 mb-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${cardBg} ${borderColor} border`}>
                    <FaStar className="w-5 h-5" />
                  </div>
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`px-4 py-2 rounded-lg ${cardBg} ${borderColor} border ${textMuted} hover:text-orange-500 transition-all duration-300 ${hoverBorder}`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-orange-500 mb-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${cardBg} ${borderColor} border`}>
                    <FaRegCheckCircle className="w-5 h-5" />
                  </div>
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className={`flex items-start gap-3 group p-3 rounded-lg transition-all duration-300 ${cardBg} ${borderColor} border`}
                      whileHover={{ x: 5 }}
                    >
                      <FaRegCheckCircle className="text-orange-500 mt-0.5 flex-shrink-0 w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-orange-500 transition-colors">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Project Goal */}
              {project.goal && (
                <motion.div variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-orange-500 mb-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cardBg} ${borderColor} border`}>
                      <FaRegCalendar className="w-5 h-5" />
                    </div>
                    Project Goal
                  </h2>
                  <div className={`rounded-xl p-6 border ${borderColor} ${cardBg} backdrop-blur-sm`}>
                    <p className={`leading-relaxed text-lg ${textMuted}`}>{project.goal}</p>
                  </div>
                </motion.div>
              )}

              {/* Project Links */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border ${borderColor} ${cardBg} hover:border-orange-500/50`}
                >
                  <FaGithub className="w-5 h-5" />
                  View Source Code
                </motion.a>
                {project.liveLink && (
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl transition-all duration-300 text-white shadow-lg hover:shadow-orange-500/25"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    Live Demo
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors z-10"
              >
                <FaTimes className="w-8 h-8" />
              </motion.button>

              {/* Navigation Buttons */}
              {project.images.length > 1 && (
                <>
                  <motion.button
                    onClick={goToPrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors z-10 bg-black/50 rounded-full p-4"
                  >
                    <FaChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    onClick={goToNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-500 transition-colors z-10 bg-black/50 rounded-full p-4"
                  >
                    <FaChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                {selectedImage + 1} / {project.images.length}
              </div>

              {/* Main Image */}
              <motion.img
                key={selectedImage}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                src={project.images[selectedImage].src}
                alt={`${project.title} screenshot ${selectedImage + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}