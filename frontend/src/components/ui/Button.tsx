"use client";

import { useTheme } from "next-themes";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  variant?: "text" | "solid";
}

export default function Button({
  leftIcon,
  rightIcon,
  children,
  variant = "solid",
}: ButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseStyle =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-full w-fit font-medium transition-all duration-200";

  const solidStyle = clsx(
    baseStyle,
    "border border-orange-600 bg-orange-500 text-white hover:bg-orange-600"
  );

  const textStyle = clsx(
    baseStyle,
    isDark ? "text-gray-100" : "text-gray-900",
    "hover:text-orange-500"
  );

  return (
    <button className={variant === "solid" ? solidStyle : textStyle}>
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
