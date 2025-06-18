"use client";

import React, { useState, useEffect, useRef } from "react";
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
  FEATURE_POSITION: 503, // 300vh from top
};
const PAGE_HEIGHT_VH = CONSTANTS.TOTAL_PHASES * CONSTANTS.VH_PER_PHASE * 3;

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

// Stats Component

const StatsSection = ({ stats, isVisible }) => {
  return (
    <div
      className={`absolute grid grid-cols-2 gap-5 text-white z-[3]`}
      style={{
        top: "940vh",
        right: "6vw",
        width: "550px",
        fontFamily: "Poppins",
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`group flex flex-col items-center justify-center text-center p-6 liquid-glass-box ${
            isVisible ? "fade-in" : "fade-out"
          }`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(20px)",
            transition:
              "opacity 0.7s ease, transform 0.7s ease, backdrop-filter 0.5s ease",
            transitionDelay: `${idx * 100}ms`,
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
          <img
            src={stat.img}
            alt={stat.alt}
            className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10 mb-2"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 8px rgba(51, 187, 255, 0.6))",
            }}
          />
          <p className="font-poppins leading-tight text-white relative z-10 transition-all duration-500 group-hover:text-shadow-glow">
            <span className="font-extrabold text-[2.8rem]">
              {isVisible && <span>{useCountUp(stat.value)}+</span>}
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
      className={`absolute flex flex-col items-center text-white z-[3] transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        top: "1330vh",
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
            <img
              src={instructor.pfp}
              alt={instructor.alt}
              className="w-40 h-40 rounded-full object-cover border-4 border-transparent group-hover:border-blue-400 transition-all duration-300 shadow-lg"
            />
            <h3 className="text-2xl font-semibold mt-4 h-8">
              {useTypewriter(instructor.name, isVisible ? 70 : 9999)}
            </h3>
            <p className="text-lg font-light text-blue-300 h-7">
              {useTypewriter(instructor.rating, isVisible ? 70 : 9999)}
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
    feature1Fade: "fade-out",
    feature2Fade: "fade-out",
    feature3Fade: "fade-out",
    statsFade: "fade-out",
    instructorsFade: "fade-out",
  });

  const lastKnownPhaseRef = useRef(0);
  const lastKnownScrollPercentageRef = useRef(0);
  const featureTimeoutsRef = useRef([]);

  useEffect(() => {
    const unsubscribe = useScrollStore.subscribe((state) => {
      const scrollPercentage = state.scrollPercentage;
      const phaseUnit = 100 / CONSTANTS.TOTAL_PHASES;

      const phase3StartPercentage = phaseUnit * 2.5;
      const phase4StartPercentage = phaseUnit * 4;
      const isInPhase3ScrollRange =
        scrollPercentage >= phase3StartPercentage &&
        scrollPercentage < phase4StartPercentage;

      const wasInPhase3ScrollRange =
        lastKnownScrollPercentageRef.current >= phase3StartPercentage &&
        lastKnownScrollPercentageRef.current < phase4StartPercentage;

      let currentPhase = 0;
      if (scrollPercentage > 5) currentPhase = 1;
      if (scrollPercentage >= phaseUnit * 1) currentPhase = 1.5;
      if (scrollPercentage >= phaseUnit * 2) currentPhase = 2;
      if (scrollPercentage >= phaseUnit * 3) currentPhase = 3;
      if (scrollPercentage >= phaseUnit * 3 + phaseUnit / 3) currentPhase = 3.1;
      if (scrollPercentage >= phaseUnit * 3 + (phaseUnit / 3) * 2)
        currentPhase = 3.2;
      if (scrollPercentage >= phaseUnit * 4) currentPhase = 4;
      if (scrollPercentage >= phaseUnit * 5) currentPhase = 5;
      if (scrollPercentage >= phaseUnit * 6) currentPhase = 6;
      if (scrollPercentage >= phaseUnit * 7) currentPhase = 7;
      if (scrollPercentage >= phaseUnit * 8) currentPhase = 8;
      if (scrollPercentage >= phaseUnit * 9) currentPhase = 9;
      if (scrollPercentage >= phaseUnit * 10) currentPhase = 10;

      const generalPhaseChanged = currentPhase !== lastKnownPhaseRef.current;
      const featurePhaseStatusChanged =
        isInPhase3ScrollRange !== wasInPhase3ScrollRange;

      if (generalPhaseChanged || featurePhaseStatusChanged) {
        setUiState((prevState) => {
          let newFeature1Fade = prevState.feature1Fade;
          let newFeature2Fade = prevState.feature2Fade;
          let newFeature3Fade = prevState.feature3Fade;

          featureTimeoutsRef.current.forEach(clearTimeout);
          featureTimeoutsRef.current = [];

          if (isInPhase3ScrollRange) {
            if (!wasInPhase3ScrollRange) {
              newFeature1Fade = "fade-out";
              newFeature2Fade = "fade-out";
              newFeature3Fade = "fade-out";

              const t1 = setTimeout(() => {
                setUiState((s) => ({ ...s, feature1Fade: "fade-in" }));
              }, 0);
              const t2 = setTimeout(() => {
                setUiState((s) => ({ ...s, feature2Fade: "fade-in" }));
              }, 400);
              const t3 = setTimeout(() => {
                setUiState((s) => ({ ...s, feature3Fade: "fade-in" }));
              }, 500);
              featureTimeoutsRef.current.push(t1, t2, t3);
            }
          } else {
            newFeature1Fade = "fade-out";
            newFeature2Fade = "fade-out";
            newFeature3Fade = "fade-out";
          }

          return {
            ...prevState,
            instructionalFade:
              scrollPercentage >= phaseUnit * 1 - phaseUnit * 0.1 &&
              scrollPercentage < phaseUnit * 2
                ? "fade-in"
                : "fade-out",
            scrollIndicatorFade: scrollPercentage > 5 ? "fade-out" : "fade-in",
            greatMoveFade: isInPhase3ScrollRange ? "fade-in" : "fade-out",
            rookMoveFade:
              scrollPercentage >= phaseUnit * 5 &&
              scrollPercentage < phaseUnit * 6
                ? "fade-in"
                : "fade-out",
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
            feature1Fade: newFeature1Fade,
            feature2Fade: newFeature2Fade,
            feature3Fade: newFeature3Fade,
            statsFade: currentPhase >= 5 ? "fade-in" : "fade-out",
            instructorsFade:
              scrollPercentage >= (1320 / PAGE_HEIGHT_VH) * 100
                ? "fade-in"
                : "fade-out",
          };
        });
      }

      lastKnownPhaseRef.current = currentPhase;
      lastKnownScrollPercentageRef.current = scrollPercentage;
    });

    return () => {
      unsubscribe();
      featureTimeoutsRef.current.forEach(clearTimeout);
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
          className="fixed top-0 left-0 w-screen h-screen object-cover pointer-events-none select-none z-0 opacity-20"
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
            left: "34%",
            fontFamily: "Poppins",
            fontSize: "1.5vw",
            lineHeight: 1.2,
            textShadow: "0 0 10px rgba(51, 187, 255, 0.9)",
          }}
        >
          <div className="font-light">
            And for your final move...
            <br />
            <span className="font-light">Rook g4 to finish the job,</span>
            <br />
            <span className="font-thin">
              forcing a checkmate and winning the game
            </span>
          </div>
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
            const iconSize = `${CONSTANTS.FEATURE_SCALE * 1}rem`;
            const textSize = `${CONSTANTS.FEATURE_SCALE * 1.5}rem`;
            const fadeClass =
              idx === 0
                ? uiState.feature1Fade
                : idx === 1
                ? uiState.feature2Fade
                : uiState.feature3Fade;

            return (
              <div
                key={idx}
                className={`group flex items-start gap-4 p-6 transition-all duration-700 ${fadeClass} liquid-glass-box`}
                style={{
                  opacity: fadeClass === "fade-in" ? 1 : 0,
                  transform:
                    fadeClass === "fade-in"
                      ? "translateX(0)"
                      : "translateX(-20px)",
                  transition:
                    "opacity 0.7s ease, transform 0.7s ease, backdrop-filter 0.5s ease",
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

                <img
                  src={feature.img}
                  alt={feature.alt}
                  className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-lg relative z-10"
                  style={{
                    width: iconSize,
                    height: iconSize,
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

        <StatsSection
          stats={stats}
          isVisible={uiState.statsFade === "fade-in"}
        />
        <InstructorsSection
          instructors={instructors}
          isVisible={uiState.instructorsFade === "fade-in"}
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
