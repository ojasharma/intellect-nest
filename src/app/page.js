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

// --- FAQ Component ---
const faqData = [
  {
    question: "My child is a complete beginner. Can they still join?",
    answer:
      "Absolutely! We have dedicated beginner-level programs designed for children with no prior experience. Our coaches use fun, engaging methods like stories, puzzles, and games to teach the basics of chess step-by-step.",
  },
  {
    question: "How much time does my child need to commit each week?",
    answer:
      "Our regular program usually requires 2 to 3 sessions per week, each lasting about 45–60 minutes. This schedule helps your child improve steadily without feeling overwhelmed.",
  },
  {
    question: "Are the classes conducted online or in-person?",
    answer:
      "All our classes are conducted online through live, interactive sessions. Your child will learn from experienced coaches in real time, with individual attention and progress tracking—just like in a physical classroom.",
  },
];

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 text-white transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
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
const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(`Clicked: ${item.question}`);
  };

  const handleMouseEnter = () => {
    console.log(`Hovered: ${item.question}`);
  };

  return (
    <div
      className="group relative transition-all duration-400 overflow-hidden"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{
        gap: "20px",
        padding: "20px",
        marginBottom: "0px",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "18px",
        boxShadow: `
          0 8px 32px rgba(0, 27, 74, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      {/* ... shimmer and floating dots ... */}

      <div className="w-full text-left flex justify-between items-center relative z-10">
        <span
          className="font-semibold font-poppins"
          style={{
            fontSize: "1.25rem",
            color: "white",
            textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          }}
        >
          {item.question}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </div>

      <div
        className={`relative z-10 max-h-0 ${
          isOpen ? "max-h-[500px]" : ""
        } opacity-0 ${
          isOpen ? "opacity-100" : ""
        } transition-all duration-500 ease-in-out overflow-hidden mt-2`}
      >
        <p
          className="text-white font-light font-poppins leading-snug"
          style={{
            fontSize: "1rem",
            textShadow: "0 0 12px rgba(255, 255, 255, 0.2)",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = ({ isVisible }) => {
  const responsiveValues = useResponsiveValues();
  const headingText = useTypewriter(
    "Frequently Asked Questions",
    isVisible ? 50 : 9999
  );

  return (
    <div
      className={`absolute flex flex-col items-center text-white z-[999]`}
      style={{
        top: "640vh", // Positioned after instructors section
        right: "0%",
        // transform: "translateX(-50%)",
        fontFamily: "Poppins",
        width: "50%",
        maxWidth: "800px",
        padding: `${responsiveValues.instructorPadding}px`,
        pointerEvents: "auto",
      }}
    >
      <h2
        className="font-bold mb-2 h-14 font-poppins text-center"
        style={{
          fontSize: `${0.6 * responsiveValues.instructorHeadingSize}rem`,
          textShadow: "0 0 24px rgba(255, 255, 255, 0.4)",
        }}
      >
        {headingText}
      </h2>
      <div className="w-full max-w-3xl mx-auto px-6 z-[2]">
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

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

// --- Footer Component ---
const Footer = () => (
  <footer
    className="absolute bottom-0 left-0 w-full p-4 sm:p-8 text-white pointer-events-auto z-10"
    style={{
      background: "linear-gradient(to top, rgba(0, 5, 15, 0.7), transparent)",
    }}
  >
    <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
      {/* Social Links on the left */}
      <div className="flex gap-4 sm:gap-8">
        <a
          href="https://www.instagram.com/the_intellectnest/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-white hover:text-pink-400 transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="text-sm font-medium hidden sm:inline">
            Instagram
          </span>
        </a>

        <a
          href="https://www.facebook.com/people/The-Intellect-Nest/61558773284638/#"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-white hover:text-blue-400 transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-sm font-medium hidden sm:inline">Facebook</span>
        </a>
      </div>

      {/* "Made with love" on the right */}
      <div className="text-right">
        <p className="text-xs sm:text-sm text-gray-300 font-light">
          Made with{" "}
          <span className="text-red-500 text-lg ">❤️</span> by{" "}
          <a
            href="https://x.com/DieselSharma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline decoration-dotted underline-offset-2"
          >
            Ojasvi
          </a>
        </p>
      </div>
    </div>
  </footer>
);

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

  // --- ADDED FOR REDIRECTION ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 786) {
        // Using window.location.replace to avoid adding to history
        window.location.replace("/mobile");
      }
    };
    // Check on initial render
    handleResize();
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // --- END OF REDIRECTION CODE ---

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
          isInstructorsVisible: scrollPercentage >= 62,
          isFAQVisible: scrollPercentage >= 75, // FAQ appears after instructors
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
        <FAQSection isVisible={uiState.isFAQVisible} />
        <ReviewsSection />
        <Footer />
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

