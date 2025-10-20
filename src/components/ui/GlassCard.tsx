"use client";

import React from "react";
import Image from "next/image";

export default function GlassCard() {
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
      {/* Optional glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_60%)] -z-10" />

      {/* Card content */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold p-2 pt-4">Web Design</h2>
        <div className="h-[1px] w-full bg-white/30"></div>

        {/* Overlapping image stack */}
        <div className="relative mt-4 w-full h-[170px]">
          {/* 3rd image (topmost, farthest up, lowest opacity) */}
          <div className="absolute top-[-2] left-0 w-full bg-white/15 p-2 rounded-3xl backdrop-blur-sm shadow-md scale-[0.90] z-0">
            <Image
              src="/images/yujan.png"
              alt="Design 3"
              width={250}
              height={120}
              className="w-full h-[120px] rounded-3xl object-cover"
            />
          </div>

          {/* 2nd image (middle, slightly lower) */}
          <div className="absolute top-4 left-0 w-full rounded-3xl bg-gray-300 p-2 backdrop-blur-sm shadow-md opacity-100 scale-[0.95] z-5">
            <Image
              src="/images/yujan.png"
              alt="Design 2"
              width={250}
              height={120}
              className="w-full h-[120px]  object-cover"
            />
          </div>

          {/* 1st image (bottom, fully visible, slightly lower than others) */}
          <div className="absolute top-8 left-0 w-full bg-red rounded-3xl backdrop-blur-sm shadow-lg z-10">
            <Image
              src="/images/service/landing1.jpg"
              alt="Design 1"
              width={250}
              height={120}
              className="w-full h-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
