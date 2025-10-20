import HeroSection from "@/components/hero/HeroSection";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight, Mail} from "lucide-react";
import HighlightText from "@/components/ui/HighlightText";
import GlassCard from "@/components/ui/GlassCard";


export default function Home() {
  return (
    <>
      <HeroSection/>
      <Button leftIcon={<ArrowRight />} rightIcon={<Mail />} variant="solid">
        Solid Button
      </Button>
      <HighlightText firstText="Why" orangeText="Hire me?" size="5xl"/>
      <GlassCard
      images={["/images/landing1.png", "/images/landing2.png"]}

      />

    </>
  );
}
