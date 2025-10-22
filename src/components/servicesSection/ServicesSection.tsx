"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import GlassCard from "@/components/ui/GlassCard";
import HighlightText from "@/components/ui/HighlightText";
import "swiper/css";

export default function ServicesSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "UI/UX Design",
      images: [
        { src: "/images/service/landing1.jpg" },
        { src: "/images/ux-design-2.jpg" },
        { src: "/images/service/landing2.png" },
      ],
    },
    {
      title: "Web Design",
      images: [
        { src: "/images/service/landing1.jpg" },
        { src: "/images/web-design-2.jpg" },
        { src: "/images/service/landing1.jpg" },
      ],
    },
    {
      title: "Landing Page",
      images: [
        { src: "/images/service/landing1.jpg" },
        { src: "/images/landing-page-2.jpg" },
        { src: "/images/service/landing2.png" },
      ],
    },
    {
      title: "Mobile App",
      images: [
        { src: "/images/service/landing1.jpg" },
        { src: "/images/mobile-app-2.jpg" },
        { src: "/images/service/landing2.png" },
      ],
    },
    {
      title: "Brand Identity",
      images: [
        { src: "/images/service/landing1.jpg" },
        { src: "/images/brand-2.jpg" },
        { src: "/images/service/landing2.png" },
      ],
    },
  ];

  const handleSlideChange = (swiper: SwiperType) => setActiveIndex(swiper.realIndex);

  const goToSlide = (index: number) => swiperInstance?.slideToLoop(index);

  return (
    <section
      className="min-h-screen rounded-4xl bg-gradient-to-br from-gray-600 to-black py-20 px-8 sm:px-12 md:px-24 lg:px-36 xl:px-48"
      style={{
        backgroundImage: "url('/images/bg.jpg')",
      }}>
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-16">
          <div className="flex-shrink-0">
            <HighlightText firstText="My" orangeText=" Services" size="4xl" />
          </div>
          <p className="text-gray-300 text-lg md: md:max-w-xl leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus nunc,
            posuere in justo vulputate, bibendum sodales.
          </p>
        </div>

        {/* Swiper Section */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            centeredSlides
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="services-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center py-2">
                  <GlassCard title={service.title} images={service.images} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {services.map((_, index) => (
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

      {/* Styles */}
      <style jsx global>{`
        .services-swiper {
          padding: 10px 0;
        }
        .services-swiper .swiper-slide {
          transition: transform 0.3s ease;
        }
        .services-swiper .swiper-slide-active {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
