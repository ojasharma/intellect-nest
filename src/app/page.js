"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScrollStore } from "@/src/store";

// Import Modular Components (we no longer need FeatureSection here)
import Scene from "@/components/scene/Scene";
import UIOverlay from "@/components/ui/UIOverlay";
import InstructionalText from "@/components/ui/InstructionalText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import CustomCursor from "@/components/ui/CustomCursor";
import InfiniteTape from "@/components/ui/InfiniteTape";

// Centralized constants
const CONSTANTS = {
  TOTAL_PHASES: 11,
  VH_PER_PHASE: 66.66,
  FEATURE_SCALE: 1.9,
  FEATURE_WIDTH: 720,
};
const PAGE_HEIGHT_VH = CONSTANTS.TOTAL_PHASES * CONSTANTS.VH_PER_PHASE;

// Feature data, now living inside HomePage
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

export default function HomePage() {
  // Direct access to the store's setter function
  const setScrollPercentage = useScrollStore(
    (state) => state.setScrollPercentage
  );

  // Local state for all UI elements that change on scroll.
  // We will only update this when necessary to prevent re-renders.
  const [uiState, setUiState] = useState({
    instructionalFade: "opacity-0",
    scrollIndicatorFade: "fade-in",
    featureSectionFade: "fade-out",
    featureHighlights: [false, false, false],
  });

  // useRef to track the last known "phase" to prevent state updates
  const lastKnownPhase = useRef(0);

  // This effect subscribes to the store and calculates the UI state,
  // but only triggers a re-render if the derived state actually changes.
  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe((state) => {
      const scrollPercentage = state.scrollPercentage;
      const phaseUnit = 100 / CONSTANTS.TOTAL_PHASES;

      // Determine the current "phase" or "sub-phase" of the scroll
      let currentPhase = 0;
      if (scrollPercentage > 5) currentPhase = 1; // scroll indicator fade
      if (scrollPercentage >= phaseUnit * 2) currentPhase = 2; // instructional text fade in
      if (scrollPercentage >= phaseUnit * 3) currentPhase = 3; // features fade in
      if (scrollPercentage >= phaseUnit * 3 + phaseUnit / 3) currentPhase = 3.1;
      if (scrollPercentage >= phaseUnit * 3 + (phaseUnit / 3) * 2)
        currentPhase = 3.2;
      if (scrollPercentage >= phaseUnit * 4) currentPhase = 4; // features fade out

      // If the meaningful phase hasn't changed, do nothing. This is the key performance fix.
      if (currentPhase === lastKnownPhase.current) {
        return;
      }

      // If the phase HAS changed, calculate the new UI state...
      const startPercent = phaseUnit * 3;
      const highlightDuration = phaseUnit / 3;

      const newHighlights = [
        scrollPercentage >= startPercent &&
          scrollPercentage < startPercent + highlightDuration,
        scrollPercentage >= startPercent + highlightDuration &&
          scrollPercentage < startPercent + 2 * highlightDuration,
        scrollPercentage >= startPercent + 2 * highlightDuration &&
          scrollPercentage < startPercent + phaseUnit,
      ];

      // ...and update the state in a single batch.
      setUiState({
        instructionalFade:
          scrollPercentage >= phaseUnit * 2 && scrollPercentage < phaseUnit * 3
            ? "fade-in"
            : "fade-out",
        scrollIndicatorFade: scrollPercentage > 5 ? "fade-out" : "fade-in",
        featureSectionFade:
          scrollPercentage >= phaseUnit * 3 && scrollPercentage < phaseUnit * 4
            ? "fade-in"
            : "fade-out",
        featureHighlights: newHighlights,
      });

      lastKnownPhase.current = currentPhase;
    });

    return unsubscribe;
  }, []); // Empty dependency array, the subscription handles updates.

  // The scroll handler now ONLY updates the store. It does not trigger re-renders here.
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      if (documentHeight === windowHeight) return;
      const currentScrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(currentScrollPercentage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollPercentage]);

  // --- Non-scroll related state and handlers ---
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

  // We still need this function for the Scene to call
  const scrollToPercent = (percent) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollableHeight = documentHeight - windowHeight;
    const targetScrollY = (scrollableHeight * percent) / 100;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
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
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          className="fixed top-0 left-0 w-screen h-screen object-cover pointer-events-none select-none z-0 opacity-20"
        />

        {/* Scene is no longer affected by HomePage's re-renders */}
        <Scene
          scrollToPercent={scrollToPercent}
          totalPhases={CONSTANTS.TOTAL_PHASES}
        />

        <UIOverlay />
        <CustomCursor
          mousePos={mousePos}
          isMouseIn={isMouseIn}
          clicked={clicked}
        />
        <ScrollIndicator scrollFadeClass={uiState.scrollIndicatorFade} />
        <InstructionalText fadeClass={uiState.instructionalFade} />

        {/* --- Integrated FeatureSection --- */}
        <div
          className={`fixed top-1/2 z-50 flex flex-col gap-6 text-left transform -translate-y-1/2 left-[6vw] transition-opacity duration-700 ease-in-out ${uiState.featureSectionFade}`}
          style={{ width: `${CONSTANTS.FEATURE_WIDTH}px` }}
        >
          {features.map((feature, idx) => {
            const isActive = uiState.featureHighlights[idx];
            const iconSize = isActive
              ? `${CONSTANTS.FEATURE_SCALE * 1.2}rem`
              : `${CONSTANTS.FEATURE_SCALE * 1}rem`;
            const textSize = isActive
              ? `${CONSTANTS.FEATURE_SCALE * 1.55}rem`
              : `${CONSTANTS.FEATURE_SCALE * 1.5}rem`;
            const opacity = isActive ? 1 : 0.3;
            const glow = isActive
              ? "drop-shadow(0 0 15px rgba(51, 187, 255, 0.9))"
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
      </main>

      <div
        style={{
          height: `${PAGE_HEIGHT_VH}vh`,
          width: "100%",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        <div className="absolute w-full z-[1]" style={{ top: "20vh", left: 0 }}>
          <InfiniteTape />
        </div>
      </div>
    </>
  );
}
