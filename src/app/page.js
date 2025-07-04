"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Import the Next.js Image component
import { useScrollStore } from "@/src/store";

// Import Modular Components
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
  FEATURE_POSITION: 228, // 300vh from top
  BASELINE_WIDTH: 1496, // Reference width where current sizing is perfect
};

// Function to calculate responsive values based on viewport width
const getResponsiveValues = () => {
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1496;
  const scaleFactor = viewportWidth / CONSTANTS.BASELINE_WIDTH;

  return {
    featureScale: 1.6 * scaleFactor,
    featureWidth: 710 * scaleFactor,
    featureGap: 24 * scaleFactor, // 1.5rem = 24px
    featurePadding: 24 * scaleFactor, // 1.5rem = 24px
    featureIconSize: 64 * scaleFactor, // 4rem = 64px
    featureBorderRadius: 24 * scaleFactor,
    featureTextSize: 1.5 * scaleFactor, // rem multiplier
    featureMarginTop: 16 * scaleFactor, // 1rem = 16px
    // Stats section responsive values
    statsWidth: 550 * scaleFactor,
    statsGap: 20 * scaleFactor, // 1.25rem = 20px
    statsPadding: 24 * scaleFactor, // 1.5rem = 24px
    statsHeight: 220 * scaleFactor,
    statsIconSize: 40 * scaleFactor, // 2.5rem = 40px
    statsNumberSize: 2.8 * scaleFactor, // rem multiplier
    statsTextSize: 1 * scaleFactor, // rem multiplier
    statsBorderRadius: 24 * scaleFactor,
    // Instructor section responsive values
    instructorCardWidth: 300 * scaleFactor,
    instructorGap: 48 * scaleFactor, // 3rem = 48px
    instructorPadding: 32 * scaleFactor, // 2rem = 32px
    instructorImageSize: 160 * scaleFactor, // 10rem = 160px
    instructorNameSize: 1.5 * scaleFactor, // rem multiplier
    instructorRatingSize: 1.125 * scaleFactor, // rem multiplier
    instructorHeadingSize: 3 * scaleFactor, // rem multiplier
    instructorBorderRadius: 24 * scaleFactor,
  };
};

const PAGE_HEIGHT_VH = CONSTANTS.TOTAL_PHASES * CONSTANTS.VH_PER_PHASE;

// Feature data
const features = [
  {
    img: "/1.png",
    alt: "Curriculum",
    text: (
      <>
        <span className="font-extrabold">Sophisticated Curriculum</span>
        <span className="italic font-light">
          {" "}
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
          {" "}
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

// Stats data
const stats = [
  {
    img: "/4.png",
    alt: "Students Taught",
    value: 50,
    text: "Students Taught",
  },
  { img: "/5.png", alt: "Awards Won", value: 10, text: "Awards" },
  {
    img: "/6.png",
    alt: "Classes Taken",
    value: 400,
    text: "Classes Taken",
  },
  {
    img: "/7.png",
    alt: "Years of Experience",
    value: 5,
    text: "Years Of Experience",
  },
];

// Instructors data
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

// Custom hook for counting animation
const useCountUp = (end, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.round(end * progress));

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, duration, totalFrames]);

  return count;
};

// Custom hook for typewriter effect
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!text) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

