"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollStore } from "@/src/store";
import {
  CONSTANTS,
  PAGE_HEIGHT_VH,
  getResponsiveValues,
} from "@/src/lib/constants";
import { useResponsiveValues } from "@/src/hooks/useResponsiveValues";
import { useCountUp } from "@/src/hooks/useCountUp";
import { useTypewriter } from "@/src/hooks/useTypewriter";

// Import Modular Components
import Scene from "@/components/scene/Scene";
import UIOverlay from "@/components/ui/UIOverlay";
import InstructionalText from "@/components/ui/InstructionalText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import FeatureSection from "@/components/sections/FeatureSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ChessMoveOverlays from "@/components/ui/ChessMoveOverlays";

// --- Data for local components ---
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

const instructors = [
  {
    name: "Harshit Dawar",
    rating: "FIDE Rating: 2000",
    pfp: "/pfp1.png",
    alt: "Harshit Dawar's profile picture",
  },
  {
    name: "Anushka",
    rating: "FIDE Rating: 2000",
    pfp: "/pfp2.png",
    alt: "Anushka's profile picture",
  },
];

// --- Helper components kept local for scroll-dependent sections ---
const StatCounter = ({ endValue }) => {
  const count = useCountUp(endValue);
  return <span>{count}+</span>;
};

const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);
  return <>{displayText}</>;
};

