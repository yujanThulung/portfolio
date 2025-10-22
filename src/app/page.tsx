import HeroSection from "@/components/hero/HeroSection";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import HighlightText from "@/components/ui/HighlightText";
import GlassCard from "@/components/ui/GlassCard";
import ServicesSection from "@/components/servicesSection/ServicesSection";


const imageList = [
  { src: "/images/yujan.png", alt: "Design 1" },
  { src: "/images/yujan.png", alt: "Design 2" },
  { src: "/images/service/landing1.jpg", alt: "Design 3" },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with 95% viewport height */}
      <div className="h-[95vh] overflow-hidden">
        <HeroSection />
      </div>

      {/* ServicesSection overlapping the bottom 5% */}
      <div className="absolute top-[95vh] left-0 w-full">
        <ServicesSection />
      </div>
    </div>
  );
}
