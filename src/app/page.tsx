import HeroSection from "@/components/hero/HeroSection";
import ServicesSection from "@/components/servicesSection/ServicesSection";
import SkillShowcase from "@/components/skillShowcase/SkillShowcase";
import ExperienceSection from "@/components/experienceSection/ExperienceSection";


const skills = [
  { name: "HTML5", logo: "/images/skills/html.svg" },
  { name: "CSS3", logo: "/images/skills/CSS3.svg" },
  { name: "JavaScript", logo: "/images/skills/javascript.png" },
  { name: "TypeScript", logo: "/images/skills/typescript.svg" },
  { name: "Next.js", logo: "/images/skills/Nextjs.svg" },
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



const sampleExperiences = [
  {
    id: "1",
    company: "TechCorp Inc.",
    role: "Senior Frontend Developer",
    period: "2022 - Present",
    location: "San Francisco, CA",
    type: "full-time" as const,
    website: "https://techcorp.com",
    description: [
      "Lead the development of responsive web applications using React, Next.js, and TypeScript",
      "Collaborate with UX designers to implement pixel-perfect interfaces and improve user experience",
      "Mentor junior developers and conduct code reviews to maintain code quality standards",
      "Optimize application performance, reducing load times by 40% through code splitting and lazy loading"
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest"],
    achievements: [
      "Reduced bundle size by 60% through advanced code splitting",
      "Improved Lighthouse score from 75 to 95+",
      "Led migration from legacy Angular to React, improving developer productivity"
    ]
  },
  {
    id: "2",
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    location: "Remote",
    type: "full-time" as const,
    description: [
      "Developed and maintained full-stack applications using MERN stack",
      "Implemented real-time features using WebSockets and Socket.io",
      "Designed and deployed cloud infrastructure on AWS",
      "Worked closely with product team to deliver features on tight deadlines"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "AWS", "Docker"],
    achievements: [
      "Built MVP from scratch that secured Series A funding",
      "Scaled application to handle 10k+ concurrent users",
      "Reduced server costs by 30% through infrastructure optimization"
    ]
  },
  {
    id: "3",
    company: "Freelance Projects",
    role: "Web Developer",
    period: "2019 - 2020",
    location: "Remote",
    type: "freelance" as const,
    description: [
      "Developed custom websites and web applications for various clients",
      "Implemented responsive designs and cross-browser compatibility",
      "Provided ongoing maintenance and support services",
      "Collaborated with clients to understand requirements and deliver solutions"
    ],
    technologies: ["JavaScript", "Vue.js", "PHP", "WordPress", "CSS3", "MySQL"],
    achievements: [
      "Delivered 15+ projects with 100% client satisfaction",
      "Maintained long-term relationships with 80% of clients",
      "Improved client website performance by average of 50%"
    ]
  }
];



export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with 95% viewport height */}
      <div className="h-[100vh] overflow-hidden">
        <HeroSection />
      </div>

      {/* ServicesSection overlapping the bottom 5% */}
      <div className="absolute top-[95vh] left-0 w-full z-10 bg-neutral-900">
        <ServicesSection />
      </div>
      <div className="h-[100vh]" />
      <div className="relative z-0">
        <SkillShowcase skills={skills} />
        <ExperienceSection experiences={sampleExperiences} />
      </div>
    </div>
  );
}
