export interface NavLink {
    name: string;
    path: string;
}


export const navLinks: NavLink[] = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Projects",
        path: "/#projects"
    },
    {
        name: "Expericence",
        path: "/#experience"
    },
    {
        name: "Resume",
        path: "/resume"
    },
    {
        name: "Contact",
        path: "/#contact"
    }
]