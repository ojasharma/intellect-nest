// app/components/scene/ChessWrapper.js

"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { ChessModel } from "../ChessModel"; // Adjust path if needed

// (Keep the 'phases' array and all the logic from the previous correct version)
const phases = [
  { x: 0, y: -6, rotY: 0 },
  { x: 0, y: 0, rotY: Math.PI },
  { x: 0, y: 1.5, rotY: Math.PI },
  { x: -4, y: -1, rotY: 0.8 * Math.PI },
  { x: -4, y: 1, rotY: 0.8 * Math.PI },
  { x: 4, y: -1, rotY: 1.2 * Math.PI },
  { x: 4, y: 1, rotY: 1.2 * Math.PI },
  { x: -4, y: -1, rotY: 0.8 * Math.PI },
  { x: -4, y: 1, rotY: 0.8 * Math.PI },
  { x: 0, y: 0, rotY: 1 * Math.PI },
];

export default function ChessWrapper() {
  const groupRef = useRef();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = Math.min(scrollTop / scrollHeight, 1);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCurrentTransform = (progress) => {
    if (progress >= 1) return phases[phases.length - 1];

    const totalPhases = phases.length - 1;
    const phaseProgress = progress * totalPhases;
    const currentIndex = Math.floor(phaseProgress);
    const localProgress = phaseProgress - currentIndex;

    const fromPhase = phases[currentIndex];
    const toPhase = phases[currentIndex + 1];

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
      {/* MAKE SURE <CustomCursor /> IS NOT IN HERE */}
    </group>
  );
}
