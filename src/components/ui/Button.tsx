"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  href?: string;
};

export default function Button({ variant = "primary", href, className, children, ...rest }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-sky-600 text-white hover:shadow-lg focus:ring-sky-500",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
    outline: "border border-slate-200 text-slate-900 hover:bg-slate-50"
  };

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
