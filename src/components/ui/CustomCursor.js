"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor({ isMouseIn, clicked = false }) {
  const cursorRef = useRef(null);
  const circleSizeVW = 2;

  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        // Directly update the cursor's position using CSS transforms
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const scale = !isMouseIn ? 0 : clicked ? 0.5 : 1;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: `-${circleSizeVW / 2}vw`,
        left: `-${circleSizeVW / 2}vw`,
        width: `${circleSizeVW}vw`,
        height: `${circleSizeVW}vw`,
        borderRadius: "50%",
        border: `1px solid white`,
        pointerEvents: "none",
        zIndex: 1000,
        transition: "transform 0.1s ease, opacity 0.4s ease",
        transform: `scale(${scale})`, // This will now transition smoothly
        opacity: isMouseIn ? 1 : 0,
      }}
    />
  );
}
