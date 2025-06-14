"use client";

import React from "react";

export default function FeatureSection({
  scale = 1.9,
  width = 720,
  fadeClass = "",
  highlights = [false, false, false],
}) {
  const baseIconSize = `${scale * 1}rem`;
  const baseTextSize = `${scale * 1.5}rem`;
  const containerWidth = `${width}px`;

  const features = [
    {
      img: "/1.png",
      alt: "Curriculum",
      text: (
        <>
          <span className="font-extrabold">Sophisticated Curriculum</span>
          <span className="italic font-light">
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

  return (
    <div
      className={`fixed top-1/2 z-50 flex flex-col gap-6 text-left transform -translate-y-1/2 left-[6vw] transition-opacity duration-700 ease-in-out ${fadeClass}`}
      style={{ width: containerWidth }}
    >
      {features.map((feature, idx) => {
        const isActive = highlights[idx];
        const iconSize = isActive ? `${scale * 1.2}rem` : baseIconSize;
        const textSize = isActive ? `${scale * 1.55}rem` : baseTextSize;
        const opacity = isActive ? 1 : 0.3;
        const glow = isActive
          ? "drop-shadow(0 0 15px  rgba(51, 187, 255, 0.9))"
          : "none";

        return (
          <div className="flex items-start gap-4" key={idx}>
            <img
              src={feature.img}
              alt={feature.alt}
              style={{
                width: iconSize,
                height: iconSize,
                filter: `brightness(0) invert(1) ${glow}`,
                marginTop: "1rem",
                opacity,
                transition: "all 0.4s ease-in-out",
              }}
            />
            <p
              className="font-poppins text-white leading-snug"
              style={{
                fontSize: textSize,
                opacity,
                filter: glow,
                transition: "all 0.2s ease-in-out",
              }}
            >
              {feature.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