// Custom hook for responsive values
const useResponsiveValues = () => {
  const [responsiveValues, setResponsiveValues] = useState(() =>
    getResponsiveValues()
  );

  useEffect(() => {
    const handleResize = () => {
      setResponsiveValues(getResponsiveValues());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return responsiveValues;
};

// *** FIX 1: Create a new component for the count-up number ***
const StatCounter = ({ endValue }) => {
  const count = useCountUp(endValue);
  return <span>{count}+</span>;
};

// *** FIX 2: Create a new component for the typewriter text ***
const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);
  return <>{displayText}</>;
};

// Stats Component - Now with responsive sizing
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
              style={{
                fontSize: `${responsiveValues.statsNumberSize}rem`,
              }}
            >
              {isVisible && <StatCounter endValue={stat.value} />}
            </span>
            <br />
            <span
              className="font-light mt-1 block"
              style={{
                fontSize: `${responsiveValues.statsTextSize}rem`,
              }}
            >
              {stat.text}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

// Instructors Component - Now with responsive sizing
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
        style={{
          fontSize: `${responsiveValues.instructorHeadingSize}rem`,
        }}
      >
        {headingText}
      </h2>
      <div
        className="flex flex-col md:flex-row justify-center w-full max-w-4xl"
        style={{
          gap: `${responsiveValues.instructorGap}px`,
        }}
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
              style={{
                fontSize: `${responsiveValues.instructorNameSize}rem`,
              }}
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

// Responsive Feature Section Component
const ResponsiveFeatureSection = ({ features }) => {
  const responsiveValues = useResponsiveValues();

  return (
    <div
      className="absolute flex flex-col text-left z-[2]"
      style={{
        top: `${CONSTANTS.FEATURE_POSITION}vh`,
        left: "6vw",
        width: `${responsiveValues.featureWidth}px`,
        gap: `${responsiveValues.featureGap}px`,
      }}
    >
      <div
        className="text-white font-normal mb-0"
        style={{
          fontSize: `${responsiveValues.featureTextSize * 1.2}rem`,
        }}
      >
        Our Features:
      </div>

      {features.map((feature, idx) => {
        return (
          <div
            key={idx}
            className={`group flex items-start transition-all duration-400 liquid-glass-box`}
            style={{
              gap: `${responsiveValues.featureGap * 0.67}px`, // 16px equivalent
              padding: `${responsiveValues.featurePadding}px`,
              transition: "backdrop-filter 0.5s ease",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: `${responsiveValues.featureBorderRadius}px`,
              boxShadow: `
                0 8px 32px rgba(0, 27, 74, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1)
              `,
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

            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
              <div
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: "20%",
                  left: "15%",
                  animation: "float 3s ease-in-out infinite",
                }}
              />
              <div
                className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full"
                style={{
                  top: "60%",
                  right: "25%",
                  animation: "float 4s ease-in-out infinite reverse",
                }}
              />
              <div
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  bottom: "30%",
                  left: "70%",
                  animation: "float 3.5s ease-in-out infinite",
                }}
              />
            </div>

            <Image
              src={feature.img}
              alt={feature.alt}
              width={responsiveValues.featureIconSize}
              height={responsiveValues.featureIconSize}
              className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
                marginTop: `${responsiveValues.featureMarginTop}px`,
              }}
            />
            <p
              className="font-poppins leading-snug text-white relative z-10 transition-all duration-500 group-hover:text-shadow-glow"
              style={{
                fontSize: `${responsiveValues.featureTextSize}rem`,
                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              {feature.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

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
  const lastKnownScrollPercentageRef = useRef(0);

  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe((state) => {
      const scrollPercentage = state.scrollPercentage;
      const phaseUnit = 100 / CONSTANTS.TOTAL_PHASES;

      let currentPhase = 0;
      if (scrollPercentage > 5) currentPhase = 1;
      if (scrollPercentage >= phaseUnit * 1) currentPhase = 1.5;
      if (scrollPercentage >= phaseUnit * 2) currentPhase = 2;
      if (scrollPercentage >= phaseUnit * 3) currentPhase = 3;
      if (scrollPercentage >= phaseUnit * 4) currentPhase = 4;
      if (scrollPercentage >= phaseUnit * 5) currentPhase = 5;
      if (scrollPercentage >= phaseUnit * 6) currentPhase = 6;
      if (scrollPercentage >= phaseUnit * 7) currentPhase = 7;
      if (scrollPercentage >= phaseUnit * 8) currentPhase = 8;
      if (scrollPercentage >= phaseUnit * 9) currentPhase = 9;
      if (scrollPercentage >= phaseUnit * 10) currentPhase = 10;

      const generalPhaseChanged = currentPhase !== lastKnownPhaseRef.current;

      if (generalPhaseChanged) {
        setUiState((prevState) => {
          return {
            ...prevState,
            instructionalFade:
              scrollPercentage >= phaseUnit * 1 &&
              scrollPercentage < phaseUnit * 4
                ? "fade-in"
                : "fade-out",
            scrollIndicatorFade: scrollPercentage > 5 ? "fade-out" : "fade-in",
            greatMoveFade:
              currentPhase >= 4 && currentPhase <= 4.7 ? "fade-in" : "fade-out",
            rookMoveFade:
              currentPhase >= 5.6 && currentPhase <= 6 ? "fade-in" : "fade-out",
            pawnMoveFade:
              scrollPercentage >= phaseUnit * 7 &&
              scrollPercentage < phaseUnit * 8
                ? "fade-in"
                : "fade-out",
            finalMoveFade:
              scrollPercentage >= phaseUnit * 9 &&
              scrollPercentage < phaseUnit * 10
                ? "fade-in"
                : "fade-out",
            isStatsVisible: currentPhase >= 5,
            isInstructorsVisible: scrollPercentage >= 62,
          };
        });
      }

      lastKnownPhaseRef.current = currentPhase;
      lastKnownScrollPercentageRef.current = scrollPercentage;
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

  const scrollToPercent = (percent, duration = 1500) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const targetScrollY = ((documentHeight - windowHeight) * percent) / 100;

    const start = window.scrollY;
    const distance = targetScrollY - start;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 0.5 * (1 - Math.cos(progress * Math.PI));

      window.scrollTo(0, start + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  };

  return (
    <>
      <main
        className="relative h-screen flex flex-col items-center overflow-hidden"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
        onClick={handleClick}
      >
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          layout="fill"
          objectFit="cover"
          className="fixed bottom-[-180] left-0 pointer-events-none select-none z-0 opacity-20"
        />

        <InstructionalText fadeClass={uiState.instructionalFade} />

        <div
          className={`fixed z-30 select-none text-white text-center ${uiState.greatMoveFade}`}
          style={{
            top: "5%",
            right: "10%",
            transform: "translate(0, -10%)",
            fontFamily: "Poppins",
            fontSize: "1.5vw",
            lineHeight: 1.2,
            textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
          }}
        >
          <div>Great Move!</div>
          <div>
            <div className="font-light">Queen h4 next to Check.</div>
            <div className="font-thin italic">
              Simple. Direct. Powerful.
              <br />
              The way we like it at The Intellect Nest.
            </div>
          </div>
        </div>

        <div
          className={`fixed z-30 select-none text-white text-center ${uiState.rookMoveFade}`}
          style={{
            top: "5%",
            left: "10%",
            transform: "translate(0, -10%)",
            fontFamily: "Poppins",
            fontSize: "1.5vw",
            lineHeight: 1.2,
            textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
          }}
        >
          <div>
            <div className="font-light">
              Fabulous!
              <br />
              Rook to g3 next to double down the threat
            </div>
            <div className="font-thin italic">
              because at The Intellect Nest,
              <br />
              we turn defense into destruction.
            </div>
          </div>
        </div>

        <div
          className={`fixed z-30 select-none text-white text-center ${uiState.pawnMoveFade}`}
          style={{
            top: "5%",
            right: "10%",
            transform: "translate(0, -10%)",
            fontFamily: "Poppins",
            fontSize: "1.5vw",
            lineHeight: 1.2,
            textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
          }}
        >
          <div>
            <div className="font-light">
              Bravo!
              <br />
              Pawn to e5
            </div>
            <div className="font-thin italic">
              Claim your space, no questions.
            </div>
          </div>
        </div>

        <div
          className={`fixed z-30 select-none text-white text-center ${uiState.finalMoveFade}`}
          style={{
            top: "5%",
            left: "33%",
            fontFamily: "Poppins",
            fontSize: "1.5vw",
            lineHeight: 1.2,
            textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
          }}
        >
          <div className="font-light">
            So are you ready
            <br />
            <span className="font-light">
              For the Next Gen Chess Training For your kids?
            </span>
            <br />
            <span className="font-thin">Rook g4 to finish the game.</span>
          </div>

          {/* Liquid Glass Button matching feature section styling */}
          <div
            style={{
              position: "fixed",
              bottom: "-80%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "9vw",
              height: "3vw",
              backgroundColor: "#7CACFF",
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(-50%) scale(1.05)";
              const text = e.currentTarget.querySelector("span");

              // Reset animation
              text.style.animation = "none";
              void text.offsetWidth; // force reflow to reset animation
              text.style.animation = "gradientShift 0.7s linear";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(-50%) scale(1)";
            }}
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
        </div>
        <Scene
          scrollToPercent={scrollToPercent}
          totalPhases={CONSTANTS.TOTAL_PHASES}
        />
        <UIOverlay />
        {/* <CustomCursor isMouseIn={isMouseIn} clicked={clicked} /> */}
        <ScrollIndicator scrollFadeClass={uiState.scrollIndicatorFade} />
      </main>

      <div
        style={{
          height: `${PAGE_HEIGHT_VH}vh`,
          width: "100%",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        <div
          className="absolute w-full z-[1]"
          style={{ top: "150vh", left: 0 }}
        >
          <InfiniteTape />
        </div>

        <ResponsiveFeatureSection features={features} />

        <StatsSection stats={stats} isVisible={uiState.isStatsVisible} />
        <InstructorsSection
          instructors={instructors}
          isVisible={uiState.isInstructorsVisible}
        />
      </div>

      <style jsx>{`
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
