"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import GlassCard from "@/components/ui/GlassCard";
import HighlightText from "@/components/ui/HighlightText";

// Import Swiper styles
import "swiper/css";

export default function ServicesSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "UI/UX Design",
      images: [
        { src: "/images/service/landing1.jpg", alt: "UI/UX Design Project 1" },
        { src: "/images/ux-design-2.jpg", alt: "UI/UX Design Project 2" },
        { src: "/images/service/landing2.png", alt: "UI/UX Design Project 3" },
      ],
    },
    {
      title: "Web Design",
      images: [
        { src: "/images/service/landing1.jpg", alt: "Web Design Project 1" },
        { src: "/images/web-design-2.jpg", alt: "Web Design Project 2" },
        { src: "/images/service/landing1.jpg", alt: "Web Design Project 3" },
      ],
    },
    {
      title: "Landing Page",
      images: [
        { src: "/images/service/landing1.jpg", alt: "Landing Page Project 1" },
        { src: "/images/landing-page-2.jpg", alt: "Landing Page Project 2" },
        { src: "/images/service/landing2.png", alt: "Landing Page Project 3" },
      ],
    },
    {
      title: "Mobile App",
      images: [
        { src: "/images/service/landing1.jpg", alt: "Mobile App Project 1" },
        { src: "/images/mobile-app-2.jpg", alt: "Mobile App Project 2" },
        { src: "/images/service/landing2.png", alt: "Mobile App Project 3" },
      ],
    },
    {
      title: "Brand Identity",
      images: [
        { src: "/images/service/landing1.jpg", alt: "Brand Identity Project 1" },
        { src: "/images/brand-2.jpg", alt: "Brand Identity Project 2" },
        { src: "/images/service/landing2.png", alt: "Brand Identity Project 3" },
      ],
    },
  ];

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  return (
    <section className="min-h-screen rounded-4xl bg-gradient-to-br from-gray-500 to-black py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-left mb-12 px-10">
          <HighlightText
            firstText="My"
            orangeText=" Services"
            size="4xl"
          />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis<br />
            lacus nunc, posuere in justo vulputate, bibendum sodales
          </p>
        </div>

        {/* Swiper Slider with 3 Cards */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="services-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center py-4">
                  <GlassCard
                    title={service.title}
                    images={service.images}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Manual Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === activeIndex 
                    ? "w-8 h-3 bg-orange-500 rounded-full" 
                    : "w-3 h-3 bg-white/30 rounded-full hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .services-swiper {
          padding: 20px 0;
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