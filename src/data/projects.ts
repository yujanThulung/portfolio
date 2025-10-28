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
        "slug": "nuro-stock",
        "title": "NuroStock - Stock Price Prediction",
        "description": "A smart stock prediction and alerting platform with real-time market visualization, AI-driven forecasts, and custom watchlists.",
        "images": [
            { "src": "/images/projects/stock/landing2.png" },
            { "src": "/images/projects/stock/landing3.png" },
            { "src": "/images/projects/stock/landing1.png" },
            { "src": "/images/projects/stock/dashboard1.png" },
            { "src": "/images/projects/stock/dashboard2.png" },
            { "src": "/images/projects/stock/dashboard3.png" }
        ],
        "technologies": ["React", "Zustand", "Tailwind", "Node.js", "Express", "MongoDB", "Socket.IO", "Flask", "Python", "LSTM", "ApexCharts"],
        "github": "https://github.com/yujanThulung/StockProject",
        "liveLink": null,
        "status": "Completed",
        "features": [
            "User authentication",
            "Real-time stock charts and volume",
            "AI-based stock price prediction using LSTM",
            "Watchlist and custom alerts",
            "Top gainers/losers overview",
            "Financials and analytics dashboard"
        ]
    },
    {
        slug: "roomix",
        title: "Roomix - Room Rental Management",
        description: "Modern system for renting rooms and flats with multi-role platform.",
        images: [
            { src: "/images/projects/roomix/landing2.png" },
            { src: "/images/projects/roomix/dashboard1.png" },
            { src: "/images/projects/roomix/landing1.png" },
            { src: "/images/projects/roomix/dashboard2.png" },
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
        "slug": "gpt-3",
        "title": "GPT-3 - AI-Powered Text Generation",
        "description": "A minimal React + Vite template integrating OpenAI's GPT-3 API for dynamic text generation.",
        "images": [
            { "src": "/images/projects/gpt/landing1.png" },
        ],
        "technologies": ["React", "Vite", "OpenAI API", "Tailwind CSS", "JavaScript"],
        "github": "https://github.com/yujanThulung/gpt3",
        "liveLink": "https://gpt3-git-main-yujan-rais-projects.vercel.app?_vercel_share=uf266JZSIOGyvf0n08o5jI9ngxeSYEVT",
        "status": "Completed",
        "features": [
            "Real-time text generation using GPT-3",
            "Responsive user interface",
            "Seamless integration with OpenAI API",
            "Minimal setup with Vite and React"
        ]
    },
    {
        slug: "food-delivery",
        title: "Food Delivery Website",
        description: "Fully responsive food delivery application with real-time cost calculation.",
        images: [
            { src: "/images/projects/food/login.png" },
            { src: "/images/projects/food/landing2.png" },
            { src: "/images/projects/food/landing1.png" },

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
    },
    {
        "slug": "desney-clone",
        "title": "DesneyClone - Streaming Platform Clone",
        "description": "A fully responsive Disney+ clone built with React and Vite, featuring dynamic movie listings, trailers, and user-friendly interface.",
        "images": [
            { "src": "/images/projects/disney/landing1.png" },
        ],
        "technologies": ["React", "Vite", "Tailwind CSS", "JavaScript", "HTML", "CSS", "TMDB API"],
        "github": "https://github.com/yujanThulung/desneyclone",
        "liveLink": "https://desneyclone.vercel.app",
        "status": "Completed",
        "features": [
            "Responsive UI for desktop and mobile",
            "Dynamic movie listings fetched from TMDB API",
            "Movie detail pages with trailers",
            "Search and filter functionality",
            "Smooth navigation and animations"
        ]
    }
];