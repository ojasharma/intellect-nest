"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

// Import Modular Components
import AdjustCamera from "@/components/scene/AdjustCamera";
import MaterialFixer from "@/components/scene/MaterialFixer";
import ChessWrapper from "@/components/scene/ChessWrapper";
import CustomCursor from "@/components/ui/CustomCursor";

// Import Existing Components
import MouseFollower from "@/components/MouseFollower";
import AnimatedText from "@/components/AnimatedText";

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);

  return (
    <>
      <main
        className="relative bg- h-screen flex flex-col items-center overflow-hidden"
        style={{ cursor: "none" }}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
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
            <MouseFollower />
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
        <CustomCursor mousePos={mousePos} isMouseIn={isMouseIn} />
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
