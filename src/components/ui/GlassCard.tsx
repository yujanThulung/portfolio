"use client";

import React from "react";
import Image from "next/image";

interface GlassCardProps {
  title: string;
  images: { src: string; alt?: string }[];
}

export default function GlassCard({ title, images }: GlassCardProps) {
  const layerStyles = [
  {
    top: "0px",          // slightly aligned to the top edge
    scale: "0.90",
    opacity: "0.8",
    zIndex: 0,
    bg: "rgba(255,255,255,0.15)",
    padding: "8px",
    shadow: "shadow-md",
  },
  {
    top: "25px",         // spaced evenly between first and last
    scale: "0.95",
    opacity: "1",
    zIndex: 5,
    bg: "#d1d5db",
    padding: "8px",
    shadow: "shadow-md",
  },
  {
    top: "50px",         // bottom-most layer (main image)
    scale: "1",
    opacity: "1",
    zIndex: 10,
    bg: "transparent",
    padding: "0px",
    shadow: "shadow-lg",
  },
];

  return (
    <div
      className="w-[250px] rounded-3xl
                 flex flex-col justify-start text-white relative 
                 overflow-hidden isolate 
                 font-lufga text-3xl font-medium
                 bg-white/10 border border-white/40 
                 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
      style={{
        ["--r" as any]: "20px",
        ["--s" as any]: "50px",
        ["--x" as any]: "20px",
        ["--y" as any]: "20px",
        ["--_m" as any]:
          "/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%, #0000 72%)",
        ["--_g" as any]:
          "conic-gradient(from 90deg at calc(100% - var(--r)) calc(100% - var(--r)), #0000 25%, #000 0)",
        ["--_d" as any]: "(var(--s) + var(--r))",
        mask: `
          calc(100% - var(--_d) - var(--x)) 100% var(--_m),
          100% calc(100% - var(--_d) - var(--y)) var(--_m),
          radial-gradient(var(--s) at 100% 100%, #0000 99%, #000 calc(100% + 1px))
            calc(-1*var(--r) - var(--x)) calc(-1*var(--r) - var(--y)),
          var(--_g) calc(-1*var(--_d) - var(--x)) 0,
          var(--_g) 0 calc(-1*var(--_d) - var(--y))
        `,
        maskRepeat: "no-repeat",
      }}
    >
      {/* Optional glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_60%)] -z-10" />

      {/* Card header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold p-2 pt-4">{title}</h2>
        <div className="h-[1px] w-full bg-white/30"></div>

        {/* Image Stack */}
        <div className="relative mt-4 w-full h-[170px]">
          {images.slice(0, 3).map((img, i) => {
            const style = layerStyles[i] ?? layerStyles[layerStyles.length - 1];
            return (
              <div
                key={i}
                className={`absolute w-full rounded-3xl backdrop-blur-sm ${style.shadow}`}
                style={{
                  top: style.top,
                  transform: `scale(${style.scale})`,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  backgroundColor: style.bg,
                  padding: style.padding,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `image-${i}`}
                  width={250}
                  height={120}
                  className="w-full h-[120px] rounded-3xl object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