// --- Scroll-dependent components kept local to avoid performance issues ---
const StatsSection = ({ stats, isVisible }) => {
  const responsiveValues = useResponsiveValues();
  return (
    <div
      className={`absolute grid grid-cols-2 text-white z-[3]`}
      style={{
        top: "345vh",
        right: "6vw",
        width: `${responsiveValues.statsWidth}px`,
        gap: `${responsiveValues.statsGap}px`,
        fontFamily: "Poppins",
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`group flex flex-col items-center justify-center text-center liquid-glass-box`}
          style={{
            padding: `${responsiveValues.statsPadding}px`,
            height: `${responsiveValues.statsHeight}px`,
            transition: "backdrop-filter 0.5s ease",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: `${responsiveValues.statsBorderRadius}px`,
            boxShadow:
              "0 8px 32px rgba(0, 27, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
              transform: "translateX(-100%)",
              animation: "shimmer 2s infinite",
            }}
          />
          <Image
            src={stat.img}
            alt={stat.alt}
            width={responsiveValues.statsIconSize}
            height={responsiveValues.statsIconSize}
            className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10 mb-2"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
            }}
          />
          <p className="font-poppins leading-tight text-white relative z-10 transition-all duration-500 group-hover:text-shadow-glow">
            <span
              className="font-extrabold"
              style={{ fontSize: `${responsiveValues.statsNumberSize}rem` }}
            >
              {isVisible && <StatCounter endValue={stat.value} />}
            </span>
            <br />
            <span
              className="font-light mt-1 block"
              style={{ fontSize: `${responsiveValues.statsTextSize}rem` }}
            >
              {stat.text}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

const InstructorsSection = ({ instructors, isVisible }) => {
  const responsiveValues = useResponsiveValues();
  const headingText = useTypewriter(
    "Meet Our Instructors",
    isVisible ? 50 : 9999
  );

  return (
    <div
      className={`absolute flex flex-col items-center text-white z-[3]`}
      style={{
        top: "440vh",
        left: "30%",
        transform: "translateX(-50%)",
        fontFamily: "Poppins",
        width: "100%",
        padding: `${responsiveValues.instructorPadding}px`,
      }}
    >
      <h2
        className="font-bold mb-16 h-14 font-poppins text-center"
        style={{ fontSize: `${responsiveValues.instructorHeadingSize}rem` }}
      >
        {headingText}
      </h2>
      <div
        className="flex flex-col md:flex-row justify-center w-full max-w-4xl"
        style={{ gap: `${responsiveValues.instructorGap}px` }}
      >
        {instructors.map((instructor, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center gap-4 transition-all duration-500 liquid-glass-box"
            style={{
              padding: `${responsiveValues.instructorPadding}px`,
              width: `${responsiveValues.instructorCardWidth}px`,
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(12px) saturate(150%)",
              WebkitBackdropFilter: "blur(12px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: `${responsiveValues.instructorBorderRadius}px`,
              boxShadow: "0 8px 32px rgba(0, 20, 50, 0.3)",
            }}
          >
            <Image
              src={instructor.pfp}
              alt={instructor.alt}
              width={responsiveValues.instructorImageSize}
              height={responsiveValues.instructorImageSize}
              className="rounded-full object-cover border-4 border-transparent group-hover:border-blue-400 transition-all duration-300 shadow-lg"
              style={{
                width: `${responsiveValues.instructorImageSize}px`,
                height: `${responsiveValues.instructorImageSize}px`,
              }}
            />
            <h3
              className="font-semibold mt-4 h-8"
              style={{ fontSize: `${responsiveValues.instructorNameSize}rem` }}
            >
              {isVisible && <Typewriter text={instructor.name} speed={70} />}
            </h3>
            <p
              className="font-light text-blue-300 h-7"
              style={{
                fontSize: `${responsiveValues.instructorRatingSize}rem`,
              }}
            >
              {isVisible && <Typewriter text={instructor.rating} speed={70} />}
            </p>
          </div>
        ))}
      </div>
      <style jsx>{`
        /* Keeping this style local as it's specific to this component */
        .liquid-glass-box:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 16px 45px rgba(0, 20, 50, 0.35),
            0 0 50px rgba(51, 187, 255, 0.2);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
        }
      `}</style>
    </div>
  );
};

// --- Main Page Component ---
export default function HomePage() {
  const setScrollPercentage = useScrollStore(
    (state) => state.setScrollPercentage
  );

  const [uiState, setUiState] = useState({
    instructionalFade: "opacity-0",
    scrollIndicatorFade: "fade-in",
    greatMoveFade: "fade-out",
    rookMoveFade: "fade-out",
    pawnMoveFade: "fade-out",
    finalMoveFade: "fade-out",
    isStatsVisible: false,
    isInstructorsVisible: false,
  });

  const lastKnownPhaseRef = useRef(0);

  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe((state) => {
      const { scrollPercentage } = state;
      const phaseUnit = 100 / CONSTANTS.TOTAL_PHASES;

      // Simplified phase calculation
      const currentPhase = Math.floor(scrollPercentage / phaseUnit);

      if (currentPhase !== lastKnownPhaseRef.current) {
        setUiState({
          instructionalFade:
            scrollPercentage >= phaseUnit && scrollPercentage < phaseUnit * 4
              ? "fade-in"
              : "fade-out",
          scrollIndicatorFade: scrollPercentage > 5 ? "fade-out" : "fade-in",
          greatMoveFade: currentPhase === 4 ? "fade-in" : "fade-out",
          rookMoveFade: currentPhase === 6 ? "fade-in" : "fade-out",
          pawnMoveFade: currentPhase === 7 ? "fade-in" : "fade-out",
          finalMoveFade: currentPhase === 9 ? "fade-in" : "fade-out",
          isStatsVisible: currentPhase >= 5,
          isInstructorsVisible: scrollPercentage >= 62, // This can be a specific trigger point
        });
        lastKnownPhaseRef.current = currentPhase;
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight === clientHeight) return;
      const currentScrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercentage(currentScrollPercentage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollPercentage]);

  // Smooth scroll utility function
  const scrollToPercent = (percent, duration = 1500) => {
    const targetScrollY =
      ((document.documentElement.scrollHeight - window.innerHeight) * percent) /
      100;
    const start = window.scrollY;
    const distance = targetScrollY - start;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 0.5 * (1 - Math.cos(progress * Math.PI));
      window.scrollTo(0, start + distance * easeProgress);
      if (progress < 1) requestAnimationFrame(animateScroll);
    };
    requestAnimationFrame(animateScroll);
  };

  return (
    <>
      <main className="relative h-screen flex flex-col items-center overflow-hidden">
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-20"
        />

        <InstructionalText fadeClass={uiState.instructionalFade} />

        <ChessMoveOverlays {...uiState} />

        <Scene
          scrollToPercent={scrollToPercent}
          totalPhases={CONSTANTS.TOTAL_PHASES}
        />
        <UIOverlay />
        <ScrollIndicator scrollFadeClass={uiState.scrollIndicatorFade} />
      </main>

      {/* Scrollable container for content */}
      <div
        style={{
          height: `${PAGE_HEIGHT_VH}vh`,
          width: "100%",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        <FeatureSection />
        <StatsSection stats={stats} isVisible={uiState.isStatsVisible} />
        <InstructorsSection
          instructors={instructors}
          isVisible={uiState.isInstructorsVisible}
        />
        <ReviewsSection />
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 1;
          }
        }

        .liquid-glass-box:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.08) 100%
          );
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 12px 40px rgba(0, 27, 74, 0.4),
            0 0 60px rgba(51, 187, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-4px) scale(1.02);
        }

        .text-shadow-glow {
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
            0 0 60px rgba(51, 187, 255, 0.4);
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -200% 0%;
          }
        }
      `}</style>
    </>
  );
}
