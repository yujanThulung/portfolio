export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    features: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    category: 'web' | 'mobile' | 'ai' | 'other';
}


export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    type: 'work' | 'education' | 'position' | 'intern' | 'other';
}

export interface Skill {
    category: string;
    items: string[];
}

export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string;
}