"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

// --- Components ---
import MouseFollower from "@/components/MouseFollower";
import AnimatedText from "@/components/AnimatedText";
import { ChessModel } from "../components/ChessModel";

// --- Camera Adjustment ---
function AdjustCamera() {
  const { camera } = useThree();
  useEffect(() => {
    const radius = 7;
    const angle = -Math.PI / 2;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

// --- Material Adjustments ---
function MaterialFixer() {
  const { scene } = useThree();
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        mat.roughness = 0.1;
        mat.metalness = 0.5;
        mat.envMapIntensity = 1.2;
      }
    });
  }, [scene]);
  return null;
}

// --- Chess Model Animation ---
function ChessWrapper() {
  const groupRef = useRef();
  const scrollProgress = useRef(0);

  const phases = [
    { x: 0, y: -6, rotY: 0 },
    { x: 0, y: 0, rotY: Math.PI },
    { x: 0, y: 1.5, rotY: Math.PI },
    { x: -4, y: -1, rotY: 2 * Math.PI },
    { x: -4, y: 1, rotY: 2 * Math.PI },
    { x: 4, y: -1, rotY: 3 * Math.PI },
    { x: 4, y: 1, rotY: 3 * Math.PI },
    { x: -4, y: -1, rotY: 4 * Math.PI },
    { x: -4, y: 1, rotY: 4 * Math.PI },
    { x: 0, y: 0, rotY: 5 * Math.PI },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = Math.min(scrollTop / scrollHeight, 1);
    };

    handleScroll(); // initialize
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCurrentTransform = (progress) => {
    // snap to final phase at 100%
    if (progress >= 1) {
      const last = phases[phases.length - 1];
      return { x: last.x, y: last.y, rotY: last.rotY };
    }

    const totalPhases = phases.length - 1;
    const phaseProgress = progress * totalPhases;
    const currentIndex = Math.floor(phaseProgress);
    const localProgress = phaseProgress - currentIndex;

    // clamp interpolation indices
    const fromIndex = Math.min(currentIndex, totalPhases - 1);
    const toIndex = fromIndex + 1;

    const fromPhase = phases[fromIndex];
    const toPhase = phases[toIndex];

    return {
      x: fromPhase.x + (toPhase.x - fromPhase.x) * localProgress,
      y: fromPhase.y + (toPhase.y - fromPhase.y) * localProgress,
      rotY: fromPhase.rotY + (toPhase.rotY - fromPhase.rotY) * localProgress,
    };
  };

  useFrame(() => {
    if (!groupRef.current) return;
    const { x, y, rotY } = getCurrentTransform(scrollProgress.current);
    groupRef.current.position.x = x;
    groupRef.current.position.y = y;
    groupRef.current.rotation.y = rotY;
  });

  return (
    <group
      ref={groupRef}
      scale={0.08}
      position={[phases[0].x, phases[0].y, 0]}
      rotation={[0, phases[0].rotY, 0]}
    >
      <ChessModel />
    </group>
  );
}

// --- Main Page Component ---
export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);
  const circleSizeVW = 2;

  return (
    <>
      <main
        className="relative bg- h-screen flex flex-col items-center overflow-hidden"
        style={{ cursor: "none" }}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
      >
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            pointerEvents: "none",
            zIndex: 0,
            userSelect: "none",
            opacity: 0.2,
          }}
        />

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          }}
        >
          <Canvas
            camera={{ fov: 45 }}
            gl={{ alpha: true, preserveDrawingBuffer: true }}
            style={{ background: "transparent" }}
          >
            {/* Transparent background */}

            {/* Max bright bluish lighting */}
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

            {/* Subtle environmental reflections */}
            <Environment preset="night" background={false} />

            <AdjustCamera />
            <MaterialFixer />
            <ChessWrapper />
          </Canvas>
        </div>

        <div
          className="relative w-full h-full flex flex-col items-center"
          style={{ zIndex: 10, paddingTop: "5vh" }}
        >
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

        <div
          style={{
            position: "fixed",
            top: `calc(${mousePos.y}px - ${circleSizeVW / 2}vw)`,
            left: `calc(${mousePos.x}px - ${circleSizeVW / 2}vw)`,
            width: `${circleSizeVW}vw`,
            height: `${circleSizeVW}vw`,
            borderRadius: "50%",
            border: `1px solid white`,
            pointerEvents: "none",
            zIndex: 1000,
            transition:
              "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: isMouseIn ? "scale(1)" : "scale(0)",
            opacity: isMouseIn ? 1 : 0,
          }}
        />
      </main>

      <div
        style={{
          height: "600vh",
          width: "100%",
          background: "transparent",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
