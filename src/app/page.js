"use client";

import React, { useState, useEffect, useRef } from "react"; // Added React import for clarity
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

// --- Components (Assuming they are in the correct paths) ---
import MouseFollower from "@/components/MouseFollower";
import AnimatedText from "@/components/AnimatedText";
import { ChessModel } from "../components/ChessModel";

// --- Helper Components for 3D Scene (Unchanged) ---
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

function ChessWrapper() {
  const groupRef = useRef();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const phases = [
    { x: 0, y: -6, rotY: 0 },
    { x: 0, y: 0, rotY: Math.PI },
    { x: -4, y: 0, rotY: 2 * Math.PI },
    { x: 4, y: 0, rotY: 3 * Math.PI },
    { x: -4, y: 0, rotY: 4 * Math.PI },
    { x: 0, y: 0, rotY: 5 * Math.PI },
  ];

  useEffect(() => {
    const handleWheel = (event) => {
      if (isAnimating) return;
      const isScrollingDown = event.deltaY > 0;
      const nextPhase = isScrollingDown
        ? Math.min(currentPhase + 1, phases.length - 1)
        : Math.max(currentPhase - 1, 0);
      if (nextPhase !== currentPhase) {
        setCurrentPhase(nextPhase);
        setIsAnimating(true);
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPhase, isAnimating, phases.length]);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = phases[currentPhase];
    const lerpFactor = 0.05;
    groupRef.current.position.x +=
      (target.x - groupRef.current.position.x) * lerpFactor;
    groupRef.current.position.y +=
      (target.y - groupRef.current.position.y) * lerpFactor;
    groupRef.current.rotation.y +=
      (target.rotY - groupRef.current.rotation.y) * lerpFactor;
    if (isAnimating) {
      const positionThreshold = 0.01;
      const rotationThreshold = 0.01;
      const positionReached =
        Math.abs(groupRef.current.position.x - target.x) < positionThreshold &&
        Math.abs(groupRef.current.position.y - target.y) < positionThreshold;
      const rotationReached =
        Math.abs(groupRef.current.rotation.y - target.rotY) < rotationThreshold;
      if (positionReached && rotationReached) {
        groupRef.current.position.x = target.x;
        groupRef.current.position.y = target.y;
        groupRef.current.rotation.y = target.rotY;
        setIsAnimating(false);
      }
    }
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

// --- Main Merged Page Component ---
export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseIn, setIsMouseIn] = useState(false);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => setIsMouseIn(true);
  const handleMouseLeave = () => setIsMouseIn(false);

  const circleSizeVW = 2;

  return (
    <main
      className="relative bg-[#12131d] h-screen flex flex-col items-center overflow-hidden"
      style={{ cursor: "none" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background noise image - stays at the very back */}
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

      {/* 3D CANVAS LAYER - Placed in the background with z-index: 1 */}
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
        <Canvas camera={{ fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} />
          <Environment preset="city" />
          <AdjustCamera />
          <MaterialFixer />
          <ChessWrapper />
        </Canvas>
      </div>

      {/* FOREGROUND UI LAYER - Placed on top with z-index: 10 */}
      <div
        className="relative w-full h-full flex flex-col items-center"
        style={{ zIndex: 10, paddingTop: "5vh" }}
      >
        <div className="absolute inset-0 z-5 pointer-events-none">
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

      {/* Custom Mouse Cursor - Stays on top of everything with the highest z-index */}
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
  );
}
