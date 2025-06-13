"use client";

import React from "react";

// Add a default value to the `mousePos` prop.
// If HomePage doesn't provide a mousePos, it will use this default object
// instead of being undefined, preventing the crash.
export default function CustomCursor({
  mousePos = { x: -100, y: -100 },
  isMouseIn,
}) {
  const circleSizeVW = 2;

  return (
    <div
      style={{
        position: "fixed",
        // Now, mousePos.y and mousePos.x will always be safe to access.
        top: `calc(${mousePos.y}px - ${circleSizeVW / 2}vw)`,
        left: `calc(${mousePos.x}px - ${circleSizeVW / 2}vw)`,
        width: `${circleSizeVW}vw`,
        height: `${circleSizeVW}vw`,
        borderRadius: "50%",
        border: `1px solid white`,
        pointerEvents: "none",
        zIndex: 1000,
        transition:
          "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: isMouseIn ? "scale(1)" : "scale(0)",
        opacity: isMouseIn ? 1 : 0,
      }}
    />
  );
}
