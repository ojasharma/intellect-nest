"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

// Import Modular Components
import AdjustCamera from "@/components/scene/AdjustCamera";
import MaterialFixer from "@/components/scene/MaterialFixer";
import ChessWrapper from "@/components/scene/ChessWrapper";
import CustomCursor from "@/components/ui/CustomCursor";
import Scroll from "@/components/ui/Scroll";

// Import Existing Components
import MouseFollower from "@/components/MouseFollower";
import AnimatedText from "@/components/AnimatedText";

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-0");

  const [showScroll, setShowScroll] = useState(true);
  const [scrollFadeClass, setScrollFadeClass] = useState("fade-in");

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      const scrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      const scrollingDown = scrollTop > lastScrollY;
      lastScrollY = scrollTop;

      if (scrollPercentage >= 11.11) {
        if (!showInstruction) {
          setShowInstruction(true);
          setFadeClass("fade-in");
        }
      } else {
        if (showInstruction) {
          setShowInstruction(false);
          setFadeClass("fade-out");
        }
      }

      if (scrollPercentage > 5) {
        if (showScroll) {
          setShowScroll(false);
          setScrollFadeClass("fade-out");
        }
      } else {
        if (!showScroll) {
          setShowScroll(true);
          setScrollFadeClass("fade-in");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showInstruction, showScroll]);

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

        {/* 3D Canvas */}
        <div className="fixed top-0 left-0 w-screen h-screen z-10">
          <Canvas
            camera={{ fov: 45 }}
            gl={{ alpha: true, preserveDrawingBuffer: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={3.5} color="#6c80b5" />
            <directionalLight
              position={[5, 10, 5]}
              intensity={5.5}
              color="#6c80b5"
            />
            <directionalLight
              position={[-5, 5, -5]}
              intensity={4.5}
              color="#6c80b5"
            />

            <Environment preset="night" background={false} />

            <AdjustCamera />
            <MaterialFixer />
            <ChessWrapper />
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="relative w-full h-full flex flex-col items-center z-20 pt-[5vh]">
          <div className="absolute inset-0 pointer-events-none">
            {/* <MouseFollower /> */}
          </div>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "8vw", height: "auto", marginBottom: "5vh" }}
          />
          <div className="flex-grow flex items-start justify-center">
            <AnimatedText />
          </div>
        </div>

        {/* Custom Mouse Cursor */}
        <CustomCursor
          mousePos={mousePos}
          isMouseIn={isMouseIn}
          clicked={clicked}
        />

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-[0%] left-1/2 transform -translate-x-1/2 z-30 ${scrollFadeClass}`}
        >
          <Scroll />
        </div>

        {/* Instructional Text */}
        <div
          className={`absolute bottom-[5%] left-1/2 transform -translate-x-1/2 z-30 text-white text-center select-none ${fadeClass}`}
          style={{
            fontFamily: "Poppins",
            fontSize: "1.5vw",
            lineHeight: "1.2",
          }}
        >
          <div>Move the piece to scroll the page</div>
          <div className="blue-glow font-light">
            Knight e4 seems the right move
          </div>
        </div>
      </main>

      {/* Spacer for Scrolling */}
      <div
        style={{
          height: "600vh",
          width: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(0.5vw);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(0.5vw);
          }
        }

        .fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .fade-out {
          animation: fadeOut 0.1s ease-out forwards;
        }

        .blue-glow {
          text-shadow: 0 0 4px rgba(100, 150, 255, 0.6),
            0 0 8px rgba(100, 150, 255, 0.5), 0 0 12px rgba(100, 150, 255, 0.4);
        }
      `}</style>
    </>
  );
}
