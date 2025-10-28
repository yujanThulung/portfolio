"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, Variants} from "framer-motion";
import {
  FaDownload,
  FaFilePdf,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaPrint
} from "react-icons/fa";

export default function ResumeSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  // Theme-based styles
  const bgColor = isDark ? "bg-gray-900" : "bg-gray-50";
  const textColor = isDark ? "text-gray-100" : "text-gray-900";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";
  const cardBg = isDark ? "bg-gray-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const hoverColor = isDark ? "hover:bg-gray-700" : "hover:bg-gray-100";

  const resumeUrl = "/Yujan_Rai_Resume.pdf";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Yujan-Rai-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.open(resumeUrl, '_blank');
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    console.error("Failed to load PDF");
  };

  return (
    <section className={`min-h-screen ${bgColor} ${textColor} px-4 sm:px-8 py-12 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              My Resume
            </h1>
            <p className={`text-lg ${textMuted} max-w-2xl mx-auto`}>
              Download or view my professional resume to learn more about my skills, experience, and qualifications.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl transition-all duration-300 text-white shadow-lg hover:shadow-orange-500/25"
            >
              <FaDownload className="w-5 h-5" />
              Download PDF
            </motion.button>

            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border ${borderColor} ${cardBg} hover:border-orange-500/50`}
            >
              <FaPrint className="w-5 h-5" />
              Open in New Tab
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Quick Info Sidebar */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 space-y-6"
          >
            <div className={`rounded-2xl p-6 ${cardBg} ${borderColor} border backdrop-blur-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'} border ${isDark ? 'border-orange-500/30' : 'border-orange-200'}`}>
                  <FaUser className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-orange-500">Contact Info</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-4 h-4 text-orange-500" />
                  <span className={textMuted}>yujanrai03@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="w-4 h-4 text-orange-500" />
                  <span className={textMuted}>9845371472</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="w-4 h-4 text-orange-500" />
                  <span className={textMuted}>Kathmandu, Nepal</span>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 ${cardBg} ${borderColor} border backdrop-blur-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'} border ${isDark ? 'border-orange-500/30' : 'border-orange-200'}`}>
                  <FaFilePdf className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-orange-500">Resume Details</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={textMuted}>File Size:</span>
                  <span className={textColor}>~2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Pages:</span>
                  <span className={textColor}>3 Pages</span>
                </div>
                <div className="flex justify-between">
                  <span className={textMuted}>Last Updated:</span>
                  <span className={textColor}>October 2025</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className={`rounded-2xl p-6 ${cardBg} ${borderColor} border backdrop-blur-sm`}>
              <h3 className="text-lg font-bold text-orange-500 mb-3">Quick Tips</h3>
              <ul className={`space-y-2 text-sm ${textMuted}`}>
                <li className="flex items-start gap-2">
                  <FaExternalLinkAlt className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>Click &quot;Open in New Tab&quot; for better viewing</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaDownload className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>Download to save a copy locally</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaPrint className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                  <span>Use browser print for physical copies</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* PDF Preview */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className={`rounded-2xl p-6 ${cardBg} ${borderColor} border backdrop-blur-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-3">
                  <FaFilePdf className="w-6 h-6" />
                  Resume Preview
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'} border ${isDark ? 'border-orange-500/30' : 'border-orange-200'}`}>
                  PDF Document
                </span>
              </div>

              {/* PDF Viewer */}
              <div className="relative">
                {isLoading && (
                  <div className={`absolute inset-0 flex items-center justify-center rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p className={textMuted}>Loading resume...</p>
                    </div>
                  </div>
                )}

                <div className={`rounded-xl overflow-hidden border-2 ${borderColor} shadow-2xl ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  <iframe
                    src={`${resumeUrl}#view=fitH`}
                    className="w-full h-[600px] sm:h-[700px] md:h-[800px]"
                    title="Yujan Rai Resume"
                    onLoad={handleLoad}
                    onError={handleError}
                  />
                </div>

                {/* Fallback Message */}
                {!isLoading && (
                  <div className="mt-4 text-center">
                    <p className={`text-sm ${textMuted}`}>
                      If the PDF doesn&apos;t load properly,{" "}
                      <button
                        onClick={handlePrint}
                        className="text-orange-500 hover:text-orange-400 underline transition-colors"
                      >
                        open it in a new tab
                      </button>
                      {" "}or{" "}
                      <button
                        onClick={handleDownload}
                        className="text-orange-500 hover:text-orange-400 underline transition-colors"
                      >
                        download it
                      </button>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Download CTA */}
        <motion.div
          variants={itemVariants}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 lg:hidden"
        >
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          >
            <FaDownload className="w-4 h-4" />
            <span>Download Resume</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}