"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface HighlightTextProps {
  firstText: string;
  orangeText?: string;
  lastText?: string;
  size?: "sm" | "md" | "lg" | "3xl" | "4xl" | "5xl";
}

export default function HighlightText({
  firstText,
  orangeText,
  lastText,
  size = "md",
}: HighlightTextProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const sizeClass = clsx({
    "text-sm sm:text-base": size === "sm",
    "text-md sm:text-lg": size === "md",
    "text-lg sm:text-xl": size === "lg",
    "text-3xl sm:text-4xl": size === "3xl",
    "text-4xl sm:text-5xl": size === "4xl",
    "text-5xl sm:text-6xl": size === "5xl",
  });

  const baseTextColor = isDark ? "text-white" : "text-black";
  const orangeTextColor = "text-orange-500";

  return (
    <h2
      className={clsx(
        "font-semibold font-urbanist tracking-wide text-center md:text-left transition-colors duration-300",
        sizeClass
      )}
    >
      <span className={baseTextColor}>{firstText} </span>
      {orangeText && (
        <span className={clsx(orangeTextColor, "font-bold")}>{orangeText} </span>
      )}
      {lastText && <span className={baseTextColor}>{lastText}</span>}
    </h2>
  );
}
