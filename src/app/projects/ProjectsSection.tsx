"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import GlassCard from "@/components/ui/GlassCard";
import HighlightText from "@/components/ui/HighlightText";
import { projects } from "@/data/projects";
import "swiper/css";

export default function ProjectsSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => setActiveIndex(swiper.realIndex);
  const goToSlide = (index: number) => swiperInstance?.slideToLoop(index);

  return (
    <section
      id="projects"
      className="min-h-screen rounded-4xl bg-gradient-to-br from-gray-600 to-black py-20 px-8 sm:px-12 md:px-24 lg:px-36 xl:px-48"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 mb-16">
          <div className="flex-shrink-0">
            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-6 mb-16">
              <div
                className="font-semibold font-urbanist tracking-wide text-center md:text-left text-4xl sm:text-5xl md:text-6xl transition-colors duration-300"
              >
                <span className="text-white">My </span>
                <span className="text-orange-500 font-bold">Projects</span>
              </div>
            </div>
          </div>
          <p className="text-gray-300 font-light text-sm md:max-w-xl leading-relaxed text-center md:text-center">
            I specialize in creating engaging digital experiences that bring ideas to life.
          </p>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            centeredSlides
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="projects-swiper"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center py-2">
                  <Link href={`/projects/${project.slug}`}>
                    <GlassCard title={project.title} images={project.images} />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="flex justify-center gap-3 mt-10">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${index === activeIndex
                  ? "w-8 h-3 bg-orange-500 rounded-full"
                  : "w-3 h-3 bg-white/30 rounded-full hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        .projects-swiper {
          padding: 10px 0;
        }
        .projects-swiper .swiper-slide {
          transition: transform 0.3s ease;
        }
        .projects-swiper .swiper-slide-active {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}