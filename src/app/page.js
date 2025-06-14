"use client";

import React, { useState, useEffect } from "react";

// Import Modular Components
import Scene from "@/components/scene/Scene";
import UIOverlay from "@/components/ui/UIOverlay";
import InstructionalText from "@/components/ui/InstructionalText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import CustomCursor from "@/components/ui/CustomCursor";
import FeatureSection from "@/components/ui/FeatureSection";
import InfiniteTape from "@/components/ui/InfiniteTape";

export default function HomePage() {
  const FEATURE_SCALE = 1.9;
  const FEATURE_WIDTH = 720;

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-0");
  const [scrollFadeClass, setScrollFadeClass] = useState("fade-in");
  const [featureFadeClass, setFeatureFadeClass] = useState("fade-out");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (documentHeight === windowHeight) return;

      const currentScrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      setScrollPercentage(currentScrollPercentage);

      // InstructionalText visibility
      if (currentScrollPercentage >= 11.11 && currentScrollPercentage < 23) {
        setFadeClass("fade-in");
      } else {
        setFadeClass("fade-out");
      }

      // ScrollIndicator visibility
      if (currentScrollPercentage > 5) {
        setScrollFadeClass("fade-out");
      } else {
        setScrollFadeClass("fade-in");
      }

      // FeatureSection visibility
      if (currentScrollPercentage >= 33 && currentScrollPercentage < 44.44) {
        setFeatureFadeClass("fade-in");
      } else {
        setFeatureFadeClass("fade-out");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

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

  const getFeatureStates = () => {
    if (scrollPercentage >= 33.33 && scrollPercentage < 37.0333) {
      return [true, false, false]; // Highlight 1st
    } else if (scrollPercentage >= 37.0333 && scrollPercentage < 40.7366) {
      return [false, true, false]; // Highlight 2nd
    } else if (scrollPercentage >= 40.7366 && scrollPercentage < 44.44) {
      return [false, false, true]; // Highlight 3rd
    } else {
      return [false, false, false]; // None highlighted
    }
  };

  const highlights = getFeatureStates();

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
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          className="fixed top-0 left-0 w-screen h-screen object-cover pointer-events-none select-none z-0 opacity-20"
        />

        <Scene
          scrollPercentage={scrollPercentage}
          scrollToPercent={scrollToPercent}
        />

        <UIOverlay />

        <CustomCursor
          mousePos={mousePos}
          isMouseIn={isMouseIn}
          clicked={clicked}
        />

        <ScrollIndicator scrollFadeClass={scrollFadeClass} />
        <InstructionalText fadeClass={fadeClass} />

        <FeatureSection
          scale={FEATURE_SCALE}
          width={FEATURE_WIDTH}
          fadeClass={featureFadeClass}
          highlights={highlights}
        />
      </main>

      <div
        style={{
          height: "600vh",
          width: "100%",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        {/* InfiniteTape positioned at 120vh from document start */}
        <div
          className="absolute w-full z-[1]"
          style={{
            top: "20vh", // Changed to 20vh to make it more visible for testing
            left: 0,
            backgroundColor: "rgba(255, 0, 0, 0.3)", // Debug background
          }}
        >
          <InfiniteTape />
        </div>
      </div>
    </>
  );
}
