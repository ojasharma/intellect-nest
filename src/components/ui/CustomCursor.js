"use client";

import React from "react";

export default function CustomCursor({
  mousePos = { x: -100, y: -100 },
  isMouseIn,
  clicked = false,
}) {
  const circleSizeVW = 2;

  const scale = !isMouseIn
    ? 0
    : clicked
    ? 0.5 // Shrink on click
    : 1; // Normal

  return (
    <div
      style={{
        position: "fixed",
        top: `calc(${mousePos.y}px - ${circleSizeVW / 2}vw)`,
        left: `calc(${mousePos.x}px - ${circleSizeVW / 2}vw)`,
        width: `${circleSizeVW}vw`,
        height: `${circleSizeVW}vw`,
        borderRadius: "50%",
        border: `1px solid white`,
        pointerEvents: "none",
        zIndex: 1000,
        transition: "transform 0.2s ease, opacity 0.4s ease", // faster click effect
        transform: `scale(${scale})`,
        opacity: isMouseIn ? 1 : 0,
      }}
    />
  );
}
