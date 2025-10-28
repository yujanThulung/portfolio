export interface Project {
  slug: string;
  title: string;
  description: string;
  images: { src: string }[];
  technologies: string[];
  github: string;
  liveLink: string | null;
  status: "Completed" | "Ongoing";
  features: string[];
  goal?: string;
}

export const projects: Project[] = [
  {
    slug: "resume-craft",
    title: "ResumeCraft – AI-Powered Resume Builder",
    description: "Full-stack resume builder platform with AI-powered suggestions and customizable templates.",
    images: [
      { src: "/images/projects/landing1.jpg" },
      { src: "/images/projects/landing2.png" },
      { src: "/images/projects/landing1.jpg" },
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "TailwindCSS", "JWT", "OpenAI API"],
    github: "https://github.com/yujanThulung/ResumeCraft",
    liveLink: null,
    status: "Ongoing",
    features: [
      "User authentication (JWT)",
      "Multi-section resume editor",
      "Drag-and-drop layout",
      "AI-based resume suggestions",
      "ATS keyword optimization",
      "PDF export functionality"
    ],
    goal: "Build a scalable SaaS-ready platform with optional monetization features."
  },
  {
    slug: "nuro-stock",
    title: "NuroStock - Stock Price Prediction",
    description: "Stock market prediction platform using deep learning to forecast stock prices.",
    images: [
      { src: "/images/projects/nuro-stock-1.jpg" },
      { src: "/images/projects/nuro-stock-2.jpg" },
      { src: "/images/projects/nuro-stock-3.jpg" },
    ],
    technologies: ["React", "Zustand", "Node.js", "Express", "MongoDB", "Flask", "LSTM", "Socket.io"],
    github: "https://github.com/yujanThulung/StockProject",
    liveLink: null,
    status: "Completed",
    features: [
      "LSTM-based neural network predictions",
      "Interactive data visualization",
      "Real-time market statistics",
      "Smart watch-list feature",
      "Secure user authentication"
    ]
  },
  {
    slug: "roomix",
    title: "Roomix - Room Rental Management",
    description: "Modern system for renting rooms and flats with multi-role platform.",
    images: [
      { src: "/images/projects/roomix-1.jpg" },
      { src: "/images/projects/roomix-2.jpg" },
      { src: "/images/projects/roomix-3.jpg" },
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap 5", "JavaScript"],
    github: "https://github.com/yujanThulung/Roomix-Collage-project",
    liveLink: null,
    status: "Completed",
    features: [
      "Multi-role platform (tenants, landlords, admins)",
      "Property search by location & category",
      "Rent request system",
      "Admin panel for user management",
      "Responsive Bootstrap design"
    ]
  },
  {
    slug: "food-delivery",
    title: "Food Delivery Website",
    description: "Fully responsive food delivery application with real-time cost calculation.",
    images: [
      { src: "/images/projects/food-delivery-1.jpg" },
      { src: "/images/projects/food-delivery-2.jpg" },
      { src: "/images/projects/food-delivery-3.jpg" },
    ],
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    github: "https://github.com/yujanThulung/food-delivery",
    liveLink: "https://food-delivery-yujan.vercel.app/",
    status: "Completed",
    features: [
      "Fully responsive UI",
      "Food filtering by category & price",
      "Real-time cost calculation",
      "Component-based architecture",
      "Modern design adapts to all screens"
    ]
  }
];