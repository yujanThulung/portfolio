import HeroSection from "@/components/hero/HeroSection";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import HighlightText from "@/components/ui/HighlightText";
import GlassCard from "@/components/ui/GlassCard";


const imageList = [
    { src: "/images/yujan.png", alt: "Design 1" },
    { src: "/images/yujan.png", alt: "Design 2" },
    { src: "/images/service/landing1.jpg", alt: "Design 3" },
  ];

export default function Home() {
  return (
    <>
      <HeroSection />
      <Button leftIcon={<ArrowRight />} rightIcon={<Mail />} variant="solid">
        Solid Button
      </Button>
      <HighlightText firstText="Why" orangeText="Hire me?" size="5xl" />
      <div className="bg-amber-300 p-6">
      <GlassCard title="Web Design" images={imageList} />
      </div>

    </>
  );
}
