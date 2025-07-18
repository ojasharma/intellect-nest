"use client";

import React from "react";
import Image from "next/image";

const stats = [
  { img: "/4.png", alt: "Students Taught", value: 50, text: "Students Taught" },
  { img: "/5.png", alt: "Awards Won", value: 10, text: "Awards" },
  { img: "/6.png", alt: "Classes Taken", value: 400, text: "Classes Taken" },
  {
    img: "/7.png",
    alt: "Years of Experience",
    value: 5,
    text: "Years Of Experience",
  },
];

export default function StatsSection({ statsData = stats }) {
  return (
    <div className="w-80% mx-auto px-4">
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {statsData.map((stat, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center justify-center text-center text-white p-6 md:p-8 h-32 md:h-40 lg:h-48 rounded-lg md:rounded-xl lg:rounded-2xl transition-all duration-500 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                "0 8px 32px rgba(0, 27, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <Image
              src={stat.img}
              alt={stat.alt}
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg mb-2 md:mb-3"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
              }}
            />
            <div className="font-poppins leading-tight">
              <div className="font-extrabold text-lg md:text-xl lg:text-2xl">
                {stat.value}+
              </div>
              <div className="font-light text-xs md:text-sm lg:text-base mt-1">
                {stat.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
