"use client";

import React from "react";
import Image from "next/image";
import { useResponsiveValues } from "@/src/hooks/useResponsiveValues";
import { CONSTANTS } from "@/src/lib/constants";

// Feature data can live here as it's only used by this component
const features = [
  {
    img: "/1.png",
    alt: "Curriculum",
    text: (
      <>
        <span className="font-extrabold">Sophisticated Curriculum</span>
        <span className="italic font-light">
          {" "}
          <br />
          made by International Masters
        </span>
      </>
    ),
  },
  {
    img: "/2.png",
    alt: "Coaches",
    text: (
      <>
        <span className="font-extrabold">Highly Experienced</span>
        <span className="italic font-light">
          {" "}
          <br />
          FIDE rated Coaches
        </span>
      </>
    ),
  },
  {
    img: "/3.png",
    alt: "Tools",
    text: (
      <>
        <span className="font-extrabold">Cutting-Edge Tools</span> <br />
        to Track <span className="italic font-light">Real Progress</span>
      </>
    ),
  },
];

export default function FeatureSection() {
  const responsiveValues = useResponsiveValues();

  return (
    <div
      className="absolute flex flex-col text-left z-[9999]"
      style={{
        top: `${CONSTANTS.FEATURE_POSITION}vh`,
        left: "6vw",
        width: `${responsiveValues.featureWidth}px`,
        gap: `${responsiveValues.featureGap}px`,
      }}
    >
      <div
        className="text-white font-normal mb-0"
        style={{
          fontSize: `${responsiveValues.featureTextSize * 1.2}rem`,
        }}
      >
        Why The Intellect Nest?
      </div>

      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`group flex items-start transition-all duration-400 liquid-glass-box`}
          style={{
            gap: `${responsiveValues.featureGap * 0.67}px`,
            padding: `${responsiveValues.featurePadding}px`,
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: `${responsiveValues.featureBorderRadius}px`,
            boxShadow: `
                            0 8px 32px rgba(0, 27, 74, 0.3),
                            inset 0 1px 0 rgba(255, 255, 255, 0.2),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                        `,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer and float animations */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
              transform: "translateX(-100%)",
              animation: "shimmer 2s infinite",
            }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
            <div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: "20%",
                left: "15%",
                animation: "float 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full"
              style={{
                top: "60%",
                right: "25%",
                animation: "float 4s ease-in-out infinite reverse",
              }}
            />
            <div
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                bottom: "30%",
                left: "70%",
                animation: "float 3.5s ease-in-out infinite",
              }}
            />
          </div>

          <Image
            src={feature.img}
            alt={feature.alt}
            width={responsiveValues.featureIconSize}
            height={responsiveValues.featureIconSize}
            className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
              marginTop: `${responsiveValues.featureMarginTop}px`,
            }}
          />
          <p
            className="font-poppins leading-snug text-white relative z-10 transition-all duration-500 group-hover:text-shadow-glow"
            style={{
              fontSize: `${responsiveValues.featureTextSize}rem`,
              textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            }}
          >
            {feature.text}
          </p>
        </div>
      ))}
    </div>
  );
}
