"use client";

import React from "react";

export default function JoinNowButton() {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateX(-50%) scale(1.05)";
    const text = e.currentTarget.querySelector("span");
    if (text) {
      // Force reflow to reset animation
      text.style.animation = "none";
      void text.offsetWidth;
      text.style.animation = "gradientShift 0.7s linear";
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateX(-50%) scale(1)";
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "-80%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "9vw",
        height: "3vw",
        borderRadius: "9999px",
        zIndex: 100,
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow:
          "0 8px 30px rgba(0, 27, 74, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
        transition: "transform 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        style={{
          fontSize: "1.5vw",
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          background:
            "linear-gradient(90deg, #ffffff 25%, #00a5ff, #ffffff 75%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 0%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Join Now
      </span>
    </div>
  );
}
