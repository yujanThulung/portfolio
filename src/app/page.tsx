import HeroSection from "@/components/hero/HeroSection";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import HighlightText from "@/components/ui/HighlightText";
import GlassCard from "@/components/ui/GlassCard";
import ServicesSection from "@/components/servicesSection/ServicesSection";
import SkillShowcase from "@/components/skillShowcase/SkillShowcase";


const imageList = [
  { src: "/images/yujan.png", alt: "Design 1" },
  { src: "/images/yujan.png", alt: "Design 2" },
  { src: "/images/service/landing1.jpg", alt: "Design 3" },
];

const skills = [
  { name: "HTML5", logo: "/images/skills/html.svg" },
  { name: "CSS3", logo: "/images/skills/CSS3.svg" },
  { name: "JavaScript", logo: "/images/skills/javascript.png" },
  { name: "TypeScript", logo: "/images/skills/typescript.svg" },
  { name: "Next.js", logo: "/images/skills/next.png" },
  { name: "React", logo: "/images/skills/react.svg" },
  { name: "Tailwind CSS", logo: "/images/skills/tailwind.svg" },
  { name: "Bootstrap", logo: "/images/skills/bootstrap.svg" },
  { name: "Node.js", logo: "/images/skills/Nodejs.svg" },
  { name: "Express.js", logo: "/images/skills/Expressjs.png" },
  { name: "PHP", logo: "/images/skills/php.svg" },
  { name: "Python", logo: "/images/skills/python.svg" },
  { name: "Flask", logo: "/images/skills/flask.svg" },
  { name: "MongoDB", logo: "/images/skills/mongoDb.svg" },
  { name: "MySQL", logo: "/images/skills/mysql.svg" },
  { name: "Git", logo: "/images/skills/git.svg" },
  { name: "Figma", logo: "/images/skills/figma.svg" },
  { name: "Adobe Photoshop", logo: "/images/skills/Adobe_Photoshop.svg" },
  { name: "Adobe Illustrator", logo: "/images/skills/Adobe_Illustrator.svg" },
];



export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with 95% viewport height */}
      <div className="h-[95vh] overflow-hidden">
        <HeroSection />
      </div>

      {/* ServicesSection overlapping the bottom 5% */}
      <div className="absolute top-[95vh] left-0 w-full z-2 bg-neutral-900">
        <ServicesSection />
      </div>
      <div className="h-[100vh]" />
      <div className="relative z-0">
        <SkillShowcase skills={skills} />
      </div>
    </div>
  );
}
