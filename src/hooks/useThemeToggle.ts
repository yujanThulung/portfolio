
import { useEffect, useState } from 'react'

export const useThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" ? "dark" : "light"
        }
        return "light"
    })

    useEffect(() => {
        const root = document.documentElement;
        if (theme == "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const toggleTheme = () => 
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    
    return {
        theme,
        toggleTheme
    };
}
