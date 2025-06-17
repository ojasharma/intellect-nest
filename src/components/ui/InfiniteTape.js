"use client";

import React, { useEffect, useState } from "react";

const TEXT = "The Intellect Nest ♟️ Innovating Chess Teaching Since 2020 ♟️ ";

const FONT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const FONT_STYLES = ["normal", "italic"];

function getRandomFontWeight() {
  return FONT_WEIGHTS[Math.floor(Math.random() * FONT_WEIGHTS.length)];
}

function getRandomFontStyle() {
  return FONT_STYLES[Math.floor(Math.random() * FONT_STYLES.length)];
}

export default function InfiniteTape() {
  const [renderedText, setRenderedText] = useState("");

  useEffect(() => {
    let output = "";
    for (let i = 0; i < 40; i++) {
      for (const char of TEXT) {
        const weight = getRandomFontWeight();
        const style = getRandomFontStyle();
        output += `<span style="font-weight:${weight}; font-style:${style}">${char}</span>`;
      }
    }
    setRenderedText(output);
  }, []);

  return (
    <div
      className="w-full bg-[#1c6691] overflow-hidden"
      style={{ maxWidth: "100vw" }}
    >
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
      <div className="w-full overflow-hidden relative h-16 flex items-center">
        <div
          className="text-[#0C0C0E] text-[2rem] font-[Poppins] whitespace-nowrap absolute"
          style={{
            animation: "scrollLeft 800s linear infinite",
            left: 0,
          }}
          dangerouslySetInnerHTML={{ __html: renderedText }}
        />
      </div>
    </div>
  );
}
