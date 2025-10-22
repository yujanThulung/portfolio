"use client";

import clsx from "clsx";

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
  const sizeClass = clsx({
    "text-sm": size === "sm",
    "text-md": size === "md",
    "text-lg": size === "lg",
    "text-3xl": size === "3xl",
    "text-4xl": size === "4xl",
    "text-5xl": size === "5xl"
  });

  return (
    <h2 className={clsx("font-semibold font-urbanist", sizeClass)}>
      <span className="text-gray-800">{firstText}</span>
      {orangeText && <span className="text-orange-500 font-semibold">{orangeText}</span>}
      {lastText && <span className="text ">{orangeText}</span>}
    </h2>
  );
}
