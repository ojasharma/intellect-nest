"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollStore } from "@/src/store";
import { CONSTANTS, PAGE_HEIGHT_VH } from "@/src/lib/constants";
import { useResponsiveValues } from "@/src/hooks/useResponsiveValues";
import { useCountUp } from "@/src/hooks/useCountUp";
import { useTypewriter } from "@/src/hooks/useTypewriter";

// Import Modular Components (Excluding FAQSection)
import Scene from "@/components/scene/Scene";
import UIOverlay from "@/components/ui/UIOverlay";
import InstructionalText from "@/components/ui/InstructionalText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import FeatureSection from "@/components/sections/FeatureSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ChessMoveOverlays from "@/components/ui/ChessMoveOverlays";

// --- Data for Page Sections ---
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

// --- Local Helper Components ---
const StatCounter = ({ endValue }) => {
  const count = useCountUp(endValue);
  return <span>{count}+</span>;
};

const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);
  return <>{displayText}</>;
};

// --- Local Scroll-Dependent Section Components ---
const StatsSection = ({ stats, isVisible }) => {
  const responsiveValues = useResponsiveValues();
  return (
    <div
      className={`absolute grid grid-cols-2 text-white z-[9999]`}
      style={{
        top: "345vh",
        right: "6vw",
        width: `${responsiveValues.statsWidth}px`,
        gap: `${responsiveValues.statsGap}px`,
        fontFamily: "Poppins",
        pointerEvents: "auto",
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`group flex flex-col items-center justify-center text-center liquid-glass-box`}
          style={{
            padding: `${responsiveValues.statsPadding}px`,
            height: `${responsiveValues.statsHeight}px`,
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
      className={`absolute flex flex-col items-center text-white z-[9999]`}
      style={{
        top: "440vh",
        left: "30%",
        transform: "translateX(-50%)",
        fontFamily: "Poppins",
        width: "100%",
        padding: `${responsiveValues.instructorPadding}px`,
        pointerEvents: "auto",
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
    </div>
  );
};

// ==================================================================
// --- INLINE FAQ SECTION ---
// ==================================================================
const FAQ_SCALE = 1.3;

const faqContentData = [
  {
    question: "My child is a complete beginner. Can they still join?",
    answer:
      "Absolutely! We have beginner-level programs designed for children with no experience. Our coaches use fun methods like stories and games to teach chess basics.",
  },
  {
    question: "How much time does my child need to commit each week?",
    answer:
      "Our program usually requires 2–3 sessions per week, each about 45 minutes. This helps children improve steadily without feeling overwhelmed.",
  },
  {
    question: "Are the classes conducted online or in-person?",
    answer:
      "All our classes are online through live sessions. Your child learns in real time with individual attention and progress tracking.",
  },
];

const FAQChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`text-white transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    style={{
      height: `${12 * FAQ_SCALE}px`,
      width: `${12 * FAQ_SCALE}px`,
    }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const FAQAccordionItem = ({ faqItem, isFaqOpen, onToggle }) => {
  return (
    <div
      className="group relative transition-all duration-400 overflow-hidden cursor-pointer"
      style={{
        gap: `${12 * FAQ_SCALE}px`,
        padding: `${14 * FAQ_SCALE}px`,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: `${12 * FAQ_SCALE}px`,
        boxShadow: `0 ${6 * FAQ_SCALE}px ${
          18 * FAQ_SCALE
        }px rgba(0,27,74,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)`,
      }}
      onClick={onToggle}
    >
      <div className="w-full text-left flex justify-between items-center relative z-10">
        <span
          className="font-semibold font-poppins"
          style={{
            fontSize: `${0.95 * FAQ_SCALE}rem`,
            color: "white",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
        >
          {faqItem.question}
        </span>
        <FAQChevronIcon isOpen={isFaqOpen} />
      </div>
      <div
        className="relative z-10 transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isFaqOpen ? `${300 * FAQ_SCALE}px` : "0",
          opacity: isFaqOpen ? 1 : 0,
          marginTop: isFaqOpen ? `${12 * FAQ_SCALE}px` : "0",
        }}
      >
        <p
          className="text-white font-light font-poppins leading-snug"
          style={{
            fontSize: `${0.85 * FAQ_SCALE}rem`,
            textShadow: "0 0 8px rgba(255,255,255,0.1)",
          }}
        >
          {faqItem.answer}
        </p>
      </div>
    </div>
  );
};

const InlineFAQSection = ({ isFaqVisible }) => {
  const responsiveValues = useResponsiveValues();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqHeadingText = useTypewriter(
    "Frequently Asked Questions",
    isFaqVisible ? 50 : 9999
  );

  const handleToggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div
      className={`absolute flex flex-col items-center text-white z-[9999]`}
      style={{
        top: "643vh",
        right: "20%",
        transform: "translateX(40%)",
        fontFamily: "Poppins",
        width: `${30 * FAQ_SCALE}%`,
        maxWidth: `${680 * FAQ_SCALE}px`,
        padding: `${responsiveValues.instructorPadding * 0.8 * FAQ_SCALE}px`,
      }}
    >
      <h2
        className="font-bold font-poppins text-center"
        style={{
          fontSize: `${
            responsiveValues.instructorHeadingSize * 0.5 * FAQ_SCALE
          }rem`,
          textShadow: "0 0 18px rgba(255, 255, 255, 0.3)",
          marginBottom: `${10 * FAQ_SCALE}px`,
        }}
      >
        {faqHeadingText}
      </h2>
      <div
        className="w-full max-w-2xl mx-auto z-[2]"
        style={{ padding: `0 ${4 * FAQ_SCALE}px` }}
      >
        <div className="flex flex-col" style={{ gap: `${3 * FAQ_SCALE}px` }}>
          {faqContentData.map((item, index) => (
            <FAQAccordionItem
              key={index}
              faqItem={item}
              isFaqOpen={openFaqIndex === index}
              onToggle={() => handleToggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
// ==================================================================
// --- END INLINE FAQ SECTION ---
// ==================================================================

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
    isFAQVisible: false,
  });

  const lastKnownPhaseRef = useRef(0);

  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe((state) => {
      const { scrollPercentage } = state;
      const phaseUnit = 100 / CONSTANTS.TOTAL_PHASES;
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
          isInstructorsVisible: scrollPercentage >= 62,
          isFAQVisible: scrollPercentage >= 75,
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

  const scrollToPercent = (percent, duration = 1500) => {
    // ... (smooth scroll function remains the same)
  };

  return (
    <>
      <main className="relative h-screen flex flex-col items-center overflow-hidden">
        {/* ... (main scene and UI overlays) ... */}
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
        <div style={{ pointerEvents: "auto" }}>
          <FeatureSection />
        </div>

        <StatsSection stats={stats} isVisible={uiState.isStatsVisible} />
        <InstructorsSection
          instructors={instructors}
          isVisible={uiState.isInstructorsVisible}
        />

        {/* Render the inline FAQ section */}
        <div style={{ pointerEvents: "auto" }}>
          <InlineFAQSection isFaqVisible={uiState.isFAQVisible} />
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <ReviewsSection />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        // ... (global keyframes and styles remain the same) ...
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .liquid-glass-box:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 16px 45px rgba(0, 20, 50, 0.35),
            0 0 50px rgba(51, 187, 255, 0.2);
        }
      `}</style>
    </>
  );
}
