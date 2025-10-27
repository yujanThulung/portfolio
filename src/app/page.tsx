import HeroSection from "@/components/hero/HeroSection";
import ProjectsSection from "@/components/projectsSection/ProjectsSection";
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
    company: "Web Studio Nepal",
    role: "Frontend Intern",
    period: "Aug 2025 – Oct 2025",
    location: "Kathmandu, Nepal",
    type: "internship" as const,
    website: "#",
    description: [
      "Learned to write best practice, optimize, and secure code",
      "Worked on real-world frontend projects using React and Next.js",
      "Collaborated with team members to deliver responsive and dynamic web interfaces"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Redux Toolkit", "TanStack Query"],
    achievements: [
      "Completed internship project successfully with optimized and maintainable code",
      "Gained hands-on experience in professional frontend development workflow"
    ]
  },
  {
    id: "2",
    company: "Salyansthan Secondary School",
    role: "Teacher (Math & Science, Grades 1-5)",
    period: "2023 - 2024",
    location: "Kathmandu, Nepal",
    type: "part-time" as const,
    description: [
      "Taught Math and Science to Grades 1 to 5 using engaging and interactive methods",
      "Delivered customized lessons to support students' diverse needs"
    ],
    technologies: [],
    achievements: [
      "Improved student engagement and learning outcomes through tailored teaching methods",
      "Developed creative lesson plans for primary education"
    ]
  },
  // {
  //   id: "1",
  //   company: "TechCorp Inc.",
  //   role: "Senior Frontend Developer",
  //   period: "2022 - Present",
  //   location: "San Francisco, CA",
  //   type: "full-time" as const,
  //   website: "https://techcorp.com",
  //   description: [
  //     "Lead the development of responsive web applications using React, Next.js, and TypeScript",
  //     "Collaborate with UX designers to implement pixel-perfect interfaces and improve user experience",
  //     "Mentor junior developers and conduct code reviews to maintain code quality standards",
  //     "Optimize application performance, reducing load times by 40% through code splitting and lazy loading"
  //   ],
  //   technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest"],
  //   achievements: [
  //     "Reduced bundle size by 60% through advanced code splitting",
  //     "Improved Lighthouse score from 75 to 95+",
  //     "Led migration from legacy Angular to React, improving developer productivity"
  //   ]
  // },
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
        <ProjectsSection />
      </div>
      <div className="h-[100vh]" />
      <div className="relative z-0">
        <SkillShowcase skills={skills} />
        <ExperienceSection experiences={sampleExperiences} />
      </div>
    </div>
  );
}
