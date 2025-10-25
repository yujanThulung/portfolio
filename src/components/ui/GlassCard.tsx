import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface GlassCardProps {
  title: string;
  images: { src: string; alt?: string }[];
}

// ✅ Extend React.CSSProperties to accept CSS variables
interface CSSVariableStyle extends React.CSSProperties {
  "--r"?: string;
  "--s"?: string;
  "--x"?: string;
  "--y"?: string;
  "--_m"?: string;
  "--_g"?: string;
  "--_d"?: string;
}

export default function GlassCard({ title, images }: GlassCardProps) {
  const layerStyles = [
    { top: "8px", scale: "0.9", opacity: "1", zIndex: 1, bg: "rgba(255,255,255,0.12)" },
    { top: "28px", scale: "0.95", opacity: "1", zIndex: 5, bg: "rgba(255,255,255,0.18)" },
    { top: "48px", scale: "1", opacity: "1", zIndex: 10, bg: "rgba(255,255,255,0.25)" },
  ];

  // ✅ Properly typed inline style object
  const cardStyle: CSSVariableStyle = {
    "--r": "24px",
    "--s": "45px",
    "--x": "20px",
    "--y": "20px",
    "--_m": "/calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%, #0000 72%)",
    "--_g": "conic-gradient(from 90deg at calc(100% - var(--r)) calc(100% - var(--r)), #0000 25%, #000 0)",
    "--_d": "(var(--s) + var(--r))",
    mask: `
      calc(100% - var(--_d) - var(--x)) 100% var(--_m),
      100% calc(100% - var(--_d) - var(--y)) var(--_m),
      radial-gradient(var(--s) at 100% 100%, #0000 99%, #000 calc(100% + 1px))
        calc(-1*var(--r) - var(--x)) calc(-1*var(--r) - var(--y)),
      var(--_g) calc(-1*var(--_d) - var(--x)) 0,
      var(--_g) 0 calc(-1*var(--_d) - var(--y))
    `,
    maskRepeat: "no-repeat",
  };

  return (
    <div className="relative w-[320px] h-[340px] group">
      {/* Main Card */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden 
           border border-white/30 backdrop-blur-xl bg-transparent
          shadow-[0_8px_25px_rgba(0,0,0,0.25)]
          flex flex-col justify-between transition-all duration-300
          hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]
          pt-3"
        style={cardStyle}
      >
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_60%)] -z-10" />

        {/* Header */}
        <div>
          <h2 className="p-6 font-lufga pb-0 text-xl font-semibold text-white tracking-wide mb-3">
            {title}
          </h2>
          <div className="h-[1px] bg-white/30 mb-4" />
        </div>

        {/* Image stack */}
        <div className="relative w-full h-[180px] mb-4">
          {images.slice(0, 3).map((img, i) => {
            const style = layerStyles[i] ?? layerStyles[layerStyles.length - 1];
            return (
              <div
                key={i}
                className="absolute w-full rounded-3xl backdrop-blur-sm"
                style={{
                  top: style.top,
                  transform: `scale(${style.scale})`,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  backgroundColor: style.bg,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `image-${i}`}
                  width={280}
                  height={150}
                  className="w-full h-[150px] rounded-3xl object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating button */}
      <button
        className="absolute bottom-0 right-0 w-18 h-18 rounded-full
          bg-[#1D2939]/80 backdrop-blur-lg border border-white/20
          flex items-center justify-center
          shadow-lg transition-all duration-300 
          group-hover:scale-110 group-hover:bg-[#1D2939]
          hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      >
        <ArrowUpRight className="text-white w-7 h-7" />
      </button>
    </div>
  );
}
