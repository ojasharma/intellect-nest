"use client";

import React from "react";
import Image from "next/image";

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
  return (
    <div className="relative flex flex-col px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-8 z-[3] space-y-6 sm:space-y-8 mb-20">
      <div className="text-white font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Why The Intellect Nest?
      </div>

      {features.map((feature, idx) => (
        <div
          key={idx}
          className="group flex items-start gap-4 sm:gap-6 p-4 sm:p-6 transition-all duration-400 liquid-glass-box"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
            boxShadow: `
              0 8px 32px rgba(0, 27, 74, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1)
            `,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
              transform: "translateX(-100%)",
              animation: "shimmer 2s infinite",
            }}
          />

          {/* Floating particles */}
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
            width={48}
            height={48}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10 flex-shrink-0"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
            }}
          />

          <p
            className="font-poppins leading-snug text-white relative z-10 transition-all duration-500 group-hover:text-shadow-glow text-sm sm:text-base md:text-lg"
            style={{
              textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            }}
          >
            {feature.text}
          </p>
        </div>
      ))}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
