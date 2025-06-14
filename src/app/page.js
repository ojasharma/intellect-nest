"use client";

import React, { useState, useEffect } from "react";

// Import Modular Components
import Scene from "@/components/scene/Scene";
import UIOverlay from "@/components/ui/UIOverlay";
import InstructionalText from "@/components/ui/InstructionalText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import CustomCursor from "@/components/ui/CustomCursor";

export default function HomePage() {
  // State for mouse interaction
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  // State for scroll-based UI visibility
  const [fadeClass, setFadeClass] = useState("opacity-0");
  const [scrollFadeClass, setScrollFadeClass] = useState("fade-in");

  // New state to hold the live scroll percentage
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (documentHeight === windowHeight) return;

      const currentScrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      // Update state with the new scroll percentage
      setScrollPercentage(currentScrollPercentage);

      // Instruction Text Logic
      if (currentScrollPercentage >= 11.11 && currentScrollPercentage < 23) {
        setFadeClass("fade-in");
      } else {
        setFadeClass("fade-out");
      }

      // Scroll Indicator Logic
      if (currentScrollPercentage > 5) {
        setScrollFadeClass("fade-out");
      } else {
        setScrollFadeClass("fade-in");
      }
    };

    // Run on initial mount
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

  // Function to smoothly scroll to a target percentage
  const scrollToPercent = (percent) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollableHeight = documentHeight - windowHeight;
    const targetScrollY = (scrollableHeight * percent) / 100;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main
        className="relative h-screen flex flex-col items-center overflow-hidden"
        style={{ cursor: "none" }}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
        onClick={handleClick}
      >
        {/* Background Image */}
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          className="fixed top-0 left-0 w-screen h-screen object-cover pointer-events-none select-none z-0 opacity-20"
        />

        {/* 3D Scene: Pass down scroll state and action */}
        <Scene
          scrollPercentage={scrollPercentage}
          scrollToPercent={scrollToPercent}
        />

        {/* UI Overlay */}
        <UIOverlay />

        {/* Custom Mouse Cursor */}
        <CustomCursor
          mousePos={mousePos}
          isMouseIn={isMouseIn}
          clicked={clicked}
        />

        {/* Scroll-based UI elements */}
        <ScrollIndicator scrollFadeClass={scrollFadeClass} />
        <InstructionalText fadeClass={fadeClass} />
      </main>

      {/* Spacer for Scrolling */}
      <div
        style={{
          height: "600vh",
          width: "100%",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
