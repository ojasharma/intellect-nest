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
  FEATURE_SCALE: 1.6,
  FEATURE_WIDTH: 710,
  FEATURE_POSITION: 228, // 300vh from top
};
const PAGE_HEIGHT_VH = CONSTANTS.TOTAL_PHASES * CONSTANTS.VH_PER_PHASE ;

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

// Stats Component
const StatsSection = ({ stats, isVisible }) => {
  return (
    <div
      className={`absolute grid grid-cols-2 gap-5 text-white z-[3]`}
      style={{
        top: "345vh",
        right: "6vw",
        width: "550px",
        fontFamily: "Poppins",
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`group flex flex-col items-center justify-center text-center p-6 liquid-glass-box`}
          style={{
            transition: "backdrop-filter 0.5s ease",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "24px",
            boxShadow:
              "0 8px 32px rgba(0, 27, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)",
            position: "relative",
            overflow: "hidden",
            height: "220px",
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
          {/* *** FIX 3: Use Next.js Image component *** */}
          <Image
            src={stat.img}
            alt={stat.alt}
            width={40}
            height={40}
            className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10 mb-2"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
            }}
          />
          <p className="font-poppins leading-tight text-white relative z-10 transition-all duration-500 group-hover:text-shadow-glow">
            <span className="font-extrabold text-[2.8rem]">
              {/* Render the new StatCounter component conditionally */}
              {isVisible && <StatCounter endValue={stat.value} />}
            </span>
            <br />
            <span className="font-light text-base mt-1 block">{stat.text}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

// Instructors Component
const InstructorsSection = ({ instructors, isVisible }) => {
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
        padding: "2rem",
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-16 h-14 font-poppins text-center">
        {headingText}
      </h2>
      <div className="flex flex-col md:flex-row gap-12 justify-center w-full max-w-4xl">
        {instructors.map((instructor, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center gap-4 p-8 transition-all duration-500 liquid-glass-box"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(12px) saturate(150%)",
              WebkitBackdropFilter: "blur(12px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0, 20, 50, 0.3)",
              width: "300px",
            }}
          >
            {/* *** FIX 3: Use Next.js Image component *** */}
            <Image
              src={instructor.pfp}
              alt={instructor.alt}
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover border-4 border-transparent group-hover:border-blue-400 transition-all duration-300 shadow-lg"
            />
            <h3 className="text-2xl font-semibold mt-4 h-8">
              {/* Render the new Typewriter component conditionally */}
              {isVisible && <Typewriter text={instructor.name} speed={70} />}
            </h3>
            <p className="text-lg font-light text-blue-300 h-7">
              {/* Render the new Typewriter component conditionally */}
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
        {/* *** FIX 3: Use Next.js Image component *** */}
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
          <button
            className="mt-8 px-10 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "24px",
              boxShadow:
                "0 8px 32px rgba(0, 27, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "500",
            }}
          >
            <span className="relative z-10 group-hover:text-shadow-glow">
              Join Now
            </span>

            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
                transform: "translateX(-100%)",
                animation: "shimmer 2s infinite",
              }}
            />

            {/* Floating particles like in features */}
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
          </button>
        </div>
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

        <div
          className="absolute flex flex-col gap-6 text-left z-[2]"
          style={{
            top: `${CONSTANTS.FEATURE_POSITION}vh`,
            left: "6vw",
            width: `${CONSTANTS.FEATURE_WIDTH}px`,
          }}
        >
          <div className="text-white font-normal text-[1.8rem] mb-0">
            Our Features:
          </div>

          {features.map((feature, idx) => {
            const textSize = `${CONSTANTS.FEATURE_SCALE * 1.5}rem`;

            return (
              <div
                key={idx}
                className={`group flex items-start gap-4 p-6 transition-all duration-400 liquid-glass-box`}
                style={{
                  transition: "backdrop-filter 0.5s ease",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "24px",
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

                {/* *** FIX 3: Use Next.js Image component *** */}
                <Image
                  src={feature.img}
                  alt={feature.alt}
                  width={CONSTANTS.FEATURE_SCALE * 16}
                  height={CONSTANTS.FEATURE_SCALE * 16}
                  className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10"
                  style={{
                    filter:
                      "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
                    marginTop: "1rem",
                  }}
                />
                <p
                  className="font-poppins leading-snug text-white relative z-10 transition-all duration-500 group-hover:text-shadow-glow"
                  style={{
                    fontSize: textSize,
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>

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
      `}</style>
    </>
  );
}
